
window.GOVUKFrontend.initAll();
window.HMRCFrontend.initAll();

window.addEventListener('DOMContentLoaded', function() {

    // =====================================================
    // Back link mimics browser back functionality
    // =====================================================

    // back link
    var backLink = document.querySelector('.govuk-back-link');
    if(backLink){
        backLink.addEventListener('click', function(e){
            e.preventDefault();
            if (window.history && window.history.back && typeof window.history.back === 'function'){
                window.history.back();
            }
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
