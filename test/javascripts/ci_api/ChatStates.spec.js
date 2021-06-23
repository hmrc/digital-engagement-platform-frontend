import * as ChatStates from '../../../app/assets/javascripts/ci_api/ChatStates'
import * as MessageType from '../../../app/assets/javascripts/ci_api/NuanceMessageType'

function createEngagedStateDependencies() {
    const sdk = {
        sendMessage: jest.fn(),
        getMessages: jest.fn()
    };

    const container = {
        transcript: {
            addAgentMsg: jest.fn(),
            addCustomerMsg: jest.fn(),
            addAutomatonMsg: jest.fn(),
            addSystemMsg: jest.fn(),
        },
        getTranscript: function() {
            return this.transcript;
        }
    };
    return [sdk, container];
}

describe("Chat States", () => {
    describe("NullState", () => {
        it("logs error for onSend", () => {
            console.error = jest.fn();

            const state = new ChatStates.NullState();

            state.onSend("Some text that will be ignored");
            expect(console.error).toHaveBeenCalledWith("State Error: Trying to send text with no state.");
        });

        it("logs error for onClickedVALink", () => {
            console.error = jest.fn();

            const state = new ChatStates.NullState();

            state.onClickedVALink("Some text that will be ignored");
            expect(console.error).toHaveBeenCalledWith("State Error: Trying to handle VA link with no state.");
        });
    });

    describe("ShownState", () => {
        it("engages on user first message", () => {
            console.error = jest.fn();

            const onEngage = jest.fn();

            const state = new ChatStates.ShownState(onEngage);

            state.onSend("Please help me.");
            expect(onEngage).toHaveBeenCalledWith("Please help me.");
        });

        it("logs error for onClickedVALink", () => {
            console.error = jest.fn();

            const onEngage = jest.fn();

            const state = new ChatStates.ShownState(onEngage);

            state.onClickedVALink("Some text that will be ignored");
            expect(console.error).toHaveBeenCalledWith("State Error: Trying to handle VA link before engaged.");
        });
    });

    describe("EngagedState", () => {
        it("calls getMessages on creation", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            expect(sdk.getMessages).toHaveBeenCalledWith(expect.any(Function));
        });

        it("sends the message passed to onSend", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            state.onSend("Please help me.");
            expect(sdk.sendMessage).toHaveBeenCalledWith("Please help me.");
        });

        it("sends agent messages to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    messageType: MessageType.Chat_Communication,
                    messageText: "Hello world",
                    agentID: "007"
                }
            };

            handleMessage(message);
            expect(container.transcript.addAgentMsg).toHaveBeenCalledWith("Hello world");
        });

        it("sends customer messages to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    messageType: MessageType.Chat_Communication,
                    messageText: "Hello to you"
                }
            };

            handleMessage(message);
            expect(container.transcript.addCustomerMsg).toHaveBeenCalledWith("Hello to you");
        });

        it("sends automaton messages to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    messageType: MessageType.Chat_AutomationRequest,
                    "automaton.data": "Beep boop. I am a robot."
                }
            };

            handleMessage(message);
            expect(container.transcript.addAutomatonMsg).toHaveBeenCalledWith("Beep boop. I am a robot.");
        });

        it("sends customer messages to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    messageType: MessageType.Chat_CommunicationQueue,
                    messageText: "Queue message"
                }
            };

            handleMessage(message);
            expect(container.transcript.addSystemMsg).toHaveBeenCalledWith("Queue message");
        });

        it("reports Chat Denied to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    messageType: MessageType.Chat_Denied
                }
            };

            handleMessage(message);
            expect(container.transcript.addSystemMsg).toHaveBeenCalledWith("No agents are available.");
        });

        it("reports Closed to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    state: "closed"
                }
            };

            handleMessage(message);
            expect(container.transcript.addSystemMsg).toHaveBeenCalledWith("Agent Left Chat.");
        });

        it("send previous messages to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const messages = [{
                data: {
                    messageType: MessageType.Chat_AutomationRequest,
                    "automaton.data": "Beep boop. I am a robot."
                }
            }, {
                data: {
                    messageType: MessageType.Chat_Communication,
                    messageText: "Hello to you"
                }
            }];

            const state = new ChatStates.EngagedState(sdk, container, messages);

            expect(container.transcript.addAutomatonMsg).toHaveBeenCalledWith("Beep boop. I am a robot.");
            expect(container.transcript.addCustomerMsg).toHaveBeenCalledWith("Hello to you");
        });
    });
});
