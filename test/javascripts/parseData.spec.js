 import * as SUT from '../../app/assets/javascripts/parseData'

describe("Parse data", function() {
  	it("will parse the element into an object", () => {
		const test = SUT.parseData("motor:v6");

		expect(test.motor).toBe("v6");
	});
	  
	it("will be capable of creating multiple properties", () => {
		const test = SUT.parseData("motor:v6, color:blue, alloys:20 inches");

		expect(test.motor).toBe("v6");
		expect(test.color).toBe("blue");
		expect(test.alloys).toBe("20 inches");
	});

	it("will not parse correctly if there is no spacing between elements", () => {
		const test = SUT.parseData("motor:v6,color:blue,alloys:20 inches");

		expect(test.motor).toBe("v6,color");
		expect(test.color).toBe(undefined);
		expect(test.alloys).toBe(undefined);
	});
});