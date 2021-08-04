const html = `
<div id="endPage">
    <div class="govuk-panel govuk-panel--confirmation" style="margin-right:0.8em;">
          <h1 class="govuk-panel__title">
            Thank you
          </h1>
        </div>

        <p class="govuk-body">
         Your replies will help us improve this service.</p>
    </div>
`

export default class PostPCSPage {
    attachTo(container) {
        this.container = container;

        this.wrapper = document.createElement("div")
        this.wrapper.id = "postPCSPageWrapper";
        this.wrapper.insertAdjacentHTML("beforeend", html);
        container.appendChild(this.wrapper);
    }

    detach() {
        this.container.removeChild(this.wrapper)
    }
}
