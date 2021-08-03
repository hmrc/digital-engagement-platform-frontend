export const PopupContainerHtml = `
<div id="ciapiSkinContainer">
    <div id="ciapiSkinHeader">
        <div id="ciapiTitleBarLogo"><img src='/ask-hmrc/assets/media/logo.png'></div>
        <div id="ciapiSkinTitleBar" class="govuk-heading-s"><span>Ask HMRC</span></div>
        <button id="ciapiSkinCloseButton" title="Close chat window" aria-label="Close chat window"></button>
        <button id="ciapiSkinHideButton" title="Hide chat" aria-label="Hide chat"></button>
    </div>
    <div id="tools">
        <div id="print" class="govuk-link">
            <p><a href='#' title="Print or save" aria-label="Print or save" class="govuk-body">Print or save</a></p>
        </div>
        <div id="sound" class="govuk-link">
            <p><a href='#' title="Turn sound on" aria-label="Turn sound on" class="govuk-body">Turn sound on</a></p>
        </div>
    </div>
    <div id="ciapiChatComponents">
        <div id="ciapiSkinChatTranscript" role="log">
            <p class="info"><img src="/ask-hmrc/assets/media/intro-warn.svg">You are currently chatting with a computer.</p>
        </div>
        <div id="ciapiSkinFooter">
            <div id="ciapiInput"><textarea
                id="custMsg"
                class="govuk-textarea"
                aria-label="Type your message here"
                placeholder="Type your message here"
                rows="5"
                cols="50"
                wrap="physical"
                name="comments"></textarea></div>
            <div id="ciapiSend"><button
                id="ciapiSkinSendButton"
                class="govuk-button"
                title="Send message"
                aria-label="Send message">Send</button></div>
        </div>
    </div>
</div>
<div id="ciapiSkinMinimised">
    <button id="ciapiSkinRestoreButton" type="button" draggable="false" role="button" title="Show chat window" aria-label="Show chat window">
        <div id="logo-white"><img src="/ask-hmrc/assets/media/logo-white.png"></div>
        <h2 class="govuk-heading-s">Ask HMRC a Question</h2>
    </button>
</div>
`

export const EmbeddedContainerHtml = `
<div id="ciapiSkinContainer">
    <div id="ciapiSkinHeader">
        <button id="ciapiPrintButton" title="Print or save" aria-label="Print or save">Print or save</button>
        <button id="ciapiSoundButton" title="Turn sound on" aria-label="Turn sound on">Turn sound on</button>
    </div>
    <div id="ciapiSkinChatTranscript" role="log">
        <p class="info"><img src="/ask-hmrc/assets/media/intro-warn.svg">You are currently chatting with a computer.</p>
    </div>
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
            <button id="ciapiSkinCloseButton" title="End chat" aria-label="End chat">End chat</button>
        </div>
    </div>
</div>
`
