import ClickToChatButtons from '../../../app/assets/javascripts/ci_api/ClickToChatButtons'
import * as DisplayState from '../../../app/assets/javascripts/ci_api/NuanceDisplayState'

const displayStateMessages = {
    [DisplayState.OutOfHours]: "OutOfHoursText",
    [DisplayState.Ready]: "ReadyText",
    [DisplayState.Busy]: "BusyText",
    [DisplayState.ChatActive]: "ChatActiveText"
};

describe("ClickToChatButtons", () => {
    it("adds a button with active state", () => {
        const onClicked = jest.fn();
        const buttons = new ClickToChatButtons(onClicked, displayStateMessages);

        const button = {
            buttonClass: 'button-class',
            replaceChild: jest.fn()
        };

        const c2cObj = {
            c2cIdx: 'c2c-id',
            displayState: DisplayState.ChatActive,
            launchable: false
        };

        buttons.addButton(c2cObj, button);

        expect(button.replaceChild).toHaveBeenCalledWith('<div class="button-class chatactive">ChatActiveText</div>');
    });
    it("adds a button with out-of-hours state", () => {
        const onClicked = jest.fn();
        const buttons = new ClickToChatButtons(onClicked, displayStateMessages);

        const button = {
            buttonClass: 'button-class',
            replaceChild: jest.fn()
        };

        const c2cObj = {
            c2cIdx: 'c2c-id',
            displayState: DisplayState.OutOfHours,
            launchable: false
        };

        buttons.addButton(c2cObj, button);

        expect(button.replaceChild).toHaveBeenCalledWith('<div class="button-class outofhours">OutOfHoursText</div>');
    });
    it("adds a button with ready state", () => {
        const onClicked = jest.fn();
        const buttons = new ClickToChatButtons(onClicked, displayStateMessages);

        const button = {
            buttonClass: 'button-class',
            replaceChild: jest.fn()
        };

        const c2cObj = {
            c2cIdx: 'c2c-id',
            displayState: DisplayState.Ready,
            launchable: false
        };

        buttons.addButton(c2cObj, button);

        expect(button.replaceChild).toHaveBeenCalledWith('<div class="button-class ready">ReadyText</div>');
    });
    it("adds a button with busy state", () => {
        const onClicked = jest.fn();
        const buttons = new ClickToChatButtons(onClicked, displayStateMessages);

        const button = {
            buttonClass: 'button-class',
            replaceChild: jest.fn()
        };

        const c2cObj = {
            c2cIdx: 'c2c-id',
            displayState: DisplayState.Busy,
            launchable: false
        };

        buttons.addButton(c2cObj, button);

        expect(button.replaceChild).toHaveBeenCalledWith('<div class="button-class busy">BusyText</div>');
    });
});
