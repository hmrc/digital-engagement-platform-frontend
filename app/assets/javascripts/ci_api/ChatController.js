import ClickToChatButtons from './ClickToChatButtons'
import ClickToChatButton from './ClickToChatButton'
import ChatContainer from './ChatContainer'
import * as MessageClasses from './DefaultClasses'
import * as DisplayState from './NuanceDisplayState'
import * as ChatStates from './ChatStates'
import * as ContainerHtml from './ContainerHtml'

const c2cDisplayStateMessages = {
    [DisplayState.OutOfHours]: "Out of hours",
    [DisplayState.Ready]: "Ask HMRC a question",
    [DisplayState.Busy]: "All advisers are busy",
    [DisplayState.ChatActive]: "In progress"
};

export default class ChatController {
    constructor() {
        this.sdk = null;
        this.c2cButtons = new ClickToChatButtons((c2cIdx) => this._onC2CButtonClicked(c2cIdx), c2cDisplayStateMessages);
        this.state = new ChatStates.NullState();
        this.minimised = false;
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
        // TODO: Do we need this any more, now that the above timeout is gone?
        if (this.container) {
            return
        }
        try {
//            console.log("in launchChat: ", this);
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
        this.minimised = false;
    }

    _moveToChatEngagedState(previousMessages = []) {
        this._moveToState(new ChatStates.EngagedState(this.sdk, this.container, previousMessages));
    }

    _showChat() {
        const embeddedDiv = document.getElementById("HMRC_CIAPI_Embedded_1")
        if (embeddedDiv) {
            this.container = new ChatContainer(MessageClasses, ContainerHtml.EmbeddedContainerHtml);
            embeddedDiv.appendChild(this.container.element());
        } else {
            this.container = new ChatContainer(MessageClasses, ContainerHtml.PopupContainerHtml);
            document.getElementsByTagName("body")[0].appendChild(this.container.element());
        }

        this.container.setEventHandler(this);

        this._moveToChatShownState();
    }

    // Begin event handler methods
    onSend() {
        const text = this.container.currentInputText().trim()
        this.container.clearCurrentInputText();
        if (text !== "")
            this.state.onSend(text);
    }

    onCloseChat() {
        this.container.confirmEndChat();
    }

    closeChat() {
        this.sdk.closeChat();

        this.container.destroy();
        this.container = null;

        this._moveToChatNullState();
    }

    onHideChat() {
        if (!this.minimised) {
            this.container.minimise();
            this.sdk.sendActivityMessage("minimize");
            this.minimised = true;
        }
    }

    onRestoreChat() {
        if (this.minimised) {
            this.container.restore();
            this.sdk.sendActivityMessage("restore");
            this.minimised = false;
        }
    }

    onClickedVALink(e) {
        this.state.onClickedVALink(e);
    }

    onConfirmEndChat() {
        console.log("End chat confirmed!")
        // for now
        this.closeChat();
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

