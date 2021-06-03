import Transcript from '../../../app/assets/javascripts/ci_api/Transcript'

describe("Transcript", () => {
    it("appends system messages", () => {
        const content = {
            insertAdjacentHTML: jest.fn(),
            scrollTo: jest.fn(),
            scrollHeight: 42
        };
        const vaLinkCallback = jest.fn();
        const transcript = new Transcript(content, vaLinkCallback);

        transcript.addSystemMsg("System Message");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
             "<div class='ciapiSkinTranscriptSysMsg'><div class='ciapiSkinSysMsg'>System Message</div></div>"
        );
        expect(content.scrollTo).toHaveBeenCalledWith(0, 42);
    });

    it("appends opener scripts", () => {
        const content = {
            insertAdjacentHTML: jest.fn(),
            scrollTo: jest.fn(),
            scrollHeight: 50
        };
        const vaLinkCallback = jest.fn();
        const transcript = new Transcript(content, vaLinkCallback);

        transcript.addOpenerScript("An Opener Script");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
            "<div class='ciapiSkinTranscriptOpener'><div class='ciapiSkinOpener'>An Opener Script</div></div>"
        );
        expect(content.scrollTo).toHaveBeenCalledWith(0, 50);
    });

    it("appends agent messages", () => {
        const content = {
            insertAdjacentHTML: jest.fn(),
            scrollTo: jest.fn(),
            scrollHeight: 314
        };
        const vaLinkCallback = jest.fn();
        const transcript = new Transcript(content, vaLinkCallback);

        transcript.addAgentMsg("Some agent message");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
            "<div class='ciapiSkinTranscriptAgentLine'><div class='bubble agent-bubble background-img enter'>Some agent message</div></div>"
        );
        expect(content.scrollTo).toHaveBeenCalledWith(0, 314);
    });

    it("appends customer messages", () => {
        const content = {
            insertAdjacentHTML: jest.fn(),
            scrollTo: jest.fn(),
            scrollHeight: 666
        };
        const vaLinkCallback = jest.fn();
        const transcript = new Transcript(content, vaLinkCallback);

        transcript.addCustomerMsg("Some customer message");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
            "<div class='ciapiSkinTranscriptCustLine'><div class='bubble customer-bubble background-img enter'>Some customer message</div></div>"
        );
        expect(content.scrollTo).toHaveBeenCalledWith(0, 666);
    });

    it("appends automaton messages", () => {
        const content = {
            appendChild: jest.fn(),
            scrollTo: jest.fn(),
            scrollHeight: 1024
        };
        const vaLinkCallback = jest.fn();
        const transcript = new Transcript(content, vaLinkCallback);

        transcript.addAutomatonMsg("I'm not a real person");

        expect(content.appendChild).toHaveBeenCalledWith(expect.any(Element));
        expect(content.scrollTo).toHaveBeenCalledWith(0, 1024);
    });
});
