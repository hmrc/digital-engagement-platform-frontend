var ChatSkin = {
    main: function() {
        if (this.container) {
            return
        }
        this.isConnected = false;
        this.isQueued = false;

        console.log("in main: ", this);
        this.initContainer();

        var self = this;

        Inq.SDK.getOpenerScripts(function(openerScripts) { self.displayOpenerScripts(openerScripts) });

        this.updateC2CButtonsToInProgress();

        try {
            Inq.SDK.chatDisplayed({
              "customerName": "You",
              "previousMessagesCb": function(resp) {
                console.log("previous messages");
                console.log(resp);
                var arr = resp.messages;
                for (var i = 0; i < arr.length; i++) {
                  self.handleMsgs(arr[i].data);
                }
                self.isConnected = true;
                self.getMessage();
              },
              "disconnectCb": function() {},
              "reConnectCb": function() {},
              "failedCb": function() {},
              "openerScripts": null,
              "defaultAgentAlias": "HMRC"
            });
        } catch (e) {
            console.error("!!!! chat displayed got exception: ", e);
        }
    },
    initContainer: function() {
        // Container
        this.container = document.createElement("div");
        this.container.id = "ciapiSkinContainer";

        // Header
        this.header = document.createElement("div");
        this.header.id = "ciapiSkinHeader";
        this.header.innerHTML = `<div id="ciapiSkinTitleBar"><span>Ask HMRC</span></div><div id="ciapiSkinCloseButton">(X)</div>`;

        // Chat Transcript
        this.content = document.createElement("div");
        this.content.id = "ciapiSkinChatTranscript"

        // Footer
        this.footer = document.createElement("div");
        this.footer.id = "ciapiSkinFooter"
        this.footer.innerHTML = `<textarea id="custMsg" rows="5" cols="50" wrap="physical" name="comments"></textarea><div id="ciapiSkinSendButton">Send</div>`;

        // Append elements to container
        this.container.appendChild(this.header);
        this.container.appendChild(this.content);
        this.container.appendChild(this.footer);

        document.getElementsByTagName("body")[0].appendChild(this.container);
        this.registerEventListener();
    },
    registerEventListener: function() {
      this.custInput = document.getElementById("custMsg");
      document.getElementById("ciapiSkinSendButton").addEventListener("click", (e) => {
        this.actionSendButton();
      });
      document.getElementById("ciapiSkinCloseButton").addEventListener("click", (e) => {
        this.closeChat();
        this.container.parentElement.removeChild(this.container);
      });
      this.custInput.addEventListener('keypress', (e) => {
        if (e.which == 13) {
          this.actionSendButton();
          e.preventDefault()
        }
      })
    },

    addTextAndScroll: function(msg) {
      this.content.insertAdjacentHTML("beforeend", msg);
      this.content.scrollTo(0, this.content.scrollHeight);
    },

    addText: function(msg, agent) {
      var msgDiv = "";
      if (agent) {
        console.log("Add agent text: ", msg);
        msgDiv = "<div class='ciapiSkinTranscriptAgentLine'><div class='bubble agent-bubble background-img enter'>" + msg + "</div></div>";
      } else {
        console.log("Add customer text: ", msg);
        msgDiv = "<div class='ciapiSkinTranscriptCustLine'><div class='bubble customer-bubble background-img enter'>" + msg + "</div></div>";
      }
      this.addTextAndScroll(msgDiv);
    },

    fixUpVALinks: function(div) {
        var links = div.getElementsByTagName('a');

        for (var i = 0; i < links.length; ++i) {
            var link = links[i];
            var attributes = link.attributes;
            for (var anum = 0; anum < attributes.length; ++anum) {
                var attribute = attributes[anum];
                if (attribute.name === "data-vtz-link-type" && attribute.value === "Dialog") {
                    link.onclick = this.onClickHandler
                }
            }
        }
    },

    addAutomatonText: function(msg) {
        console.log("Add automaton text: ", msg);

        var msgDiv = "<div class='bubble agent-bubble background-img enter'>" + msg + "</div>";
        var agentDiv = document.createElement("div")
        agentDiv.classList.add('ciapiSkinTranscriptAgentLine');
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this.fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);
        this.content.scrollTo(0, this.content.scrollHeight);
    },

    linkCallback: function(data1, data2, data3) {
        console.log("link callback: ", data1, data2, data3);
    },

    onClickHandler: function(e) {
        Inq.SDK.sendVALinkMessage(e, this.linkCallback)
    },

    addSystemMsg: function(msg) {
      var msgDiv = "<div class='ciapiSkinTranscriptSysMsg'><div class='ciapiSkinSysMsg'>" + msg + "</div></div>";
      this.addTextAndScroll(msgDiv);
    },

    displayOpenerScripts: function(openerScripts) {
      if (openerScripts != null && openerScripts.length > 0) {
        for (var i = 0; i < openerScripts.length; i++) {
          var msgDiv = "<div class='ciapiSkinTranscriptOpener'><div class='ciapiSkinOpener'>" + openerScripts[i] + "</div></div>";
          this.addTextAndScroll(msgDiv);
        }
      }
    },

    actionSendButton: function() {
      if (this.isConnected) {
        console.log("connected: send message")
        this.sendMessage();
      } else {
        console.log("not connected: engage request")
        this.engageRequest();
      }
    },

    engageRequest: function() {
      var self = this;
      Inq.SDK.engageChat(this.custInput.value, function(resp) {
        if (resp.httpStatus == 200) {
          self.custInput.value = "";
          self.isConnected = true;
          self.getMessage();
        }
      })
    },

    sendMessage: function() {
      this.sequenceNo += 1;
      Inq.SDK.sendMessage(this.custInput.value)
      this.custInput.value = "";
    },

    closeChat: function() {
      Inq.SDK.closeChat();
    },

    getMessage: function() {
      var self = this;
      Inq.SDK.getMessages(function(resp) {
        self.handleMsgs(resp.data);
      });
    },

    handleMsgs: function(msg) {
      console.log(msg);
      if (msg.messageType === "chat.communication") {
        this.addText(msg.messageText, msg.agentID);
      } else if (msg.messageType === "chat.automaton_request") {
        this.addAutomatonText(msg["automaton.data"]);
      } else if (msg.state === "closed") {
        this.addSystemMsg("Agent Left Chat.");
      } else if (msg.messageType === "chat.communication.queue") {
        this.addSystemMsg(msg.messageText);
      }
    },

    updateC2CButtonsToInProgress: function() {
      var c2cIds = Object.keys(c2cButtons);
      c2cIds.forEach(function(c2cId) {
        let c2cObj = {
          c2cIdx: c2cId,
          displayState: "chatactive",
          launchable: false
        };
        nuanceTobiC2CLaunch(c2cObj, c2cButtons[c2cId]);
      });
    }
};

