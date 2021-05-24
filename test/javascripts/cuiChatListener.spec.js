import {chatListener, initChatListener} from '../../app/assets/javascripts/cuiChatListener.js'

var protoListener = Object.assign({}, chatListener)
protoListener.name = "protoListener";
let index = 0;

describe("CUI chat listener", () => {
    var originalUserAgent = navigator.userAgent
    function setUserAgent(userAgent) {
        Object.defineProperty(global.navigator, 'userAgent', {
          configurable: true,
          get() {
            return userAgent;
          },
        })
    }

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
                <div class='govuk-template__body'>
                    <div id="cui-messaging-container">
                        <div id="nuanMessagingFrame"></div>
                    </div>
                    <div id="cui-loading-animation" style="display:none">
                        <img src='@routes.Assets.versioned("media/cui_animation.svg")' alt="Chat is loading">
                    </div>
                </div>
            `;
            jest.useFakeTimers();
            $.fx.off = true;
        });
        afterEach(() => {
            if (navigator.userAgent !== originalUserAgent) {
                setUserAgent(originalUserAgent);
            }
            jest.clearAllTimers();
            testListener.shutdown(window);
            $.fx.off = false;
        });

        it("will have basic properties", () => {
            expect(testListener.downTimeoutDuration).toBe(15*1000);
            expect(testListener.engagementTimeoutDuration).toBe(10*1000);
            expect(testListener.loadingAnimationSelector).toBe('#cui-loading-animation');
            expect(testListener.messagingContainerSelector).toBe('#cui-messaging-container');
        });

        it("will do show the loading animation on load after startup is called", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));

            let animation = $('#cui-loading-animation')
            expect(animation.length).toBe(1);
            expect(animation.css("display")).toBe("block");
        });

        it("will do show an error if times out with no activity", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('.cui-technical-error').length).toBe(0);

            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(1);
        });

        it("will not show an error if activity and then shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('.cui-technical-error').length).toBe(0);

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(0);
        });

        it("will show the Nuance div if activity and then shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('#cui-messaging-container').css("opacity")).toBe("0");

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect($('#cui-messaging-container').css("opacity")).toBe("1");
            expect($('.cui-technical-error').length).toBe(0);

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(0);
        });

        it("will hide the loading animation on chat load", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('#cui-loading-animation').css("display")).toBe("block");

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect($('#cui-loading-animation').css("display")).toBe("none")
         });

        it("will show an error if activity and then not engaged or shown", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('.cui-technical-error').length).toBe(0);

            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(1);
        });

        it("will not show an error if activity and then shown after timeout", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('.cui-technical-error').length).toBe(0);

            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();

            expect($('.cui-technical-error').length).toBe(1);
            expect($('.cui-technical-error').css("display")).toBe("block");

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            expect($('.cui-technical-error').length).toBe(1);
            expect($('.cui-technical-error').css("display")).toBe("none");

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(1);
            expect($('.cui-technical-error').css("display")).toBe("none");

        });

        it("will not show an error if activity and then shown after timeout", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('.cui-technical-error').length).toBe(0);

            jest.runOnlyPendingTimers();

            testListener.onAnyEvent({});

            testListener.onChatLaunched({});
            testListener.onAnyEvent({});

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            expect($('.cui-technical-error').length).toBe(1);
            expect($('.cui-technical-error').css("display")).toBe("none");

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(1);
            expect($('.cui-technical-error').css("display")).toBe("none");
        });

        it("will not show an error if activity and then shown before any other event", () => {
            testListener.startup(window);
            window.dispatchEvent(new Event('load'));
            expect($('.cui-technical-error').length).toBe(0);

            testListener.onChatShown({});
            testListener.onAnyEvent({});

            jest.runOnlyPendingTimers();

            expect($('.cui-technical-error').length).toBe(0);

            // Make sure there are no lingering behaviours.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(0);
        });

        it ("will set the mobile class on body if it's a mobile device", () => {
            setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1");

            testListener.startup(window);

            expect($('.govuk-template__body').hasClass('cui-mobile-popup')).toBeTruthy();
        });

        it ("will not set the mobile class on body if it's not a mobile device", () => {
            setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36");

            testListener.startup(window);

            expect($('.govuk-template__body').hasClass('cui-mobile-popup')).toBeFalsy();
        });

        it ("will remove the mobile class on body if the wait times out", () => {
            setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1");

            testListener.startup(window);
            window.dispatchEvent(new Event('load'));

            jest.runOnlyPendingTimers();

            expect($('.govuk-template__body').hasClass('cui-mobile-popup')).toBeFalsy();

        });

    });
});
