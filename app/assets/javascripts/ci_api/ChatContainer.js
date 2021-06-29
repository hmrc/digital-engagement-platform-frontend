import Transcript from './Transcript'

const nullEventHandler = {
    onSend: function() {},
    onCloseChat: function() {},
    onClickedVALink: function(e) {},
};

export default class ChatContainer {
    constructor(messageClasses) {
        this.container = document.createElement("div")
        this.container.id = "ciapiSkinContainer";
        this.eventHandler = nullEventHandler;

        let containerHtml = `
        <div id="ciapiSkinHeader">
           <div id="ciapiTitleBarLogo"><img src='/ask-hmrc/assets/media/logo.png'></div>
           <div id="ciapiSkinTitleBar"><span>Ask HMRC</span></div>
           <button id="ciapiSkinCloseButton" title="Close chat window" aria-label="Close chat window"></button>
        </div>
        <div id="ciapiSkinChatTranscript" role="log"></div>
        <div id="ciapiSkinFooter">
            <div><textarea
              id="custMsg"
              aria-label="Type your message here"
              placeholder="Type your message here"
              rows="5"
              cols="50"
              wrap="physical"
              name="comments"></textarea></div>
           <div><button id="ciapiSkinSendButton" title="Send message" aria-label="Send message">Send</button></div>
        </div>
        `

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

        this.container.querySelector("#ciapiSkinCloseButton").addEventListener("click", (e) => {
            this.eventHandler.onCloseChat();
        });

        this.custInput.addEventListener('keypress', (e) => {
            if (e.which == 13) {
                this.eventHandler.onSend();
                e.preventDefault()
            }
        });
    }
}
