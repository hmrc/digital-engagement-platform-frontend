import ClickToChatButtons from './ClickToChatButtons'
import Transcript from './Transcript'

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

        this.transcript = new Transcript(this.content, this.sdk);
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

    handleMessage(msg) {
        this.transcript.handleMessage(msg.data);
        if (msg.data.messageType === "chat.denied") {
            this.isConnected = false;
        }
    }

    setSDK(w) {
        this.sdk = w.Inq.SDK;
        if (this.c2cButtons === null) {
            this.c2cButtons = new ClickToChatButtons(this.sdk, this);
        }
    }

    nuanceFrameworkLoaded(w) {
        console.log("### framework loaded");
        this.setSDK(w);
        if (this.sdk.isChatInProgress()) {
            console.log("chat is in progress")
//            setTimeout(this.main.bind(this), 2000);
        }
    }

    addC2CButton(c2cObj, divID) {
        console.log("---- Add C2C Button: ", c2cObj, divID);
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
            chatController.nuanceFrameworkLoaded(w);
        }
    );

    w.nuanceReactive_HMRC_CIAPI_Fixed_1 = safeHandler(
        function nuanceReactive_HMRC_CIAPI_Fixed_1(c2cObj) {
            chatController.addC2CButton(c2cObj, "HMRC_CIAPI_Fixed_1");
        }
    );

    w.nuanceReactive_HMRC_CIAPI_Anchored_1 = safeHandler(
        function nuanceReactive_HMRC_CIAPI_Anchored_1(c2cObj) {
            chatController.addC2CButton(c2cObj, "HMRC_CIAPI_Anchored_1");
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
