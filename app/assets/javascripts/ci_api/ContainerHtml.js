export const PopupContainerHtml = `
<div id="ciapiSkinContainer">
    <div id="ciapiSkinHeader">
        <div id="ciapiTitleBarLogo"><img src='/ask-hmrc/assets/media/logo.png' alt=""></div>
        <div id="ciapiSkinTitleBar" class="govuk-heading-s"><span>Ask HMRC</span></div>
        <div id="hideCloseContainer">
            <button id="ciapiSkinHideButton"  draggable="false" role="button" type="button" aria-label="Minimise chat window"></button>
            <button id="ciapiSkinCloseButton" draggable="false" role="button" type="button" aria-label="Close chat window"></button>
        </div>
    </div>
    <div id="tools">
        <div id="print">
            <button class="govuk-button govuk-button--secondary" data-module="govuk-button">
                Print or save
            </button>
        </div>
        <div id="sound">
            <button class="govuk-button govuk-button--secondary" data-module="govuk-button">
                Turn sound on
            </button>
        </div>
    </div>
    <div id="ciapiChatComponents">
        <div id="ciapiSkinChatTranscript" role="log" tabindex="0">
            <p class="info"><img src="/ask-hmrc/assets/media/intro-warn.svg" alt="">You are currently chatting with a computer.</p>
        </div>
        <div id="ciapiSkinFooter">
            <div id="ciapiInput"><textarea
                id="custMsg"
                class="govuk-textarea"
                aria-label="Type your message here"
                placeholder="Type your message here"
                rows="5"
                cols="50"
                name="comments"></textarea></div>
            <div id="ciapiSend"><button
                id="ciapiSkinSendButton"
                class="govuk-button">Send</button></div>
        </div>
    </div>
</div>
<div id="ciapiSkinMinimised">
    <button id="ciapiSkinRestoreButton" type="button" draggable="false" role="button" aria-label="Show chat window">
        <div id="logo-white"><img src="/ask-hmrc/assets/media/logo-white.png" alt=""></div>
        <h2 class="govuk-heading-s">Ask HMRC a Question</h2>
    </button>
</div>
`

export const EmbeddedContainerHtml = `
<div id="ciapiSkinContainer">
    <div id="ciapiSkinHeader">
        <div id="print">
            <button class="govuk-button govuk-button--secondary" data-module="govuk-button">
                Print or save
            </button>
        </div>
        <div id="sound">
            <button class="govuk-button govuk-button--secondary" data-module="govuk-button">
                Turn sound on
            </button>
        </div>
    </div>
    <div id="ciapiChatComponents">
        <div id="ciapiSkinChatTranscript" role="log" tabindex="0">
            <p class="info"><img src="/ask-hmrc/assets/media/intro-warn.svg" alt="">You are currently chatting with a computer.</p>
        </div>
        <div id="ciapiSkinFooter">
            <div>
                <div id="ciapiInput"><textarea
                    id="custMsg"
                    aria-label="Type your message here"
                    placeholder="Type your message here"
                    class="govuk-textarea"
                    cols="50"
                    name="comments"></textarea>
                </div>
                <div id="ciapiSend">
                    <button id="ciapiSkinSendButton" class="govuk-button">Send</button>
                </div>
            </div>
            <div id="ciapiClose">
                <button id="ciapiSkinCloseButton">End chat</button>
            </div>
        </div>
    </div>
</div>
`
