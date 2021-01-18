import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'

export function waitForCUI(d, w) {
  $(window).on("load", function () {
      elementWatcher.waitForEl('#nuanMessagingFrame', function () {

        dataLayerUpdater.updateDataLayer(el,w,d);
        statusObserver.observeStatus(el,w,d);
      },
      function() {
        console.log("Timed out waiting for CUI chat to appear");
      });
  });
};

export function waitForChanges(d, w) {
  $(window).on("load", function () {
    if (window.location.pathname.includes("payment-problems")) {
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
  elementWatcher.waitForEl(el,
    function () {
      updateDataLayer(el,w,d);

      observeStatus(el,w,d);
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
