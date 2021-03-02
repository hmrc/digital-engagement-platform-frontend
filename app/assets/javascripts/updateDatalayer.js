import * as availabilityChecker from './getAvailability'
import * as dataLayer from './addToDataLayer'

export function updateDataLayer(el,w,d) {
    var nuanceElement = d.querySelector(el + ' div span');

    if (nuanceElement === null)
        nuanceElement = d.querySelector(el + ' div div');

    if (nuanceElement === null)
        return;

    var nuanceText = nuanceElement.innerText;
  
    dataLayer.addToDataLayer(availabilityChecker.getAvailability(nuanceText), el, w, d);
  }
