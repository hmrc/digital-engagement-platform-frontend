import Transcript from './Transcript'

const nullEventHandler = {
    onSend: function() {},
    onCloseChat: function() {},
    onHideChat: function() {},
    onClickedVALink: function(e) {},
};

export default class ChatContainer {
    constructor(messageClasses, containerHtml) {
        this.container = document.createElement("div")
        this.container.id = "ciapiSkinContainer";
        this.eventHandler = nullEventHandler;

        this.container.insertAdjacentHTML("beforeend", containerHtml);
        this.content = this.container.querySelector("#ciapiSkinChatTranscript");
        this.custInput = this.container.querySelector("#custMsg");
        this.transcript = new Transcript(this.content, (e) => this.eventHandler.onClickedVALink(e), messageClasses);
        this._registerEventListeners();
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

    setEventHandler(eventHandler) {
        this.eventHandler = eventHandler;
    }

    _registerEventListeners() {
        this.container.querySelector("#ciapiSkinSendButton").addEventListener("click", (e) => {
            this.eventHandler.onSend();
        });

        const closeButton = this.container.querySelector("#ciapiSkinCloseButton");
        if (closeButton) {
            closeButton.addEventListener("click", (e) => {
                this.eventHandler.onCloseChat();
            });
        }

        const hideButton = this.container.querySelector("#ciapiSkinHideButton");
        if (hideButton) {
            hideButton.addEventListener("click", (e) => {
                this.eventHandler.onHideChat();
            });
        }

        this.custInput.addEventListener('keypress', (e) => {
            if (e.which == 13) {
                this.eventHandler.onSend();
                e.preventDefault()
            }
        });
    }
}
