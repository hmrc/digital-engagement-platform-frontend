class Click2ChatButtons {
    constructor(sdk, controller) {
        this.buttons = {};
        this.sdk = sdk;
        this.controller = controller;
    }

    updateC2CButtonsToInProgress() {
      for (const c2dId of Object.keys(this.buttons)) {
        const c2cObj = {
          c2cIdx: c2cId,
          displayState: "chatactive",
          launchable: false
        };
        updateC2CButton(c2cObj, this.buttons[c2cId]);
      };
    }

    updateC2CButton(c2cObj, divID) {
        let btn = document.getElementById(divID);
        let div = window.top.document.createElement("DIV");

        const btnType = (divID.toLowerCase().match(/anchored/)) ? "anchored" : "fixed";

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
                ths.sdk.onC2CClicked(c2cObj.c2cIdx, function(state) {
                    console.log("onC2CClicked callback:");
                    console.log(state);

                    // create chat window
                    this.controller.main();
                }.bind(this));
            }
        }
    }

    addC2CButton(c2cObj, divID) {
        console.log("SetC2CButton for", divID, ":", c2cObj);
        this.buttons[c2cObj.c2cIdx] = divID;
        this.updateC2CButton(c2cObj, divID);
    }
};

class ChatController {
    constructor() {
        this.sdk = null;
        this.c2cButtons = null;
    }

    main() {
        if (this.container) {
            return
        }
        this.isConnected = false;
        this.isQueued = false;

        console.log("in main: ", this);
        this.initContainer();

        this.sdk.getOpenerScripts(this.displayOpenerScripts.bind(this));

//        this.c2cButtons.updateC2CButtonsToInProgress();

        try {
            console.log("===== chatDisplayed =====");
            this.sdk.chatDisplayed({
              "customerName": "You",
              "previousMessagesCb": function(resp) {
                console.log("--- previous messages");
                console.log(resp);
                for (var message of resp.messages) {
                  this.handleMessage(message);
                };
                this.isConnected = true;
                this.getMessage();
              }.bind(this),
              "disconnectCb": function() {
                console.log("%%%%%% disconnectCb %%%%%%");
              },
              "reConnectCb": function() {
                console.log("%%%%%% reConnectCb %%%%%%");
              },
              "failedCb": function() {
                console.log("%%%%%% failedCb %%%%%%");
              },
              "openerScripts": null,
              "defaultAgentAlias": "HMRC"
            });
        } catch (e) {
            console.error("!!!! chat displayed got exception: ", e);
        }
    }

    initContainer() {
        let containerHtml = `
        <div id="ciapiSkinContainer">
            <div id="ciapiSkinHeader">
                <div id="ciapiSkinTitleBar"><span>Ask HMRC</span></div>
                <div id="ciapiSkinCloseButton">(X)</div>
            </div>
            <div id="ciapiSkinChatTranscript" role="log"></div>
            <div id="ciapiSkinFooter">
                <textarea id="custMsg" rows="5" cols="50" wrap="physical" name="comments"></textarea>
                <div id="ciapiSkinSendButton">Send</div>
            </div>
        </div>
        `
        document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", containerHtml);

        this.container = document.getElementById("ciapiSkinContainer");
        this.content = document.getElementById("ciapiSkinChatTranscript");
        this.custInput = document.getElementById("custMsg");

        this.registerEventListeners();
    }

    registerEventListeners() {
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
    }

    addTextAndScroll(msg) {
      this.content.insertAdjacentHTML("beforeend", msg);
      this.content.scrollTo(0, this.content.scrollHeight);
    }

    addText(msg, agent) {
      let msgDiv = "";
      if (agent) {
        console.log("Add agent text: ", msg);
        msgDiv = "<div class='ciapiSkinTranscriptAgentLine'><div class='bubble agent-bubble background-img enter'>" + msg + "</div></div>";
      } else {
        console.log("Add customer text: ", msg);
        msgDiv = "<div class='ciapiSkinTranscriptCustLine'><div class='bubble customer-bubble background-img enter'>" + msg + "</div></div>";
      }
      this.addTextAndScroll(msgDiv);
    }

    fixUpVALinks(div) {
        const links = div.getElementsByTagName('a');

        const clickHandler = this.onClickHandler.bind(this);
        for (var link of links) {
            for (var attribute of link.attributes) {
                if (attribute.name === "data-vtz-link-type" && attribute.value === "Dialog") {
                    link.onclick = clickHandler;
                }
            }
        }
    }

