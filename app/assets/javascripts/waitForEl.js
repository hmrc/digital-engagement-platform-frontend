export function waitForEl(element, successCallback, timeoutCallback) {
    _waitForEl(element, successCallback, timeoutCallback, 0)
}

function _waitForEl(selector, successCallback, timeoutCallback, timesCheckedForElement) {
    const timeout = 1000;
    const maxNumberOfAttempts = 9;

    if (document.querySelector(selector) !== null) {
      successCallback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement == maxNumberOfAttempts) {
          timeoutCallback();
        } else {
          _waitForEl(selector, successCallback, timeoutCallback, timesCheckedForElement + 1);
        }
      }, timeout);
    }
  }
