import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'
import {createDataLayerElement,reportEvent} from './addToDataLayer'
import {availabilities} from './getAvailability'

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
  elementWatcher.waitForEl(el + ' div',
    function () {
      dataLayerUpdater.updateDataLayer(el,w,d);
      statusObserver.observeStatus(el,w,d);
    },
    function() {
      const assistantUsed = w.location.pathname.includes("virtual-assistant")
        ? "the digital assistant"
        : "webchat";
      $(el).text("There's a problem with " + assistantUsed + ". Try again later.")
      reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, el))
      $(".hide-text-on-error").hide();
    }
  );
}
