import * as SUT from '../../app/assets/javascripts/statusObserver'

describe("The status observer", function() {
    var isObserved = false;
    global.MutationObserver = class {
        constructor(callback) {}
        disconnect() {}
        observe(element, initObject) {isObserved = true;}
    };
    
    it('will observe the element', () => {
		SUT.observeStatus("test","test","test");

        expect(isObserved).toBe(true);
    });
});