import Transcript from './Transcript'

export default class ChatContainer {
    constructor(messageClasses, onVAClickHandler) {
        this.container = document.createElement("div")
        this.container.id = "ciapiSkinContainer";

        let containerHtml = `
        <div id="ciapiSkinHeader">
           <div id="ciapiSkinTitleBar"><span>Ask HMRC</span></div>
           <div id="ciapiSkinCloseButton">(X)</div>
        </div>
        <div id="ciapiSkinChatTranscript" role="log"></div>
        <div id="ciapiSkinFooter">
           <textarea id="custMsg" rows="5" cols="50" wrap="physical" name="comments"></textarea>
           <div id="ciapiSkinSendButton">Send</div>
        </div>
        `

        this.container.insertAdjacentHTML("beforeend", containerHtml);
        this.content = this.container.querySelector("#ciapiSkinChatTranscript");
        this.custInput = this.container.querySelector("#custMsg");
        this.transcript = new Transcript(this.content, onVAClickHandler, messageClasses);
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

    registerEventListeners(onSend, onCloseChat) {
        this.container.querySelector("#ciapiSkinSendButton").addEventListener("click", (e) => {
            onSend();
        });

        this.container.querySelector("#ciapiSkinCloseButton").addEventListener("click", (e) => {
            onCloseChat();
        });

        this.custInput.addEventListener('keypress', (e) => {
            if (e.which == 13) {
                onSend();
                e.preventDefault()
            }
        });
    }
}
