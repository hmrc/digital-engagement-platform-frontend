import * as SUT from '../../app/assets/javascripts/deviceIdentification'

// Based on the strings from this page: https://deviceatlas.com/blog/mobile-browser-user-agent-strings
//and https://www.whatismybrowser.com/guides/the-latest-user-agent/

describe("Device identification", function() {
    // Safari
    it("will not detect mobile for Safari for macOS", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Macintosh; Intel Mac OS X 11_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15")
        ).toBeFalsy();
    });
  	it("will detect mobile for Safari for iOS", () => {
		expect(
    		SUT.isMobile("Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1")
		).toBeTruthy();
	});
    // Chrome
    it("will not detect mobile for Chrome for Windows", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
        ).toBeFalsy();
    });
    it("will not detect mobile for Chrome on iPad", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (iPad; CPU OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/90.0.4430.216 Mobile/15E148 Safari/604.1")
        ).toBeFalsy();
    });
	it("will detect mobile for Chrome for iOS", () => {
		expect(
    		SUT.isMobile("Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/90.0.4430.216 Mobile/15E148 Safari/604.1")
		).toBeTruthy();
	});
	it("will detect mobile for Chrome for Android", () => {
		expect(
    		SUT.isMobile("Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36")
		).toBeTruthy();
	});
    //	Firefox
    it("will not detect mobile for Firefox for Windows", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0")
        ).toBeFalsy();
    });
	it("will detect mobile for Firefox for iOS", () => {
		expect(
    		SUT.isMobile("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/33.0 Mobile/15E148 Safari/605.1.15")
		).toBeTruthy();
	});
	it("will detect mobile for Firefox for Android", () => {
		expect(
    		SUT.isMobile("Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0")
		).toBeTruthy();
	});
    //	Internet Explorer 11
    it("will not detect mobile for IE 11 for Windows", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko")
        ).toBeFalsy();
    });
    //	Edge
    it("will not detect mobile for Edge for Windows", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62")
        ).toBeFalsy();
    });
    it("will detect mobile for Edge for iOS", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 EdgiOS/46.3.13 Mobile/15E148 Safari/605.1.15")
        ).toBeTruthy();
    });
    it("will detect mobile for Edge for Android", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Linux; Android 10; ONEPLUS A6003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36 EdgA/46.3.4.5155")
        ).toBeTruthy();
    });
    //	Opera
    it("will not detect mobile for Opera for Windows", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 OPR/76.0.4017.123")
        ).toBeFalsy();
    });
    it("will detect mobile for Opera for Android", () => {
        expect(
            SUT.isMobile("Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36 OPR/63.0.3216.58473")
        ).toBeTruthy();
    });
});
