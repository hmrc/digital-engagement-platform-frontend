//push any data-gtag objects in the format "key:value, key:value" into global dataLayer
function gtmDl(d, w, el) {
  function parseData(string) {
    var properties = string.split(', ');
    var obj = {};
    properties.forEach(function (property) {
      var tup = property.split(':');
      obj[tup[0]] = tup[1]
    });
    return obj
  }

  function waitForEl (selector, callback) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function () {
        waitForEl(selector, callback);
      }, 1000);
    }
  }

  function observeStatus() {
    let elementToObserve = document.querySelector(el);

    let observer = new MutationObserver(function() {
      setAvailability();
    });

    observer.observe(elementToObserve, {subtree: true, childList: true});
  }

  function setAvailability() {
    var availability;
    var nuanceText = document.querySelector(el + ' div span').innerHTML;

    if (nuanceText === "Advisers are available to chat.") {
      availability = 'Ready';
    } else if (nuanceText === "All of our advisers are busy at the moment. Keep checking this page until the 'speak to an adviser' link becomes available.") {
      availability = 'Busy';
    } else if (nuanceText === "You are in a webchat.") {
      availability = 'In Progress';
    } else if (nuanceText === "Our webchat is now closed.") {
      availability = 'Offline';
    } else if (nuanceText === "You are in a webchat. If you cannot access it, you may have another chat window open.") {
      availability = 'In Chat';
    } else {
      availability = 'Not Responding';
    }

    addToDataLayer(availability, el);
  }

  function addToDataLayer (status, elToAdd) {
    w.dataLayer = w.dataLayer || [];
    var localData = d.querySelectorAll('[data-gtag]');

    var localObj = {
      'event': 'DOMContentLoaded',
      'Status': status,
      'ID' : el,
      'Session ID': new Date().getTime() + '.' + Math.random().toString(36).substring(5),
      'Hit TimeStamp': new Date().toUTCString()
    };

    Array.prototype.forEach.call(localData, function (elToAdd, i) {
      localObj = Object.assign(localObj, parseData(elToAdd.getAttribute('data-gtag')))
    });

    w.dataLayer.push(localObj);
  }


  $(window).on("load", function () {
    waitForEl(el + ' div span', function () {
      setAvailability();
      observeStatus();
    });
  });
};

gtmDl(document, window, '#HMRC_Fixed_1');