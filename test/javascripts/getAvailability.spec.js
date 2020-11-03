 import * as SUT from '../../app/assets/javascripts/getAvailability'


describe("Set availability", function() {
  	it("will be `Ready` when nuance reports `Advisers are available to chat.`", () => {
		const availability = SUT.getAvailability(SUT.availabilityMessages.Ready);

		expect(availability).toBe(SUT.availabilities.Ready);
	});

	it("will be `Busy` when nuance reports `All of our advisers are busy at the moment. Keep checking this page until the 'speak to an adviser' link becomes available.`", () => {
		const availability = SUT.getAvailability(SUT.availabilityMessages.Busy);

		expect(availability).toBe(SUT.availabilities.Busy);
	});

	it("will be `In Progress` when nuance reports `You are in a webchat.`", () => {
		const availability = SUT.getAvailability(SUT.availabilityMessages.InProgress);

		expect(availability).toBe(SUT.availabilities.InProgress);
	});

	it("will be `Offline` when nuance reports `Our webchat is now closed.`", () => {
		const availability = SUT.getAvailability(SUT.availabilityMessages.Offline);

		expect(availability).toBe(SUT.availabilities.Offline);
	});

	it("will be `In Chat` when nuance reports `You are in a webchat. If you cannot access it, you may have another chat window open.`", () => {
		const availability = SUT.getAvailability(SUT.availabilityMessages.InChat);

		expect(availability).toBe(SUT.availabilities.InChat);
	});

	it("will be `Not Responding` for any unknown report from nuance", () => {
		const availability = SUT.getAvailability("test");

		expect(availability).toBe(SUT.availabilities.NotResponding)
	});
});