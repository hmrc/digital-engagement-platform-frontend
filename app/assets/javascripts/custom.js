
window.addEventListener('DOMContentLoaded', function() {

    // =====================================================
    // Back link mimics browser back functionality
    // =====================================================
    var backLink = document.querySelector('.govuk-back-link');
    const referrer = this.document.referrer;

    if(referrer != ""){
        backLink.style.display = 'block-inline'; 
        backLink.addEventListener('click', function(e){
            e.preventDefault();
            window.history.back();
        });
    } else {
        backLink.style.display = 'none'; 
    }

    //Timer for notification banner
    //date format ( YYYY-MM-DD )
    //If BST then time needs to be 1 hour earlier

    let currentDate = new Date().getTime()

    //may need to implement a way to dynamically assign these values depending on future complexity
    let globalNotificationBanner = document.getElementsByClassName('govuk-notification-banner')[0]
    let individualNotificationBanner = document.getElementsByClassName('govuk-notification-banner')[1]

    // =====================================================
    // Timing for individual banners
    // =====================================================

    //Change these to required start and end times
    let individualStartTime = new Date("2024-06-06T09:00:00Z").getTime();
    //No end date given for current banner, set it to next year for now
    let individualEndTime = new Date("2024-06-21T00:00:01Z").getTime();

    if((currentDate > individualStartTime ) && (currentDate < individualEndTime)){
        //Notification banner should be displayed
        if (individualNotificationBanner) {
            individualNotificationBanner.style.display = 'block'
        }
    } else {
        //Notification will not be displayed
        if (individualNotificationBanner) {
            individualNotificationBanner.style.display = 'none'
        }
    }

    // =====================================================
    // Timing for global banners
    // =====================================================

     //Change these to required start and end times
     let globalStartTime = new Date("2024-07-10T07:00:00Z").getTime();
     //No end date given for current banner, set it to next year for now
     let globalEndTime = new Date("2024-07-15T06:00:01Z").getTime();

     if((currentDate > globalStartTime ) && (currentDate < globalEndTime)){
        //Notification banner should be displayed
        if (globalNotificationBanner) {
            globalNotificationBanner.style.display = 'block'
        }
    } else {
        //Notification will not be displayed
        if (globalNotificationBanner) {
            globalNotificationBanner.style.display = 'none'
        }
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
