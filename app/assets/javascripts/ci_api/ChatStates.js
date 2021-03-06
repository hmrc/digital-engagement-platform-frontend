import * as MessageType from './NuanceMessageType'

export class NullState {
    onSend(text) {
        console.error("State Error: Trying to send text with no state.")
    }

    onClickedVALink(text) {
        console.error("State Error: Trying to handle VA link with no state.")
    }
}

export class ShownState {
    constructor(engageRequest) {
        this.engageRequest = engageRequest
    }

    onSend(text) {
        console.log(">>> not connected: engage request")
        this.engageRequest(text);
    }

    onClickedVALink(e) {
        console.error("State Error: Trying to handle VA link before engaged.")
    }
}

export class EngagedState {
    constructor(sdk, container, previousMessages) {
        this.sdk = sdk;
        this.container = container;

        this._displayPreviousMessages(previousMessages);
        this._getMessages();
    }

    onSend(text) {
        console.log(">>> connected: send message")
        this.sdk.sendMessage(text)
    }

    onClickedVALink(e) {
        this.sdk.sendVALinkMessage(e, () => this._linkCallback);
    }

    _displayPreviousMessages(messages) {
        for (const message of messages) {
            this._displayMessage(message);
        }
    }

    _getMessages() {
        this.sdk.getMessages((msg_in) => this._displayMessage(msg_in));
    }

    _displayMessage(msg_in) {
        const msg = msg_in.data
        const transcript = this.container.getTranscript();
        if (msg.messageType === MessageType.Chat_Communication) {
            if (msg.agentID) {
                transcript.addAgentMsg(msg.messageText)
            } else {
                transcript.addCustomerMsg(msg.messageText)
            }
        } else if (msg.messageType === MessageType.Chat_AutomationRequest) {
            transcript.addAutomatonMsg(msg["automaton.data"]);
        } else if (msg.state === "closed") {
            transcript.addSystemMsg("Agent Left Chat.");
        } else if (msg.messageType === MessageType.Chat_CommunicationQueue) {
            transcript.addSystemMsg(msg.messageText);
        } else if (msg.messageType === MessageType.Chat_Denied) {
//            this.isConnected = false;
            transcript.addSystemMsg("No agents are available.");
        }
    }

    _linkCallback(data) {
        // data seems to be the text clicked on.
//        console.log("link callback: ", data);
    }
}

