import * as elementWatcher from './waitForEl'
import * as statusObserver from './statusObserver'
import * as dataLayerUpdater from './updateDatalayer'
import { createDataLayerElement, reportEvent } from './addToDataLayer'
import { availabilities } from './getAvailability'

export function waitForCIAPIFixedChanges(w, d) {
  w.addEventListener("load", function () {
    waitForNuanceElement('#HMRC_CIAPI_Fixed_1', w, d);
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
      const errorHeading = document.createElement('h2')
      errorHeading.classList.add('govuk-heading-s')
      errorHeading.tabIndex = 0
      errorHeading.ariaLive = "assertive"
      errorHeading.role = "alert"
      the_element.textContent = ''
      errorHeading.textContent = "Sorry, there’s a problem with this service. Refresh the page to try again.";
      the_element.appendChild(errorHeading)

      const businessAreaTitle = document.title
      document.title = errorHeading.textContent
      let displayingBusinessAreaName = false
      setInterval(() => {
        document.title = displayingBusinessAreaName ? errorHeading.textContent : businessAreaTitle
        displayingBusinessAreaName = !displayingBusinessAreaName
      }, 2000)

      reportEvent(w, createDataLayerElement(availabilities.NuanceUnavailable, el))

      var elements_to_hide = d.querySelectorAll(".hide-text-on-error");
      for (var i = 0; i < elements_to_hide.length; i++) {
        elements_to_hide[i].style.display = 'none';
      }
    }
  );

}
