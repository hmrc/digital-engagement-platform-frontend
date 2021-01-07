import {availabilities} from './getAvailability'
import {createDataLayerElement,reportEvent} from './addToDataLayer'

export function waitForEl(element, callback, w, defaultTimeout, timesCheckedForElement) {
    defaultTimeout = defaultTimeout || 1000
    timesCheckedForElement = timesCheckedForElement || 0
    const selector = element + ' div span';
    const maxNumberOfAttempts = 9;

    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement == maxNumberOfAttempts) {
          const assistantUsed = window.location.pathname.includes("virtual-assistant") ? "The digital assistant" : "Webchat"
          $(element).text(assistantUsed + ' is experiencing technical difficulties. Please keep refreshing the page to try again.')
          reportEvent(w,createDataLayerElement(availabilities.NuanceUnavailable, element))
          return;
        }

        waitForEl(element, callback, w, defaultTimeout, timesCheckedForElement + 1);
      }, defaultTimeout);
    }
  }