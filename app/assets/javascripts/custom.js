
window.addEventListener('DOMContentLoaded', function () {

    // =====================================================
    // Back link mimics browser back functionality
    // =====================================================
    var backLink = document.querySelector('.govuk-back-link');
    const referrer = this.document.referrer;

    if (referrer != "" && this.window.history.length > 1 && referrer.includes('gov.uk/')) {
        backLink.style.display = 'block-inline';
        backLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.history.back();
        });
    } else {
        backLink.style.display = 'none';
    }

    //Timer for notification banner
    //date format ( YYYY-MM-DD )
    //If BST then time needs to be 1 hour earlier

    const currentDate = new Date().getTime()

    //may need to implement a way to dynamically assign these values depending on future complexity
    let globalNotificationBanner = document.querySelector('[aria-labelledby = "globalBanner"]')
    let tcNotificationBanner = document.querySelector('[aria-labelledby = "tcBanner"]')
    let oshNotificationBanner = document.querySelector('[aria-labelledby = "oshBanner"]')
    let adlNotificationBanner = document.querySelector('[aria-labelledby = "adlBanner"]')

    // =====================================================
    // Timing for individual TC banner
    // =====================================================

    if (tcNotificationBanner) {
        //Change these to required start and end times
        const tcStartTime = new Date("2025-01-07T09:00:00Z").getTime();
        //No end date given for current banner, set it to next year for now
        const tcEndTime = new Date("2025-05-06T00:00:01Z").getTime();

        if ((currentDate > tcStartTime) && (currentDate < tcEndTime)) {
            //Notification banner should be displayed
            tcNotificationBanner.style.display = 'block'
        } else {
            //Notification will not be displayed
            tcNotificationBanner.style.display = 'none'
        }
    }

    // =====================================================
    // Timing for individual OSH banner
    // =====================================================

    if (oshNotificationBanner) {
        //Change these to required start and end times
        const oshStartTime = new Date("2025-01-07T09:00:00Z").getTime();
        //No end date given for current banner, set it to next year for now
        const oshEndTime = new Date("2025-02-01T07:00:00Z").getTime();

        if ((currentDate > oshStartTime) && (currentDate < oshEndTime)) {
            //Notification banner should be displayed
            oshNotificationBanner.style.display = 'block'
        } else {
            //Notification will not be displayed
            oshNotificationBanner.style.display = 'none'
        }
    }

        // =====================================================
    // Timing for individual ADL banner
    // =====================================================

    if (adlNotificationBanner) {
        //Change these to required start and end times
        const adlStartTime = new Date("2025-04-01T01:00:00Z").getTime();
        //No end date given for current banner, set it to next year for now
        const adlEndTime = new Date("2025-04-30T11:59:00Z").getTime();

        if ((currentDate > adlStartTime) && (currentDate < adlEndTime)) {
            //Notification banner should be displayed
            adlNotificationBanner.style.display = 'block'
        } else {
            //Notification will not be displayed
            adlNotificationBanner.style.display = 'none'
        }
    }

    // =====================================================
    // Timing for global banners
    // =====================================================

    //Change these to required start and end times
    let globalStartTime = new Date("2024-09-10T07:00:00Z").getTime();
    //No end date given for current banner, set it to next year for now
    let globalEndTime = new Date("2024-09-10T19:00:01Z").getTime();

    if ((currentDate > globalStartTime) && (currentDate < globalEndTime)) {
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
window.addEventListener('load', function () {

    var waitForEl = function (selector, callback, count) {
        if (document.querySelector(selector) !== null) {
            callback();
        } else {
            setTimeout(function () {
                count++;
                if (count < 3) {
                    waitForEl(selector, callback, count);
                }
            }, 1000);
        }
    }

    waitForEl(
        "#inqChatStage",
        function () {
            var footer = document.querySelector('#footer');
            if (footer !== null) {
                document.body.appendChild(footer);
            }
        },
        0
    );

});
