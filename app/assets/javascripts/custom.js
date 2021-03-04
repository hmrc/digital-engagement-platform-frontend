
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

    // Introduce direct skip link control, to work around voiceover failing of hash links
    // https://bugs.webkit.org/show_bug.cgi?id=179011
    // https://axesslab.com/skip-links/
    document.querySelector('.govuk-skip-link').addEventListener('click',function(e) {
        e.preventDefault();
        var header = [].slice.call(document.querySelectorAll('h1'))[0];
        if(header!=undefined){
            header.setAttribute('tabindex', '-1')
            header.focus();
            setTimeout(function(){
                header.removeAttribute('tabindex')
            }, 1000)
        }
    });

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
