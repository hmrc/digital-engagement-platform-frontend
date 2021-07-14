export const PopupContainerHtml = `
    <div id="ciapiSkinHeader">
        <div id="ciapiTitleBarLogo"><img src='/ask-hmrc/assets/media/logo.png'></div>
        <div id="ciapiSkinTitleBar"><span>Ask HMRC</span></div>
        <button id="ciapiSkinCloseButton" title="Close chat window" aria-label="Close chat window"></button>
        <button id="ciapiSkinHideButton" title="Hide chat" aria-label="Hide chat"></button>
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

export const EmbeddedContainerHtml = `
    <div id="ciapiSkinHeader">
        <button id="ciapiPrintButton" title="Print or save" aria-label="Print or save">Print or save</button>
        <button id="ciapiSoundButton" title="Turn sound on" aria-label="Turn sound on">Turn sound on</button>
    </div>
    <div id="ciapiSkinChatTranscript" role="log"></div>
    <div id="ciapiSkinFooter">
        <div>
            <textarea
                id="custMsg"
                aria-label="Type your message here"
                placeholder="Type your message here"
                cols="50"
                wrap="physical"
                name="comments"></textarea>
            <button id="ciapiSkinSendButton" title="Send message" aria-label="Send message">Send</button>
        </div>
        <div>
            <button id="ciapiEndChatButton" title="End chat" aria-label="End chat">End chat</button>
        </div>
    </div>
    `

