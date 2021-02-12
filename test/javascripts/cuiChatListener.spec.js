import {chatListener, initChatListener} from '../../app/assets/javascripts/cuiChatListener.js'

var protoListener = Object.assign({}, chatListener)
protoListener.name = "protoListener";
let index = 0;

describe("CUI chat listener", () => {
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
                <div id="cui-messaging-container">
                    <div id="nuanMessagingFrame"></div>
                </div>
                <div id="cui-loading-animation" style="display:none">
                    <img src='@routes.Assets.versioned("media/cui_animation.svg")' alt="Chat is loading">
                </div>
            `;
       		jest.useFakeTimers();
        });
        afterEach(() => {
            jest.clearAllTimers();
            $(window).off("load")
        });

        it("will have basic properties", () => {
            expect(testListener.downTimeoutDuration).toBe(15*1000);
            expect(testListener.engagementTimeoutDuration).toBe(10*1000);
            expect(testListener.loadingAnimationSelector).toBe('#cui-loading-animation');
            expect(testListener.messagingContainerSelector).toBe('#cui-messaging-container');
        });

        it("will do show the loading animation on load after startup is called", () => {
            testListener.startup(window);
            $(window).trigger('load');

            let animation = $('#cui-loading-animation')
            expect(animation.length).toBe(1);
            expect(animation.css("display")).toBe("block");
        });

        it("will do show an error if times out with no activity", () => {
            testListener.startup(window);
            $(window).trigger('load');
            expect($('.cui-technical-error').length).toBe(0);

			jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(1);
        });

        it("will not show an error if activity and then shown", () => {
            testListener.startup(window);
            $(window).trigger('load');
            expect($('.cui-technical-error').length).toBe(0);

            testListener.onAnyEvent({});
            testListener.onChatLaunched({});
            testListener.onAnyEvent({});
            testListener.onChatShown({});
            testListener.onAnyEvent({});

			jest.runOnlyPendingTimers();
            expect($('.cui-technical-error').length).toBe(0);
        });
    });
});
