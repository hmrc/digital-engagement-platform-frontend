/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://example.test/"}
 */

import * as SUT from 'app/assets/javascripts/waitForEl';

describe("When waiting for an element", () => {
	beforeEach(() => {
		window.history.replaceState({}, '', '/');
		window.dataLayer = [];

		jest.useFakeTimers();
		jest.spyOn(global, 'setTimeout');
	});

	afterEach(() => {
		jest.clearAllTimers();
		jest.restoreAllMocks();

		document.body.innerHTML = '';
		window.history.replaceState({}, '', '/');
		window.dataLayer = [];
	});

	it("will execute the callback if the element exists", () => {
		window.history.replaceState({}, '', '/ask-hmrc/webchat/test');

		let output;
		document.body.innerHTML = `<div id="test"><div><span>Test</span></div></div>`;

		SUT.waitForEl(
			'#test',
			() => {
				output = 'success';
			},
			() => {
				output = 'timeout';
			}
		);

		expect(output).toEqual('success');
	});

	describe("If the element we are waiting for is not available", () => {
		it("will wait by default 1 second before attempting to check the element again", () => {
			let output;

			document.body.innerHTML = `<input type="text" id="test2">`;

			SUT.waitForEl(
				'#test',
				() => {
					output = 'success';
				},
				() => {
					output = 'timeout';
				}
			);

			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});

		it("will attempt to fetch element again once wait is over", () => {
			document.body.innerHTML = `<input type="text" id="test2">`;

			SUT.waitForEl(
				'#test',
				() => {},
				() => {}
			);

			jest.runOnlyPendingTimers();

			expect(setTimeout).toHaveBeenCalledTimes(2);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});

		describe("And we have already checked 10 times", () => {
			it("will cease looking for the element", () => {
				window.history.replaceState({}, '', '/ask-hmrc/webchat/test');

				document.body.innerHTML = `<input type="text" id="test2">`;

				let output = '';

				SUT.waitForEl(
					'#test',
					() => {
						output = 'success';
					},
					() => {
						output = 'timeout';
					}
				);

				checkForElementTimes(15);

				expect(setTimeout).toHaveBeenCalledTimes(10);
				expect(output).toEqual('timeout');
			});
		});
	});
});

const checkForElementTimes = (numberOfTimes) => {
	for (let i = 0; i < numberOfTimes; i += 1) {
		jest.runOnlyPendingTimers();
	}
};