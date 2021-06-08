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
        this.c2cButtons = new ClickToChatButtons((c2cIdx) => this._onC2CButtonClicked(c2cIdx), c2cDisplayStateMessages);
        this.state = new ChatStates.NullState();
    }

    nuanceFrameworkLoaded(w) {
        console.log("### framework loaded");
        this.sdk = w.Inq.SDK;
        if (this.sdk.isChatInProgress()) {
            console.log("************************************")
            console.log("******* chat is in progress ********")
            console.log("************************************")
//            setTimeout(() => this._launchChat(), 2000);
        }
    }

    addC2CButton(c2cObj, divID, buttonClass) {
        this.c2cButtons.addButton(
            c2cObj,
            new ClickToChatButton(document.getElementById(divID), buttonClass)
        );
    }

    launchProactiveChat() {
        this._launchChat();
    }

    _launchChat() {
        if (this.container) {
            return
        }
        try {
            console.log("in launchChat: ", this);
            this._showChat();

            this._displayOpenerScripts();

            console.log("===== chatDisplayed =====");

            this.sdk.chatDisplayed({
                "customerName": "You",
                "previousMessagesCb": (resp) => this._moveToChatEngagedState(resp.messages),
                "disconnectCb": () => console.log("%%%%%% disconnected %%%%%%"),
                "reConnectCb": () => console.log("%%%%%% reconnected %%%%%%"),
                "failedCb": () => console.log("%%%%%% failed %%%%%%"),
                "openerScripts": null,
                "defaultAgentAlias": "HMRC"
            });
        } catch (e) {
            console.error("!!!! launchChat got exception: ", e);
        }
    }

    _moveToState(state) {
        // Clean up previous state?
        this.state = state;
    }

    _moveToChatNullState() {
        this._moveToState(new ChatStates.NullState());
    }

    _moveToChatShownState() {
        this._moveToState(new ChatStates.ShownState((text) => this._engageChat(text)));
    }

    _moveToChatEngagedState(previousMessages = []) {
        this._moveToState(new ChatStates.EngagedState(this.sdk, this.container, previousMessages));
    }

    _showChat() {
        this.container = new ChatContainer(MessageClasses);

        document.getElementsByTagName("body")[0].appendChild(this.container.element());

        this.container.setEventHandler(this);

        this._moveToChatShownState();
    }

    // Begin event handler methods
    onSend() {
        const text = this.container.currentInputText()
        this.container.clearCurrentInputText();
        this.state.onSend(text);
    }

    onCloseChat() {
        this.sdk.closeChat();

        this.container.destroy();
        this.container = null;

        this._moveToChatNullState();
    }

    onClickedVALink(e) {
        this.state.onClickedVALink(e);
    }
    // End event handler method

    _displayOpenerScripts() {
        this.sdk.getOpenerScripts((openerScripts) => {
            if (openerScripts == null)
                return;

            for (var openerScript of openerScripts) {
                this.container.getTranscript().addOpenerScript(openerScript);
            }
        });
    }

    _engageChat(text) {
        this.sdk.engageChat(text, (resp) => {
            console.log("++++ ENGAGED ++++ ->", resp);
            if (resp.httpStatus == 200) {
              this._moveToChatEngagedState();
            }
        });
    }

    _onC2CButtonClicked(c2cIdx) {
        this.sdk.onC2CClicked(c2cIdx, (state) => {
            console.log("onC2CClicked callback:");
            console.log(state);
            this._launchChat();
        });
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
            chatController.launchProactiveChat();
        }
    );
}
