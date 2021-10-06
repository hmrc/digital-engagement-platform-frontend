import ClickToChatButtons from './ClickToChatButtons'
import ClickToChatButton from './ClickToChatButton'
import ChatContainer from './ChatContainer'
import * as MessageClasses from './DefaultClasses'
import * as DisplayState from './NuanceDisplayState'
import * as ChatStates from './ChatStates'
import * as ContainerHtml from './ContainerHtml'
import PostChatSurvey from './PostChatSurvey'
import PostPCSPage from './PostPCSPage'
import PostChatSurveyService from './PostChatSurveyService'

const c2cDisplayStateMessages = {
    [DisplayState.OutOfHours]: "Out of hours",
    [DisplayState.Ready]: "Ask HMRC a question",
    [DisplayState.Busy]: "All advisers are busy",
    [DisplayState.ChatActive]: "In progress"
};

const survey = {
    id: "300001",
    questions: [
        { id: ["q1-","q1--2"], text: "Was the chatbot useful?", freeform: false},
        { id: ["q2-","q2--2"], text: "Was the chatbot your first contact choice?", freeform: false},
        { id: ["q3-", "q3--2","q3--3","q3--4"], text: "If you had not used chatbot today, how else would you have contacted us?", freeform: false}
    ]
};

const automaton = {
    id: "survey-300001",
    name: "AutomatonName"
};

const timestamp = Date.now();

function getRadioValue(radioGroup)
{
    var elements = document.getElementsByName(radioGroup);

    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
}

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
            console.error("This should never happen. If it doesn't, then remove this 'if'")
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
        this._moveToState(new ChatStates.ShownState(
            (text) => this._engageChat(text),
            () => this.closeChat()));
        this.minimised = false;
    }

    _moveToChatEngagedState(previousMessages = []) {
        this._moveToState(new ChatStates.EngagedState(
            this.sdk,
            this.container,
            previousMessages,
            () => this.container.confirmEndChat()));
    }

    _moveToClosingState() {
        this._moveToState(new ChatStates.ClosingState(() => this.closeChat() ))
    }

    _getEmbeddedDiv() {
        return document.getElementById("HMRC_CIAPI_Embedded_1")
    }

    _showChat() {
        const embeddedDiv = this._getEmbeddedDiv();
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
        this.state.onClickedClose();
    }

    closeChat() {

        if(document.body.contains(document.getElementById("postChatSurveyWrapper"))) {
            this._sendPostChatSurvey(this.sdk).closePostChatSurvey(automaton, timestamp);
        }

        this.closeNuanceChat();

        if (this._getEmbeddedDiv()) {
            // Embedded view never dies.
            this.showEndChatPage(false);
        } else {
            this.container.destroy();
            this.container = null;
        }

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
        this._moveToClosingState();
        this._sendPostChatSurvey(this.sdk).beginPostChatSurvey(survey, automaton, timestamp);
        this.container.showPage(new PostChatSurvey((page) => this.onPostChatSurveySubmitted(page)));
    }

    onPostChatSurveySubmitted(surveyPage) {
        const answers = {
            answers: [
                {id: "a1", text: getRadioValue("q1-"), freeform: false},
                {id: "a2", text: getRadioValue("q2-"), freeform: false},
                {id: "a3", text: getRadioValue("q3-"), freeform: false}
            ]
        };

        var surveyWithAnswers = Object.assign(answers, survey);

        this._sendPostChatSurvey(this.sdk).submitPostChatSurvey(surveyWithAnswers, automaton, timestamp);
        surveyPage.detach();
        this.showEndChatPage(true);
    }

    showEndChatPage(showThanks) {
        this.container.showPage(new PostPCSPage(showThanks));
        this.closeNuanceChat();
    }

    closeNuanceChat() {
        if (this.sdk.isChatInProgress()) {
            this.sdk.closeChat();
        }
    }

    // End event handler method
    _sendPostChatSurvey(sdk) {
        return new PostChatSurveyService(sdk);
    }

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
