import ClickToChatButtons from './ClickToChatButtons'
import ClickToChatButton from './ClickToChatButton'
import Transcript from './Transcript'
import * as MessageType from './NuanceMessageType'
import * as MessageClasses from './DefaultClasses'

class ChatController {
    constructor() {
        this.sdk = null;
        this.c2cButtons = new ClickToChatButtons(this.onC2CButtonClicked.bind(this));
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

        this.transcript = new Transcript(this.content, this.onClickHandler.bind(this), MessageClasses);
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

    linkCallback(data1, data2, data3) {
        // data1 seems to be the text clicked on.
//        console.log("link callback: ", data1, data2, data3);
    }

    onClickHandler(e) {
        this.sdk.sendVALinkMessage(e, this.linkCallback)
    }

    displayOpenerScripts(openerScripts) {
      if (openerScripts != null) {
        for (var openerScript of openerScripts) {
          this.transcript.addOpenerScript(openerScript);
        }
      }
    }

    actionSendButton() {
        var text = this.custInput.value;
        if (this.isConnected) {
            console.log(">>> connected: send message")
            this.sendMessage(text);
            this.custInput.value = "";
        } else {
            console.log(">>> not connected: engage request")
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
      const msg = msg_in.data
      if (msg.messageType === MessageType.Chat_Communication) {
        if (msg.agentID) {
            this.transcript.addAgentMsg(msg.messageText)
        } else {
            this.transcript.addCustomerMsg(msg.messageText)
        }
      } else if (msg.messageType === MessageType.Chat_AutomationRequest) {
        this.transcript.addAutomatonMsg(msg["automaton.data"]);
      } else if (msg.state === "closed") {
        this.transcript.addSystemMsg("Agent Left Chat.");
      } else if (msg.messageType === MessageType.Chat_CommunicationQueue) {
        this.transcript.addSystemMsg(msg.messageText);
      } else if (msg.messageType === MessageType.Chat_Denied) {
        this.isConnected = false;
        this.transcript.addSystemMsg("No agents are available.");
      }
    }

    setSDK(w) {
        this.sdk = w.Inq.SDK;
    }

    onC2CButtonClicked(c2cIdx) {
        this.sdk.onC2CClicked(c2cIdx, function(state) {
            console.log("onC2CClicked callback:");
            console.log(state);

            // create chat window
            this.main();
        }.bind(this));
    }

    nuanceFrameworkLoaded(w) {
        console.log("### framework loaded");
        this.setSDK(w);
        if (this.sdk.isChatInProgress()) {
            console.log("chat is in progress")
//            setTimeout(this.main.bind(this), 2000);
        }
    }

    addC2CButton(c2cObj, divID, buttonClass) {
        const button = new ClickToChatButton(document.getElementById(divID), buttonClass);
        this.c2cButtons.addButton(c2cObj, button);
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
            chatController.nuanceFrameworkLoaded(w);
        }
    );

    w.nuanceReactive_HMRC_CIAPI_Fixed_1 = safeHandler(
        function nuanceReactive_HMRC_CIAPI_Fixed_1(c2cObj) {
            chatController.addC2CButton(c2cObj, "HMRC_CIAPI_Fixed_1", "fixed");
        }
    );

    w.nuanceReactive_HMRC_CIAPI_Anchored_1 = safeHandler(
        function nuanceReactive_HMRC_CIAPI_Anchored_1(c2cObj) {
            chatController.addC2CButton(c2cObj, "HMRC_CIAPI_Anchored_1", "anchored");
        }
    );

    //launch proactive chat
    w.nuanceProactive =  safeHandler(
        function nuanceProactive(obj) {
            console.log("### PROACTIVE", obj);
            chatController.main();
        }
    );
}
