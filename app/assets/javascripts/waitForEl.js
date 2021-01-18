export function waitForEl(element, successCallback, timeoutCallback) {
    _waitForEl(element, successCallback, timeoutCallback, 0)
}

function _waitForEl(element, successCallback, timeoutCallback, timesCheckedForElement) {
    const timeout = 1000;
    const selector = element + ' div span';
    const maxNumberOfAttempts = 9;

    if (jQuery(selector).length) {
      successCallback();
    } else {
      setTimeout(function () {
        if (timesCheckedForElement == maxNumberOfAttempts) {
          timeoutCallback();
        } else {
          _waitForEl(element, successCallback, timeoutCallback, timesCheckedForElement + 1);
        }
      }, timeout);
    }
  }
