import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'
import {createDataLayerElement,reportEvent} from './addToDataLayer'
import {availabilities} from './getAvailability'

export function waitForCIAPIFixedChanges(w, d) {
  console.log(">>>>waitForCIAPIFixedChanges")
  w.addEventListener("load", function () {
      waitForNuanceElement('#HMRC_CIAPI_Fixed_1',w,d);
  });
};

function waitForNuanceElement(el,w,d) {
  elementWatcher.waitForEl(el + ' div',
     function () {
      dataLayerUpdater.updateDataLayer(el,w,d);
      statusObserver.observeStatus(el,w,d);
    },
    function() {
      const assistantUsed = w.location.pathname.includes("webchat")
        ? "webchat"
        : "the digital assistant";

      var the_element = d.querySelector(el);
      the_element.textContent = "There's a problem with " + assistantUsed + ". Try again later.";

      reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, el))

      var elements_to_hide = d.querySelectorAll(".hide-text-on-error");
      for (var i = 0; i < elements_to_hide.length; i++) {
        elements_to_hide[i].style.display = 'none';
      }
    }
  );

}
