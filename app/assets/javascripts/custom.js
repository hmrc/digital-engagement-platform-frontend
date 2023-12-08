
window.GOVUKFrontend.initAll();
window.HMRCFrontend.initAll();

window.addEventListener('DOMContentLoaded', function() {

    //Timer for notification banner
    //date format ( YYYY-MM-DD )
    //If BST then time needs to be 1 hour earlier

    let currentDate = new Date().getTime()

    //Change these to required start and end times
    let startTime = new Date("2023-12-09T08:00:00Z").getTime();
    let endTime = new Date("2023-12-11T09:00:00Z").getTime();

    let notificationBanner = document.getElementsByClassName('govuk-notification-banner')[0]

    if((currentDate > startTime ) && (currentDate < endTime)){
        //Notification banner should be displayed
        notificationBanner.style.display = 'block'
    } else {
        //Notification will not be displayed
        notificationBanner.style.display = 'none'
    }

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
