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

        it("sends TransferResponse to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data:  {
                    "ltime": "1651712",
                    "state": "transfer",
                    "reason": "Transfer from Virtual Assistant [HMRC] to agent JayNabonne",
                    "status": "accepted",
                    "messageType": "chat.transfer_response",
                    "engagementID": "388260662637696059",
                    "messageTimestamp": "1627648283000",
                    "client.display.text": "I'm connecting you to the next available webchat adviser.",
                    "msg.originalrequest.id": "385445912674772418"
                }
            };

            handleMessage(message);
            expect(container.transcript.addSystemMsg).toHaveBeenCalledWith("I'm connecting you to the next available webchat adviser.");
        });

        it("sends MemberConnected to the transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data:  {
                    "owner": "true",
                    "tc.mode": "transfer",
                    "agent.alias": "Jay",
                    "messageType": "chatroom.member_connected",
                    "agentGroupID": "10006721",
                    "display.text": "Agent enters chat (as Jay)",
                    "engagementID": "388260662637696059",
                    "business_unit.id": "19001214",
                    "config.script_id": "12201319",
                    "messageTimestamp": "1627648283000",
                    "chatroom.member.id": "42391918",
                    "client.display.text": "You're now talking to Jay",
                    "chatroom.member.name": "JayNabonne",
                    "chatroom.member.type": "agent"
                }
            };

            handleMessage(message);
            expect(container.transcript.addSystemMsg).toHaveBeenCalledWith("You're now talking to Jay");
        });

        it("reports chat exit in transcript", () => {
            const [sdk, container] = createEngagedStateDependencies();

            const state = new ChatStates.EngagedState(sdk, container, []);

            const handleMessage = sdk.getMessages.mock.calls[0][0];
            const message = {
                data: {
                    "state": "closed",
                    "agentID": "42391918",
                    "sessionId": "2493130538282329498",
                    "user.type": "agent",
                    "aeapi.mode": "true",
                    "disp.notes": "",
                    "messageType": "chat.exit",
                    "display.text": "Agent 'Jay' exits chat",
                    "engagementID": "388260662810973280",
                    "disp.reason.0": "No answer given by customer or Not asked as chat terminated",
                    "disp.category.0": "Enquiry Handled - Customer Question",
                    "external_user.ip": "80.0.102.28",
                    "messageTimestamp": "1627651338000",
                    "config.session_id": "2493130538282329498",
                    "disposition.answer": "19005454:25243342",
                    "conversation_resolved": "false",
                    "msg.originalrequest.id": "2493130538484377173",
                    "auto_transfer_ignored_chatroom": "false"
                }
            };

            handleMessage(message);
            expect(container.transcript.addSystemMsg).toHaveBeenCalledWith("Agent 'Jay' exits chat");
        });
    });
});
