function ChatSkin() {
  ChatSkin.isConnected = false;
  ChatSkin.isQueued = false;

  // Container
  ChatSkin.container = document.createElement("div");
  ChatSkin.container.id = "ciapiSkinContainer";

  // Header
  ChatSkin.header = document.createElement("div");
  ChatSkin.header.id = "ciapiSkinHeader";
  ChatSkin.header.innerHTML = `<div id="ciapiSkinTitleBar"><span>Ask HMRC</span></div><div id="ciapiSkinCloseButton">(X)</div>`;

  // Chat Transcript
  ChatSkin.content = document.createElement("div");
  ChatSkin.content.id = "ciapiSkinChatTranscript"

  // Footer
  ChatSkin.footer = document.createElement("div");
  ChatSkin.footer.id = "ciapiSkinFooter"
  ChatSkin.footer.innerHTML = `<textarea id="custMsg" rows="5" cols="50" wrap="physical" name="comments"></textarea><div id="ciapiSkinSendButton">Send</div>`;

  // Append elements to container
  ChatSkin.container.appendChild(ChatSkin.header);
  ChatSkin.container.appendChild(ChatSkin.content);
  ChatSkin.container.appendChild(ChatSkin.footer);
}

ChatSkin.main = function() {
  ChatSkin();
  document.getElementsByTagName("body")[0].appendChild(ChatSkin.container);
  ChatSkin.registerEventListener();

  Inq.SDK.getOpenerScripts(ChatSkin.displayOpenerScripts);

  ChatSkin.updateC2CButtonsToInProgress();

  try {
    Inq.SDK.chatDisplayed({
      "customerName": "You",
      "previousMessagesCb": function(resp) {
        console.log("previous messages");
        console.log(resp);
        var arr = resp.messages;
        for (var i = 0; i < arr.length; i++) {
          ChatSkin.handleMsgs(arr[i].data);
        }
        ChatSkin.isConnected = true;
        ChatSkin.getMessage();
      },
      "disconnectCb": function() {},
      "reConnectCb": function() {},
      "failedCb": function() {},
      "openerScripts": null,
      "defaultAgentAlias": "HMRC"
    });
  } catch (e) {
    console.error(e);
  }
}
ChatSkin.registerEventListener = function() {
  ChatSkin.custInput = document.getElementById("custMsg");
  document.getElementById("ciapiSkinSendButton").addEventListener("click", (e) => {
    ChatSkin.actionSendButton();
  });
  document.getElementById("ciapiSkinCloseButton").addEventListener("click", (e) => {
    ChatSkin.closeChat();
    ChatSkin.container.parentElement.removeChild(ChatSkin.container);
  });
  ChatSkin.custInput.addEventListener('keypress', (e) => {
    if (e.which == 13) {
      ChatSkin.actionSendButton();
      e.preventDefault()
    }
  })

};
ChatSkin.addText = function(msg, agent) {
  var msgDiv = "";
  if (agent) {
    msgDiv = "<div class='ciapiSkinTranscriptAgentLine'><div class='ciapiSkinAgentMsg'>" + msg + "</div></div>";
  } else {
    msgDiv = "<div class='ciapiSkinTranscriptCustLine'><div class='ciapiSkinCustMsg'>" + msg + "</div></div>";
  }
  ChatSkin.content.insertAdjacentHTML("beforeend", msgDiv);
  ChatSkin.content.scrollTo(0, ChatSkin.content.scrollHeight);
};
ChatSkin.addSystemMsg = function(msg) {
  var msgDiv = "<div class='ciapiSkinTranscriptSysMsg'><div class='ciapiSkinSysMsg'>" + msg + "</div></div>";
  ChatSkin.content.insertAdjacentHTML("beforeend", msgDiv);
  ChatSkin.content.scrollTo(0, ChatSkin.content.scrollHeight);
}
ChatSkin.displayOpenerScripts = function(openerScripts) {
  if (openerScripts != null && openerScripts.length > 0) {
    for (i = 0; i < openerScripts.length; i++) {
      var msgDiv = "<div class='ciapiSkinTranscriptOpener'><div class='ciapiSkinOpener'>" + openerScripts[i] + "</div></div>";
      ChatSkin.content.insertAdjacentHTML("beforeend", msgDiv);
    }
  }
}
ChatSkin.actionSendButton = function() {
  if (ChatSkin.isConnected) {
    ChatSkin.sendMessage();
  } else {
    ChatSkin.engageRequest();
  }
};
ChatSkin.engageRequest = function() {
  Inq.SDK.engageChat(ChatSkin.custInput.value, function(resp) {
    if (resp.httpStatus == 200) {
      ChatSkin.custInput.value = "";
      ChatSkin.isConnected = true;
      ChatSkin.getMessage();
    }
  })
}
ChatSkin.sendMessage = function() {
  ChatSkin.sequenceNo += 1;
  Inq.SDK.sendMessage(ChatSkin.custInput.value)
  ChatSkin.custInput.value = "";
}
ChatSkin.closeChat = function() {
  Inq.SDK.closeChat();
}
ChatSkin.getMessage = function() {
  Inq.SDK.getMessages(function(resp) {
    ChatSkin.handleMsgs(resp.data);
  });
}
ChatSkin.handleMsgs = function(msg) {
  console.log(msg);
  if (msg.messageType == "chat.communication") {
    ChatSkin.addText(msg.messageText, msg.agentID);
  } else if (msg.state == "closed") {
    ChatSkin.addSystemMsg("Agent Left Chat.");
  } else if (msg.messageType == "chat.communication.queue") {
    ChatSkin.addSystemMsg(msg.messageText);
  }
}

ChatSkin.updateC2CButtonsToInProgress = function() {
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
    if (this.nuanceDownTimeout) {
      clearTimeout(this.nuanceDownTimeout);
      this.nuanceDownTimeout = null;
      var self = this;
      this.engageTimeout = setTimeout(function() {
        console.log("Chat did not start...");
        self.technicalError();
      }, 5000);
    }
  }
};

var InqRegistry = {
  listeners: [chatListener]
};



function nuanceFrameworkLoaded() {
	console.log(`### framework loaded`);

	if (Inq.SDK.isChatInProgress()) {
		setTimeout(ChatSkin.main, 2000);
	}
}