    addAutomatonText(msg) {
        console.log("Add automaton text: ", msg);

        const msgDiv = "<div class='bubble agent-bubble background-img enter'>" + msg + "</div>";

        let agentDiv = document.createElement("div")
        agentDiv.classList.add('ciapiSkinTranscriptAgentLine');
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this.fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);
        this.content.scrollTo(0, this.content.scrollHeight);
    }

    linkCallback(data1, data2, data3) {
        console.log("link callback: ", data1, data2, data3);
    }

    onClickHandler(e) {
        this.sdk.sendVALinkMessage(e, this.linkCallback)
    }

    addSystemMsg(msg) {
      const msgDiv = "<div class='ciapiSkinTranscriptSysMsg'><div class='ciapiSkinSysMsg'>" + msg + "</div></div>";
      this.addTextAndScroll(msgDiv);
    }

    displayOpenerScripts(openerScripts) {
      if (openerScripts != null && openerScripts.length > 0) {
        for (var openerScript of openerScripts) {
          const msgDiv = "<div class='ciapiSkinTranscriptOpener'><div class='ciapiSkinOpener'>" + openerScript + "</div></div>";
          this.addTextAndScroll(msgDiv);
        }
      }
    }

    actionSendButton() {
        var text = this.custInput.value;
        if (this.isConnected) {
            console.log("connected: send message")
            this.sendMessage(text);
            this.custInput.value = "";
        } else {
            console.log("not connected: engage request")
            this.engageRequest(text);
        }
    }

    engageRequest(text) {
      this.sdk.engageChat(text, function(resp) {
        console.log("++++ ENGAGED ++++ ->", resp);
        if (resp.httpStatus == 200) {
          this.custInput.value = "";
          this.isConnected = true;
          this.getMessage();
        }
      }.bind(this));
    }

    sendMessage(text) {
      this.sdk.sendMessage(text)
    }

    closeChat() {
      this.sdk.closeChat();
    }

    getMessage() {
      this.sdk.getMessages(this.handleMessage.bind(this));
    }

    handleMessage(msg_in) {
      const msg = msg_in.data;
      console.log(msg);
      if (msg.messageType === "chat.communication") {
        this.addText(msg.messageText, msg.agentID);
      } else if (msg.messageType === "chat.automaton_request") {
        this.addAutomatonText(msg["automaton.data"]);
      } else if (msg.state === "closed") {
        this.addSystemMsg("Agent Left Chat.");
      } else if (msg.messageType === "chat.communication.queue") {
        this.addSystemMsg(msg.messageText);
      } else if (msg.messageType === "chat.denied") {
        this.isConnected = false;
        this.addSystemMsg("No agents are available.");
      }
    }

    setSDK(w) {
        this.sdk = w.Inq.SDK;
    }

    nuanceFrameworkLoaded(w) {
        this.setSDK(w);
        if (this.sdk.isChatInProgress()) {
            console.log("chat is in progress")
//            setTimeout(this.main.bind(this), 2000);
        }
    }

    addC2CButton(w, c2cObj, divID) {
        console.log("---- Add C2C Button: ", c2cObj, divID);
        this.setSDK(w);
        if (this.c2cButtons === null) {
            this.c2cButtons = new Click2ChatButtons(this.sdk, this);
        }

        this.c2cButtons.addC2CButton(c2cObj, divID);
    }
};

const chatListener = {
    onAnyEvent: function(evt) {
        console.log("Chat any event:", evt);
    },
    onC2CStateChanged: function(evt) {
        console.log("C2C state changed...")
//        chatController.updateC2CButtonsToInProgress();
    }
};

var InqRegistry = {
  listeners: [chatListener]
};

function safeHandler(f, helpful_name) {
    return function() {
        try {
            f.apply(null, arguments)
        } catch(e) {
            console.error(`!!!! handler for ${f.name}: got exception `, e);
        }
    }
}

export function hookWindow(w) {
    var chatController = new ChatController;

    w.InqRegistry = InqRegistry;

    w.nuanceFrameworkLoaded = safeHandler(
        function nuanceFrameworkLoaded() {
            console.log("### framework loaded");
            chatController.nuanceFrameworkLoaded(w);
        }
    );

    w.nuanceReactive_HMRC_CIAPI_Fixed_1 = safeHandler(
        function nuanceReactive_HMRC_CIAPI_Fixed_1(c2cObj) {
            chatController.addC2CButton(w, c2cObj, "HMRC_CIAPI_Fixed_1");
        }
    );

    w.nuanceReactive_HMRC_CIAPI_Anchored_1 = safeHandler(
        function nuanceReactive_HMRC_CIAPI_Anchored_1(c2cObj) {
            chatController.addC2CButton(w, c2cObj, "HMRC_CIAPI_Anchored_1");
        }
    );

    //launch proactive chat
    w.nuanceProactive =  safeHandler(
        function nuanceProactive(obj) {
            console.log("### PROACTIVE", obj);
            chatController.setSDK(w);
            chatController.main();
        }
    );
}
