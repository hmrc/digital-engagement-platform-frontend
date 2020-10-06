import * as SUT from '../../app/assets/javascripts/addToDataLayer'

describe("Add to data layer", function() {
  	it("will add all base properties", () => {
        document.body.innerHTML = `<input type="text" id="test" data-gtag="test">`
        global.w = {dataLayer : []};
        global.el = "test";
        global.d = {
            querySelectorAll : () => {
                return $("#test");
            }};

		SUT.addToDataLayer("Pending");

        expect(w.dataLayer[0].event).toBe('DOMContentLoaded');
        expect(w.dataLayer[0].ID).toBe('test');
        expect(w.dataLayer[0].Status).toBe('Pending');
        expect(w.dataLayer[0]["Session ID"]).not.toBe(undefined);
        expect(w.dataLayer[0]["Hit TimeStamp"]).not.toBe(undefined)
    });
    

  	it("push any data-gtag objects in the format `key:value, key:value` into global dataLayer", () => {
        document.body.innerHTML = `<input type="text" id="test" data-gtag="engine:v6, color:blue, alloys:20 inches">`
        global.w = {dataLayer : []};
        global.d = {querySelectorAll : () => {
                return $("#test");
            }};
        global.el = "test";

		SUT.addToDataLayer("Pending");

        expect(w.dataLayer[0].alloys).toBe('20 inches');
        expect(w.dataLayer[0].color).toBe('blue');
        expect(w.dataLayer[0].engine).toBe('v6');
	});
});