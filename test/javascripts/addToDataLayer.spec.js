import * as SUT from '../../app/assets/javascripts/addToDataLayer'

describe("Add to data layer", function() {
  	it("will add all base properties", () => {
        document.body.innerHTML = `<input type="text" id="test" data-gtag="test">`
        var w = {dataLayer : []};
        var el = "test";
        var d = {
            querySelectorAll : () => {
                return document.getElementById("test");
            }};

        SUT.addToDataLayer("Pending", el, w, d);

        expect(w.dataLayer[0].event).toBe('DOMContentLoaded');
        expect(w.dataLayer[0].ID).toBe('test');
        expect(w.dataLayer[0].Status).toBe('Pending');
        expect(w.dataLayer[0]["Session ID"]).not.toBe(undefined);
        expect(w.dataLayer[0]["Hit TimeStamp"]).not.toBe(undefined)
    });
    

  	it("push any data-gtag objects in the format `key:value, key:value` into global dataLayer", () => {
        const parentDiv = document.createElement("div");
        const variable1 = document.createElement("input");
            variable1.setAttribute('type', 'text') 
            variable1.setAttribute('id', 'test') 
            variable1.setAttribute('data-gtag', 'alloys:20 inches color:blue engine:v6') 
            parentDiv.appendChild(variable1);
        document.body.appendChild(parentDiv);           
        console.log(JSON.stringify(document.getElementById('test')))
        var w = {dataLayer : []};
        var d =  document.querySelector('[id=test]')
        var el = "test";

		SUT.addToDataLayer("Pending",el,w,d);

        expect(w.dataLayer[0].alloys).toBe('20 inches');
        expect(w.dataLayer[0].color).toBe('blue');
        expect(w.dataLayer[0].engine).toBe('v6');
	});
});

describe("Save to data layer", function() {
    it("will save an element", () => {
        var w = {dataLayer : []};

        SUT.reportEvent(w,{test:"test"})

        expect(w.dataLayer[0].test).toEqual("test");
    });

    it("will initialise data layer if there is no dataLayer array", () => {
        var w = {dataLayer : undefined};

        SUT.reportEvent(w,{test:"test"})

        expect(w.dataLayer[0].test).toEqual("test");
    });
});