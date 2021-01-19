import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'
import {createDataLayerElement,reportEvent} from './addToDataLayer'
import {availabilities} from './getAvailability'

export function waitForCUI(w, d) {
  $(w).on("load", function () {
      var loadingAnimation = $('#cui-loading-animation')
      var messagingFrame = $('#nuanMessagingFrame')

      messagingFrame.hide();
      loadingAnimation.show();

      var el = '#nuanMessagingFrame';
      elementWatcher.waitForEl(el + ' #inqChatStage', function () {
        console.log("found nuance chat!")
        messagingFrame.show();
        loadingAnimation.hide();

//        dataLayerUpdater.updateDataLayer(el,w,d);
//        statusObserver.observeStatus(el,w,d);
      },
      function() {
        loadingAnimation.hide();
        console.log("Timed out waiting for CUI chat to appear");
      });
  });
};

export function waitForChanges(w, d) {
  $(w).on("load", function () {
    if (w.location.pathname.includes("payment-problems")) {
      waitForNuanceElement('#pp_self_assessment_webchat',w,d);
      waitForNuanceElement('#pp_vat_webchat',w,d);
      waitForNuanceElement('#pp_paye_webchat',w,d);
      waitForNuanceElement('#pp_corporation_tax_webchat',w,d);
    } else {
      waitForNuanceElement('#HMRC_Fixed_1',w,d);
    }
  });
};

function waitForNuanceElement(el,w,d) {
  elementWatcher.waitForEl(el + ' div span',
    function () {
      dataLayerUpdater.updateDataLayer(el,w,d);
      statusObserver.observeStatus(el,w,d);
    },
    function() {
      const assistantUsed = w.location.pathname.includes("virtual-assistant")
        ? "The digital assistant"
        : "Webchat";
      $(el).text(assistantUsed + ' is experiencing technical difficulties. Please keep refreshing the page to try again.')
      reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, el))
    }
  );
}
