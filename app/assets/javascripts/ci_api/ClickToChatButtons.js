import * as DisplayState from './NuanceDisplayState'

export default class ClickToChatButtons {
    constructor(onClicked) {
        this.buttons = {};
        this.onClicked = onClicked;
    }

    updateC2CButtonsToInProgress() {
      for (const c2cId of Object.keys(this.buttons)) {
        const c2cObj = {
          c2cIdx: c2cId,
          displayState: DisplayState.ChatActive,
          launchable: false
        };
        this.updateButton(c2cObj, this.buttons[c2cId]);
      };
    }

    getDisplayStateText(displayState) {
        switch (displayState) {
            case DisplayState.OutOfHours:
                return "Out of hours";
            case DisplayState.Ready:
                return "Ask HMRC a question";
            case DisplayState.Busy:
                return "All advisers are busy";
            case DisplayState.ChatActive:
                return "In progress";
            default:
                return "Unknown display state: " + displayState;
        }
    }

    updateButton(c2cObj, button) {

        const buttonText = this.getDisplayStateText(c2cObj.displayState);

        const innerHTML = `<div class="${button.buttonClass} ${c2cObj.displayState}">${buttonText}</div>`;

        const div = button.replaceChild(innerHTML);

        if (c2cObj.launchable) {
            div.onclick = function() {
                console.log(this);
                this.onClicked(c2cObj.c2cIdx);
            }.bind(this);
        }
    }

    addButton(c2cObj, button) {
        console.log("SetC2CButton for", button, ":", c2cObj);
        this.buttons[c2cObj.c2cIdx] = button;
        this.updateButton(c2cObj, button);
    }
}
