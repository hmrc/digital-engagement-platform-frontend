import * as parser from './parseData'

export function addToDataLayer (status, el, w, d) {
    w.dataLayer = w.dataLayer || [];
    var localData = d.querySelectorAll('[data-gtag]');
    var dataLayerElement = createDataLayerElement(status,el);
  
    Array.prototype.forEach.call(localData, function (elToAdd, i) {
      dataLayerElement = Object.assign(dataLayerElement, parser.parseData(elToAdd.getAttribute('data-gtag')))
    });
  
    reportEvent(w,dataLayerElement);
  }


  export function createDataLayerElement(status,el) {
    return {
      'event': 'DOMContentLoaded',
      'Status': status,
      'ID' : el,
      'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
      'Hit TimeStamp': new Date().toUTCString()
    };
  }

  export function reportEvent(w,itemToSave) {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(itemToSave);
  }