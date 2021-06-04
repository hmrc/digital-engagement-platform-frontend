import ClickToChatButtons from '../../../app/assets/javascripts/ci_api/ClickToChatButtons'
import * as DisplayState from '../../../app/assets/javascripts/ci_api/NuanceDisplayState'

const displayStateMessages = {
    [DisplayState.OutOfHours]: "OutOfHoursText",
    [DisplayState.Ready]: "ReadyText",
    [DisplayState.Busy]: "BusyText",
    [DisplayState.ChatActive]: "ChatActiveText"
};

class TestContext {
    constructor() {
        this.onClicked = jest.fn();
        this.buttons = new ClickToChatButtons(this.onClicked, displayStateMessages),
        this.button = {
            buttonClass: 'button-class',
            replaceChild: jest.fn()
        }
    }
};

function c2cObj(displayState) {
    return {
        c2cIdx: 'c2c-id',
        displayState: displayState,
        launchable: false
    };
}

describe("ClickToChatButtons", () => {
    it("adds a button with active state", () => {
        const context = new TestContext();

        context.buttons.addButton(c2cObj(DisplayState.ChatActive), context.button);

        expect(context.button.replaceChild).toHaveBeenCalledWith('<div class="button-class chatactive">ChatActiveText</div>');
    });

    it("adds a button with out-of-hours state", () => {
        const context = new TestContext();

        context.buttons.addButton(c2cObj(DisplayState.OutOfHours), context.button);

        expect(context.button.replaceChild).toHaveBeenCalledWith('<div class="button-class outofhours">OutOfHoursText</div>');
    });
    it("adds a button with ready state", () => {
        const context = new TestContext();

        context.buttons.addButton(c2cObj(DisplayState.Ready), context.button);

        expect(context.button.replaceChild).toHaveBeenCalledWith('<div class="button-class ready">ReadyText</div>');
    });
    it("adds a button with busy state", () => {
        const context = new TestContext();

        context.buttons.addButton(c2cObj(DisplayState.Busy), context.button);

        expect(context.button.replaceChild).toHaveBeenCalledWith('<div class="button-class busy">BusyText</div>');
    });
});
