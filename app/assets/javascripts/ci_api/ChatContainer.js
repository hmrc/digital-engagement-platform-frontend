import Transcript from './Transcript'
import EndChatPopup from './EndChatPopup'

const nullEventHandler = {
    onSend: function() {},
    onCloseChat: function() {},
    onHideChat: function() {},
    onRestoreChat: function() {},
    onClickedVALink: function(e) {},
    onConfirmEndChat: function() {}
};

export default class ChatContainer {
    constructor(messageClasses, containerHtml) {
        this.container = document.createElement("div")
        this.container.id = "ciapiSkin";
        this.eventHandler = nullEventHandler;

        this.container.insertAdjacentHTML("beforeend", containerHtml);
        this.content = this.container.querySelector("#ciapiSkinChatTranscript");
        this.custInput = this.container.querySelector("#custMsg");
        this.transcript = new Transcript(this.content, (e) => this.eventHandler.onClickedVALink(e), messageClasses);
        this._registerEventListeners();
        this.endChatPopup = new EndChatPopup(this.container.querySelector("#ciapiSkinContainer"), this);
    }

    element() {
        return this.container;
    }

    contentElement() {
        return this.content;
    }

    currentInputText() {
       return this.custInput.value;
    }

    clearCurrentInputText() {
       this.custInput.value = "";
    }

    getTranscript() {
        return this.transcript;
    }

    destroy() {
       this.container.parentElement.removeChild(this.container);
    }

    minimise() {
        this.container.classList.add("minimised");
    }

    restore() {
        this.container.classList.remove("minimised");
    }

    setEventHandler(eventHandler) {
        this.eventHandler = eventHandler;
    }

    _registerEventListener(selector, handler) {
        const element = this.container.querySelector(selector);
        if (element) {
            element.addEventListener("click", handler);
        }
    }

    _registerEventListeners() {
        this._registerEventListener("#ciapiSkinSendButton", (e) => {
             this.eventHandler.onSend();
        });

        this._registerEventListener("#ciapiSkinCloseButton", (e) => {
             this.eventHandler.onCloseChat();
        });

        this._registerEventListener("#ciapiSkinHideButton", (e) => {
             this.eventHandler.onHideChat();
        });

        this._registerEventListener("#ciapiSkinRestoreButton", (e) => {
             this.eventHandler.onRestoreChat();
        });

        this.custInput.addEventListener('keypress', (e) => {
            if (e.which == 13) {
                this.eventHandler.onSend();
                e.preventDefault()
            }
        });
    }

    confirmEndChat() {
        this.endChatPopup.show();
    }

    onCancelEndChat() {
        this.endChatPopup.hide();
    }

    onConfirmEndChat() {
        this.endChatPopup.hide();
        this.eventHandler.onConfirmEndChat();
    }
}
