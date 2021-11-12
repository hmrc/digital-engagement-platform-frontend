import ChatController from '../../../app/assets/javascripts/ci_api/controllers/ChatController'

describe("ChatController", () => {
    it("launches a proactive chat", () => {
        const controller = new ChatController();
        const sdk = {
            isChatInProgress: jest.fn().mockReturnValue(false),
            getOpenerScripts: jest.fn().mockReturnValue(null),
            chatDisplayed: jest.fn()
        };

        window.Inq = {
            SDK: sdk
        };

        controller.nuanceFrameworkLoaded(window);
        controller.launchProactiveChat();

        expect(sdk.getOpenerScripts).toHaveBeenCalled();
        expect(sdk.chatDisplayed).toHaveBeenCalled();
    })
});
