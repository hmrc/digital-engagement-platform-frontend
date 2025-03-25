import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'
import { createDataLayerElement, reportEvent } from './addToDataLayer'
import { availabilities } from './getAvailability'

export function waitForChanges(w, d) {
  w.addEventListener("load", function () {
    waitForNuanceElement('#HMRC_Fixed_1', w, d);
  });
};

function waitForNuanceElement(el, w, d) {
  elementWatcher.waitForEl(el + ' div',
    function () {
      dataLayerUpdater.updateDataLayer(el, w, d);
      statusObserver.observeStatus(el, w, d);
    },
    function () {
      var the_element = d.querySelector(el);
      if (the_element !== null) {
        the_element.textContent = "Sorry, there’s a problem with this service. Refresh the page to try again.";
      }

      reportEvent(w, createDataLayerElement(availabilities.NuanceUnavailable, el))

      var elements_to_hide = d.querySelectorAll(".hide-text-on-error");
      for (var i = 0; i < elements_to_hide.length; i++) {
        elements_to_hide[i].style.display = 'none';
      }
    }
  );
}
