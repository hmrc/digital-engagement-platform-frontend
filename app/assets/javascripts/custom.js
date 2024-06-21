window.addEventListener('DOMContentLoaded', function() {

    // =====================================================
    // Back link mimics browser back functionality
    // =====================================================
    var backLink = document.querySelector('.govuk-back-link');
    if(window.history.length === 1 && window.history.back && typeof window.history.back === 'function') {
        backLink.style.display = 'none';
    }else{
        backLink.style.display = 'block-inline';
        backLink.addEventListener('click', function(e){
            e.preventDefault();
            window.history.back();
        });
    }

    //Timer for notification banner
    //date format ( YYYY-MM-DD )
    //If BST then time needs to be 1 hour earlier

    let currentDate = new Date().getTime()

    //Change these to required start and end times
    let startTime = new Date("2024-06-06T09:00:00Z").getTime();
    //No end date given for current banner, set it to next year for now
    let endTime = new Date("2024-06-21T00:00:01Z").getTime();

    let notificationBanner = document.getElementsByClassName('govuk-notification-banner')[0]

    if((currentDate > startTime ) && (currentDate < endTime)){
        //Notification banner should be displayed
        notificationBanner.style.display = 'block'
    } else {
        //Notification will not be displayed
        notificationBanner.style.display = 'none'
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
