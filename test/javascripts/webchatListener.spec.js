import {chatListener, initChatListener} from '../../app/assets/javascripts/webchatListener.js'

var protoListener = Object.assign({}, chatListener)
protoListener.name = "protoListener";
let index = 0;

describe("Webchat listener", () => {
    describe("initialisation", () => {
        it("will create the InqRegistry", () => {
            initChatListener(window);
            expect(window.InqRegistry).toEqual({ listeners: [chatListener] })
        });
    });
    describe("chat listener", () => {
        let testListener;

        beforeEach(() => {
            testListener = Object.assign({}, protoListener)
            testListener.name = "test listener #" + index++;
            document.body.innerHTML = `
                <div class="webchat-messaging-container">
                    <div id="HMRC_Fixed_1"></div>
                </div>
                <div class="webchat-loading-text" style="display:none">
                    "Checking adviser availability." alt="Chat is loading">
                </div>
            `;
            jest.useFakeTimers();
        });
        afterEach(() => {
            jest.clearAllTimers();
            testListener.shutdown(window);
        });

        it("will have basic properties", () => {
            expect(testListener.downTimeoutDuration).toBe(9*1000);
            expect(testListener.loadingTextSelector).toBe('.webchat-loading-text');
            expect(testListener.messagingContainerSelector).toBe('.webchat-messaging-container');
        });

        it("will do show the loading text on load after startup is called", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));

            let text = document.getElementsByClassName('webchat-loading-text')
            expect(text.length).toBe(1);
            expect(text[0].style.display).toBe("block");
        });

        it("will hide the loading text if activity and then shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));

            testListener.onC2CStateChanged({});
            testListener.onAnyEvent({});
            let text = document.getElementsByClassName('webchat-loading-text')
            expect(text[0].style.display).toBe("none");
        });

        it("will hide the loading text if timeout", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));

            jest.runOnlyPendingTimers();

            let text = document.getElementsByClassName('webchat-loading-text')
            expect(text[0].style.display).toBe("none");
        });

    });
});