//launch proactive chat
function nuanceProactive(obj) {
  console.log(`### PROACTIVE`, obj);
  ChatSkin.main();
}

// Reactive callbacks
var c2cButtons = {};

function nuanceReactive_HMRC_CIAPI_Fixed_1(c2cObj) {
  nuanceTobiC2CLaunch(c2cObj, "HMRC_CIAPI_Fixed_1");
}

function nuanceReactive_HMRC_CIAPI_Anchored_1(c2cObj) {
  nuanceTobiC2CLaunch(c2cObj, "HMRC_CIAPI_Anchored_1");
}

function nuanceTobiC2CLaunch(c2cObj, divID) {
  console.log(c2cObj);
  c2cButtons[c2cObj.c2cIdx] = divID;

  let btn = document.getElementById(divID);
  let div = top.document.createElement("DIV");

  let btnType = (divID.toLowerCase().match(/anchored/)) ? "anchored" : "fixed";

  div.setAttribute("class", "c2cButton");
  switch (c2cObj.displayState) {
    case 'outofhours':
      div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">Out of hours</div>`;
      break;
    case 'ready':
      div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">Ask HMRC a question</div>`;
      break;
    case 'busy':
      div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">All advisers are busy</div>`;
      break;
    case 'chatactive':
      div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">In progress</div>`;
  }
  btn.innerHTML = "";
  btn.appendChild(div);

  if (c2cObj.launchable) {
    let btn = document.getElementById(divID);
    btn.onclick = function() {
      console.log(this);
      Inq.SDK.onC2CClicked(c2cObj.c2cIdx, function(state) {
        console.log("onC2CClicked callback:");
        console.log(state);

        // create chat window
        ChatSkin.main();
      });
    }
  }
}

var chatListener = {
    onAnyEvent: function(evt) {
        console.log("Chat any event:", evt);
    },
    onC2CStateChanged: function(evt) {
        ChatSkin.updateC2CButtonsToInProgress();
    }
};

var InqRegistry = {
  listeners: [chatListener]
};

function nuanceFrameworkLoaded() {
	console.log("### framework loaded");

	if (Inq.SDK.isChatInProgress()) {
	    console.log("chat is in progress")
		setTimeout(function() {
		    ChatSkin.main();
		}, 2000);
	}
}
