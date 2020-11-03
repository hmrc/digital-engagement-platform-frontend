import * as SUT from '../../app/assets/javascripts/waitForChanges'
import * as elementWatcher from '../../app/assets/javascripts/waitForEl'


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

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(document,window);
            $(window).trigger('load');

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[0][0]).toEqual("#HMRC_Fixed_1")
        });
    });

    describe("If the page is `/payment-problems`", () => {
        it("will not consume element #HMRC_Fixed_1", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(document,window);
            $(window).trigger('load');

            expect(elementWatcherMock.mock.calls[0][0]).not.toEqual("#HMRC_Fixed_1")
        });

        it("will consume element #pp_self_assessment_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(document,window);
            $(window).trigger('load');

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[0][0]).toEqual("#pp_self_assessment_webchat")
        });

        it("will consume element #pp_vat_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(document,window);
            $(window).trigger('load');

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[1][0]).toEqual("#pp_vat_webchat")
        });

        it("will consume element #pp_paye_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(document,window);
            $(window).trigger('load');

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[2][0]).toEqual("#pp_paye_webchat")
        });

        it("will consume element #pp_corporation_tax_webchat", () => {
            window.location = {
                pathname: '/ask-hmrc/webchat/payment-problems'
            };

            document.body.innerHTML = `<input type="text" id="test">`
    
            SUT.waitForChanges(document,window);
            $(window).trigger('load');

            expect(elementWatcherMock).toHaveBeenCalled();
            expect(elementWatcherMock.mock.calls[3][0]).toEqual("#pp_corporation_tax_webchat")
        });
    });
});