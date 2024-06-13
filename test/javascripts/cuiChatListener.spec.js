import {chatListener, initChatListener} from '../../app/assets/javascripts/cuiChatListener.js'

var protoListener = Object.assign({}, chatListener)
protoListener.name = "protoListener";
let index = 0;

describe("CUI chat listener", () => {
    describe("initialisation", () => {
        it("will create the InqRegistry", () => {
            initChatListener(window);
            expect(window.InqRegistry).toEqual({ listeners: [chatListener] })
            chatListener.shutdown(window);
        });
    });
    describe("chat listener", () => {
        let testListener;

        beforeEach(() => {
            testListener = Object.assign({}, protoListener)
            testListener.name = "test listener #" + index++;
            document.body.innerHTML = `
                <div class="cui-wrapper">
                    <div id="cui-messaging-container">
                        <div id="nuanMessagingFrame">
                            <div id="error-message" aria-live="assertive" role="alert"></div>
                        </div>
                    </div>
                    <div id="cui-loading-animation" style="display:none">
                        <img src='@routes.Assets.versioned("media/cui_animation.svg")' alt="Chat is loading">
                    </div>
                </div>
            `;
            jest.useFakeTimers();
        });
        afterEach(() => {
            jest.clearAllTimers();
            testListener.shutdown(window);
        });

        it("will have basic properties", () => {
            expect(testListener.downTimeoutDuration).toBe(10*1000);
            expect(testListener.engagementTimeoutDuration).toBe(6*1000);
            expect(testListener.loadingAnimationSelector).toBe('#cui-loading-animation');
            expect(testListener.messagingContainerSelector).toBe('#cui-messaging-container');
        });

        it("will do show the loading animation on load after startup is called", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));

            let animation = document.getElementById('cui-loading-animation')

            expect(animation.style.display).toBe("block");
            
        });

        it("will do show an error if times out with no activity", () => {
            const errorClass = document.getElementsByClassName('cui-technical-error')
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            if (errorClass) {
                expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);
            }
            

            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(1);
            expect(document.body.innerHTML).toContain('aria-live="assertive"');
        });

        it("will not show an error if activity and then shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);
        });

        it("will show the Nuance div if activity and then shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(document.getElementById('cui-messaging-container').style.display).toBe("block");

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect(document.getElementById('cui-messaging-container').style.display).toBe("block");
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);
        });

        it("will hide the loading animation on chat load", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(document.getElementById('cui-loading-animation').style.display).toBe("block");

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect(document.getElementById('cui-loading-animation').style.display).toBe("none");
         });

        it("will show an error if activity and then not engaged or shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);

            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(1);
        });

        it("will not show an error if activity and then shown after timeout", () => {
            const errorClass = document.getElementsByClassName('cui-technical-error')
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(errorClass.length).toBe(0);

            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();

            expect(errorClass.length).toBe(1);

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            expect(errorClass.length).toBe(1);

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(1);

        });

        it("will not show an error if activity and then shown after timeout", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);

            jest.runOnlyPendingTimers();

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            expect(document.getElementsByClassName('cui-technical-error').length).toBe(1);

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(1);
        });

        it("will not show an error if activity and then shown before any other event", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();

            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect(document.getElementsByClassName('cui-technical-error').length).toBe(0);
        });
    });
});
