import Transcript from '../../../app/assets/javascripts/ci_api/Transcript'

const messageClasses = {
    Agent: {
        Outer: 'agent-outer',
        Inner: 'agent-inner'
    },
    Customer: {
        Outer: 'customer-outer',
        Inner: 'customer-inner'
    },
    System: {
        Outer: 'system-outer',
        Inner: 'system-inner'
    },
    Opener: {
        Outer: 'opener-outer',
        Inner: 'opener-inner'
    }
};

describe("Transcript", () => {
    it("appends system messages", () => {
        const content = {
            insertAdjacentHTML: jest.fn(),
            scrollTo: jest.fn(),
            scrollHeight: 42
        };
        const vaLinkCallback = jest.fn();
        const transcript = new Transcript(content, vaLinkCallback, messageClasses);

        transcript.addSystemMsg("System Message");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
             "<div class='system-outer'><div class='system-inner'>System Message</div></div>"
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
        const transcript = new Transcript(content, vaLinkCallback, messageClasses);

        transcript.addOpenerScript("An Opener Script");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
            "<div class='opener-outer'><div class='opener-inner'>An Opener Script</div></div>"
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
        const transcript = new Transcript(content, vaLinkCallback, messageClasses);

        transcript.addAgentMsg("Some agent message");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
            "<div class='agent-outer'><div class='agent-inner'>Some agent message</div></div>"
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
        const transcript = new Transcript(content, vaLinkCallback, messageClasses);

        transcript.addCustomerMsg("Some customer message");

        expect(content.insertAdjacentHTML).toHaveBeenCalledWith(
            "beforeend",
            "<div class='customer-outer'><div class='customer-inner'>Some customer message</div></div>"
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
        const transcript = new Transcript(content, vaLinkCallback, messageClasses);

        transcript.addAutomatonMsg("I'm not a real person");

        expect(content.appendChild).toHaveBeenCalledWith(expect.any(Element));
        expect(content.scrollTo).toHaveBeenCalledWith(0, 1024);
    });
});
