import ClickToChatButtons from './ClickToChatButtons'
import ClickToChatButton from './ClickToChatButton'
import ChatContainer from './ChatContainer'
import * as MessageClasses from './DefaultClasses'
import * as DisplayState from './NuanceDisplayState'
import * as ChatStates from './ChatStates'

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
        this.state = new ChatStates.NullState();
    }

    launchChat() {
        if (this.container) {
            return
        }
        try {
            console.log("in launchChat: ", this);
            this.showChat();

            this.sdk.getOpenerScripts((openerScripts) => this.displayOpenerScripts(openerScripts));

            console.log("===== chatDisplayed =====");
            this.sdk.chatDisplayed(this.chatDisplayedContext());
        } catch (e) {
            console.error("!!!! launchChat got exception: ", e);
        }
    }

    chatDisplayedContext() {
        return {
            "customerName": "You",
            "previousMessagesCb": (resp) => this.moveToChatEngagedState(resp.messages),
            "disconnectCb": () => console.log("%%%%%% disconnected %%%%%%"),
            "reConnectCb": () => console.log("%%%%%% reconnected %%%%%%"),
            "failedCb": () => console.log("%%%%%% failed %%%%%%"),
            "openerScripts": null,
            "defaultAgentAlias": "HMRC"
        }
    }

    moveToState(state) {
        // Clean up previous state?
        this.state = state;
    }

    moveToChatNullState() {
        this.moveToState(new ChatStates.NullState());
    }

    moveToChatShownState() {
        this.moveToState(new ChatStates.ShownState((text) => this.engageChat(text)));
    }

    moveToChatEngagedState(previousMessages = []) {
        this.moveToState(new ChatStates.EngagedState(this.sdk, this.container, previousMessages));
    }

    showChat() {
        this.container = new ChatContainer(MessageClasses);

        document.getElementsByTagName("body")[0].appendChild(this.container.element());

        const eventHandler = {
            onSend: () => this._onSend(),
            onCloseChat: () => this._onCloseChat(),
            onVALinkClick: (e) => this._onClickedVALink(e)
        };

        this.container.setEventHandler(eventHandler);

        this.moveToChatShownState();
    }

    _onSend() {
        const text = this.container.currentInputText()
        this.container.clearCurrentInputText();
        this.state.onSend(text);
    }

    _onCloseChat() {
        this.closeChat();

        this.container.destroy();
        this.container = null;

        this.moveToChatNullState();
    }

    _onClickedVALink(e) {
        this.state.onClickedVALink(e);
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
          this.moveToChatEngagedState();
        }
    }

    engageChat(text) {
        this.sdk.engageChat(text, (resp) => this.onChatEngaged(resp));
    }

    closeChat() {
        this.sdk.closeChat();
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
