import ClickToChatButtons from './ClickToChatButtons'
import ClickToChatButton from './ClickToChatButton'
import ChatContainer from './ChatContainer'
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
        this.c2cButtons = new ClickToChatButtons((c2cIdx) => this.onC2CButtonClicked(c2cIdx), c2cDisplayStateMessages);
    }

    launchChat() {
        if (this.container) {
            return
        }
        this.isConnected = false;

        console.log("in launchChat: ", this);
        this.showChat();

        this.sdk.getOpenerScripts((openerScripts) => this.displayOpenerScripts(openerScripts));

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
            "previousMessagesCb": (resp) => this.onPreviousMessages(resp),
            "disconnectCb": () => this.onDisconnected(),
            "reConnectCb": () => this.onReconnected(),
            "failedCb": () => this.onFailed(),
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

    showChat() {

        this.container = new ChatContainer(MessageClasses);

        document.getElementsByTagName("body")[0].appendChild(this.container.element());

        const eventHandler = {
            onSend: () => this.onSend(),
            onCloseChat: () => this.onCloseChat(),
            onVALinkClick: (e) => this.onClickHandler(e)
        };

        this.container.setEventHandler(eventHandler);
    }

    onSend() {
        var text = this.container.currentInputText();
        if (this.isConnected) {
            console.log(">>> connected: send message")
            this.sendMessage(text);
            this.container.clearCurrentInputText();
        } else {
            console.log(">>> not connected: engage request")
            this.engageRequest(text);
        }
    }

    onCloseChat() {
        this.closeChat();
        this.container.destroy();
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
          this.container.getTranscript().addOpenerScript(openerScript);
        }
      }
    }

    onChatEngaged(resp) {
        console.log("++++ ENGAGED ++++ ->", resp);
        if (resp.httpStatus == 200) {
          this.container.clearCurrentInputText();
          this.isConnected = true;
          this.getMessages();
        }
    }

    engageRequest(text) {
        this.sdk.engageChat(text, (resp) => this.onChatEngaged(resp));
    }

    sendMessage(text) {
        this.sdk.sendMessage(text)
    }

    closeChat() {
        this.sdk.closeChat();
    }

    getMessages() {
        this.sdk.getMessages((msg_in) => this.handleMessage(msg_in));
    }

    handleMessage(msg_in) {
        const msg = msg_in.data
        const transcript = this.container.getTranscript();
        if (msg.messageType === MessageType.Chat_Communication) {
            if (msg.agentID) {
                transcript.addAgentMsg(msg.messageText)
            } else {
                transcript.addCustomerMsg(msg.messageText)
            }
        } else if (msg.messageType === MessageType.Chat_AutomationRequest) {
            transcript.addAutomatonMsg(msg["automaton.data"]);
        } else if (msg.state === "closed") {
            transcript.addSystemMsg("Agent Left Chat.");
        } else if (msg.messageType === MessageType.Chat_CommunicationQueue) {
            transcript.addSystemMsg(msg.messageText);
        } else if (msg.messageType === MessageType.Chat_Denied) {
            this.isConnected = false;
            transcript.addSystemMsg("No agents are available.");
        }
    }

    onC2CButtonClicked(c2cIdx) {
        this.sdk.onC2CClicked(c2cIdx, (state) => {
            console.log("onC2CClicked callback:");
            console.log(state);
            this.launchChat();
        });
    }

    nuanceFrameworkLoaded(w) {
        console.log("### framework loaded");
        this.sdk = w.Inq.SDK;
        if (this.sdk.isChatInProgress()) {
            console.log("chat is in progress")
//            setTimeout(() => this.launchChat(), 2000);
        }
    }

    addC2CButton(c2cObj, divID, buttonClass) {
        this.c2cButtons.addButton(
            c2cObj,
            new ClickToChatButton(document.getElementById(divID), buttonClass)
        );
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
