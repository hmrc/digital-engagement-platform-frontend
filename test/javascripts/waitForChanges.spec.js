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

    describe("If the page is `/payment-problems`", () => {
        it("will consume element #pp_self_assessment_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[0][0]).toEqual("#pp_self_assessment_webchat div")
        });

        it("will consume element #pp_vat_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[1][0]).toEqual("#pp_vat_webchat div")
        });

        it("will consume element #pp_paye_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[2][0]).toEqual("#pp_paye_webchat div")
        });

        it("will consume element #pp_corporation_tax_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(window, document);
            window.dispatchEvent(new Event('load'));

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[3][0]).toEqual("#pp_corporation_tax_webchat div")
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

            expect($('.hide-text-on-error').css("display")).toBe("block");

            var timeoutFunction = elementWatcherMock.mock.calls[0][2];
            timeoutFunction();

            expect($("#HMRC_Fixed_1").text()).toEqual("There's a problem with webchat. Try again later.")
            expect($(".hide-text-on-error").css("display")).toBe("none")
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

            expect($("#HMRC_Fixed_1").text()).toEqual("There's a problem with the digital assistant. Try again later.")

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