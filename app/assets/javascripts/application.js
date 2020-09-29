/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

$(document).ready(function () {
  let contentArray = [
    'All of our advisers are busy at the moment. You can remain on this page and one may become available.',
    'You are in a webchat.',
    'Advisers are available to chat.',
    'Our webchat is now closed.',
    'Junk'
  ];

  function addContent() {
    let fixedSpan = document.querySelector('#HMRC_Fixed_1');

    fixedSpan.innerHTML = "<div><span>" + contentArray[Math.floor(Math.random() * contentArray.length)] + "</span><a href='#' click='event.preventDefault();' style='cursor: pointer;'>Speak to an adviser now</a></div>";

    randomSetContent();
  }


  function randomSetContent() {
    window.setTimeout(addContent, 15000);
  }

  randomSetContent();
});