import ClickToChatButtons from './ClickToChatButtons'
import ClickToChatButton from './ClickToChatButton'
import Transcript from './Transcript'
import * as MessageType from './NuanceMessageType'
import * as MessageClasses from './DefaultClasses'
import * as DisplayState from './NuanceDisplayState'

const c2cDisplayStateMessages = {
    [DisplayState.OutOfHours]: "Out of hours",
    [DisplayState.Ready]: "Ask HMRC a question",
    [DisplayState.Busy]: "All advisers are busy",
    [DisplayState.ChatActive]: "In progress"
};

class ChatController {
    constructor() {
        this.sdk = null;
        this.c2cButtons = new ClickToChatButtons(this.onC2CButtonClicked.bind(this), c2cDisplayStateMessages);
    }

    launchChat() {
        if (this.container) {
            return
        }
        this.isConnected = false;
        this.isQueued = false;

        console.log("in launchChat: ", this);
        this.initContainer();

        this.sdk.getOpenerScripts(this.displayOpenerScripts.bind(this));

        try {
            console.log("===== chatDisplayed =====");
            this.sdk.chatDisplayed(this.chatDisplayedContext());
        } catch (e) {
            console.error("!!!! chat displayed got exception: ", e);
        }
    }

    chatDisplayedContext() {
        return {
            "customerName": "You",
            "previousMessagesCb": this.onPreviousMessages.bind(this),
            "disconnectCb": this.onDisconnected.bind(this),
            "reConnectCb": this.onReconnected.bind(this),
            "failedCb": this.onFailed.bind(this),
            "openerScripts": null,
            "defaultAgentAlias": "HMRC"
        }
    }

    onPreviousMessages(resp) {
        for (const message of resp.messages) {
          this.handleMessage(message);
        };
        this.isConnected = true;
        this.getMessages();
    }

    onDisconnected() {
        console.log("%%%%%% disconnected %%%%%%");
    }

    onReconnected() {
        console.log("%%%%%% reconnected %%%%%%");
    }

    onFailed() {
        console.log("%%%%%% failed %%%%%%");
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

    onChatEngaged(resp) {
        console.log("++++ ENGAGED ++++ ->", resp);
        if (resp.httpStatus == 200) {
          this.custInput.value = "";
          this.isConnected = true;
          this.getMessages();
        }
    }

    engageRequest(text) {
        this.sdk.engageChat(text, this.onChatEngaged.bind(this));
    }

    sendMessage(text) {
        this.sdk.sendMessage(text)
    }

    closeChat() {
        this.sdk.closeChat();
    }

    getMessages() {
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
            this.launchChat();
        }.bind(this));
    }

    nuanceFrameworkLoaded(w) {
        console.log("### framework loaded");
        this.setSDK(w);
        if (this.sdk.isChatInProgress()) {
            console.log("chat is in progress")
//            setTimeout(this.launchChat.bind(this), 2000);
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
  listeners: []
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

    InqRegistry.listeners.push(chatListener);

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

    w.nuanceProactive =  safeHandler(
        function nuanceProactive(obj) {
            console.log("### PROACTIVE", obj);
            chatController.launchChat();
        }
    );
}
