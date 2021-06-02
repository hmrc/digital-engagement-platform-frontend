export default class ClickToChatButtons {
    constructor(sdk, controller) {
        this.buttons = {};
        this.sdk = sdk;
        this.controller = controller;
    }

    updateC2CButtonsToInProgress() {
      for (const c2dId of Object.keys(this.buttons)) {
        const c2cObj = {
          c2cIdx: c2cId,
          displayState: "chatactive",
          launchable: false
        };
        updateC2CButton(c2cObj, this.buttons[c2cId]);
      };
    }

    updateC2CButton(c2cObj, divID) {
        const btn = document.getElementById(divID);
        const div = window.top.document.createElement("DIV");

        const btnType = (divID.toLowerCase().match(/anchored/)) ? "anchored" : "fixed";

        div.setAttribute("class", "c2cButton");
        switch (c2cObj.displayState) {
            case 'outofhours':
              div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">Out of hours</div>`;
              break;
            case 'ready':
              div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">Ask HMRC a question</div>`;
              break;
            case 'busy':
              div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">All advisers are busy</div>`;
              break;
            case 'chatactive':
              div.innerHTML = `<div class="${btnType} ${c2cObj.displayState}">In progress</div>`;
        }
        btn.innerHTML = "";
        btn.appendChild(div);

        if (c2cObj.launchable) {
            const btn = document.getElementById(divID);
            btn.onclick = function() {
                console.log(this);
                ths.sdk.onC2CClicked(c2cObj.c2cIdx, function(state) {
                    console.log("onC2CClicked callback:");
                    console.log(state);

                    // create chat window
                    this.controller.main();
                }.bind(this));
            }
        }
    }

    addC2CButton(c2cObj, divID) {
        console.log("SetC2CButton for", divID, ":", c2cObj);
        this.buttons[c2cObj.c2cIdx] = divID;
        this.updateC2CButton(c2cObj, divID);
    }
};
