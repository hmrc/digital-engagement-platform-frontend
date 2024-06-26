import * as SUT from '../../app/assets/javascripts/waitForChanges'
import * as elementWatcher from '../../app/assets/javascripts/waitForEl'
import {availabilities} from '../../app/assets/javascripts/getAvailability'

describe("When loading a page and waiting for changes", () => {
    let elementWatcherMock;

    beforeEach(() => {
        delete window.location;

        elementWatcherMock = jest.spyOn(
            elementWatcher,
            'waitForEl'
        ).mockImplementation(jest.fn());
    });

    afterEach(() => {
        elementWatcherMock.mockRestore();
    });

    describe("If the page is not `/payment-problems`", () => {
        it("will consume element #HMRC_Fixed_1", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/test'
            };

    		document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`
    
            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[0][0]).toEqual("#HMRC_Fixed_1 div")
        });
    });

    describe("If there is a timeout", () => {
        it("will report technical difficulties if timeout for webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/test'
            };

    		document.body.innerHTML = `
    		<div id="HMRC_Fixed_1"></div>
    		<div class="hide-text-on-error"></div>`

            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            var timeoutFunction = elementWatcherMock.mock.calls[0][2];
            timeoutFunction();
            expect(document.getElementById("HMRC_Fixed_1").textContent).toEqual("There's a problem with webchat. Try again later.")
            expect(document.getElementsByClassName('hide-text-on-error')[0].style.display).toBe("none");
        });
        it("will raise event on data layer if timeout for webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/test'
            };

    		document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`

            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            var timeoutFunction = elementWatcherMock.mock.calls[0][2];
            timeoutFunction();

            expect(window.dataLayer[0].event).toBe('DOMContentLoaded');
            expect(window.dataLayer[0].ID).toBe('#HMRC_Fixed_1');
            expect(window.dataLayer[0].Status).toBe(availabilities.NuanceUnavailable);
            expect(window.dataLayer[0]["Session ID"]).not.toBe(undefined);
            expect(window.dataLayer[0]["Hit TimeStamp"]).not.toBe(undefined)
        });
        it("will report technical difficulties if timeout for virtual assistant", () => {
            window.location = {
                pathname: '/ask-hmrc/virtual-assistant/some-page'
            };

    		document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`
//add element
            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            var timeoutFunction = elementWatcherMock.mock.calls[0][2];
            timeoutFunction();

            expect(document.getElementById("HMRC_Fixed_1").textContent).toEqual("There's a problem with the digital assistant. Try again later.")

        });
        it("will raise event on data layer if timeout for virtual assistant", () => {
            window.location = {
                pathname: '/ask-hmrc/virtual-assistant/some-page'
            };

    		document.body.innerHTML = `<div id="HMRC_Fixed_1"></div>`

            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            var timeoutFunction = elementWatcherMock.mock.calls[0][2];
            timeoutFunction();

            expect(window.dataLayer[0].event).toBe('DOMContentLoaded');
            expect(window.dataLayer[0].ID).toBe('#HMRC_Fixed_1');
            expect(window.dataLayer[0].Status).toBe(availabilities.NuanceUnavailable);
            expect(window.dataLayer[0]["Session ID"]).not.toBe(undefined);
            expect(window.dataLayer[0]["Hit TimeStamp"]).not.toBe(undefined)
        });
    });
});