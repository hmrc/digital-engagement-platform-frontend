import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'


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
  elementWatcher.waitForEl(el, function () {
    dataLayerUpdater.updateDataLayer(el,w,d);

    statusObserver.observeStatus(el,w,d);
  },w);
}