
window.GOVUKFrontend.initAll();
window.HMRCFrontend.initAll();

window.addEventListener('DOMContentLoaded', function() {

      // =====================================================
      // Back link mimics browser back functionality
      // =====================================================
      // store referrer value to cater for IE - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10474810/  */
      var docReferrer = document.referrer
      // prevent resubmit warning
      if (window.history && window.history.replaceState && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, null, window.location.href);
      }
      var back_link = document.querySelector('#back-link');
      if (back_link !== null) {
          back_link.addEventListener('click', function(e){
            e.preventDefault();
            window.history.back();
          });
      }

      // ------------------------------------
      // Introduce direct skip link control, to work around voiceover failing of hash links
      // https://bugs.webkit.org/show_bug.cgi?id=179011
      // https://axesslab.com/skip-links/
      // ------------------------------------
      var skip_link = document.querySelector('.skiplink');
      if (skip_link !== null) {
          skip_link.addEventListener('click', function(e) {
              e.preventDefault();
              $(':header:first').attr('tabindex', '-1').focus();
          });
      }

});

// dynamically re-position nuance divs before footer for accessibility
window.addEventListener('load', function() {

    var waitForEl = function(selector, callback, count) {
        if (document.querySelector(selector) !== null) {
            callback();
        } else {
            setTimeout(function() {
              count++;
              if(count<3) {
                waitForEl(selector, callback, count);
              }
            }, 1000);
      }
    }

    waitForEl(
        "#inqChatStage",
         function() {
            var footer = document.querySelector('#footer');
            if (footer !== null) {
                document.body.appendChild(footer);
            }
         },
         0
    );

});
