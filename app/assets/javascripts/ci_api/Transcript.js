const MessageType = {
    Chat_Communication: 'chat.communication',
    Chat_AutomationRequest: 'chat.automaton_request',
    Chat_CommunicationQueue: 'chat.communication.queue',
    Chat_Denied: 'chat.denied'
};

const Classes = {
    Agent: {
        Outer: 'ciapiSkinTranscriptAgentLine',
        Inner: 'bubble agent-bubble background-img enter'
    },
    Customer: {
        Outer: 'ciapiSkinTranscriptCustLine',
        Inner: 'bubble customer-bubble background-img enter'
    },
    System: {
        Outer: 'ciapiSkinTranscriptSysMsg',
        Inner: 'ciapiSkinSysMsg'
    },
    Opener: {
        Outer: 'ciapiSkinTranscriptOpener',
        Inner: 'ciapiSkinOpener'
    }
};

export default class Transcript {
    constructor(content, sdk) {
        this.content = content;
        this.sdk = sdk;
    }

    addTextAndScroll(msg) {
      this.content.insertAdjacentHTML("beforeend", msg);
      this.content.scrollTo(0, this.content.scrollHeight);
    }

    addTextWithClass(msg, msg_class) {
      const msgDiv = `<div class='${msg_class.Outer}'><div class='${msg_class.Inner}'>${msg}</div></div>`;
      this.addTextAndScroll(msgDiv);
    }

    addText(msg, agent) {
      if (agent) {
        this.addTextWithClass(msg, Classes.Agent);
      } else {
        this.addTextWithClass(msg, Classes.Customer);
      }
    }

    addSystemMsg(msg) {
      this.addTextWithClass(msg, Classes.System);
    }

    addOpenerScript(msg) {
      this.addTextWithClass(msg, Classes.Opener);
    }

    linkCallback(data1, data2, data3) {
        // data1 seems to be the text clicked on.
//        console.log("link callback: ", data1, data2, data3);
    }

    onClickHandler(e) {
        this.sdk.sendVALinkMessage(e, this.linkCallback)
    }

    fixUpVALinks(div) {
        const links = div.getElementsByTagName('a');

        const clickHandler = this.onClickHandler.bind(this);
        for (var link of links) {
            for (var attribute of link.attributes) {
                if (attribute.name === "data-vtz-link-type" && attribute.value === "Dialog") {
                    link.onclick = clickHandler;
                }
            }
        }
    }

    addAutomatonText(msg) {
        const msgDiv = `<div class='${Classes.Agent.Inner}'>${msg}</div>`;

        let agentDiv = document.createElement("div")
        agentDiv.classList.add(Classes.Agent.Outer);
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this.fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);
        this.content.scrollTo(0, this.content.scrollHeight);
    }

    handleMessage(msg) {
//      console.log(msg);
      if (msg.messageType === MessageType.Chat_Communication) {
        this.addText(msg.messageText, msg.agentID);
      } else if (msg.messageType === MessageType.Chat_AutomationRequest) {
        this.addAutomatonText(msg["automaton.data"]);
      } else if (msg.state === "closed") {
        this.addSystemMsg("Agent Left Chat.");
      } else if (msg.messageType === MessageType.Chat_CommunicationQueue) {
        this.addSystemMsg(msg.messageText);
      } else if (msg.messageType === MessageType.Chat_Denied) {
        this.addSystemMsg("No agents are available.");
      }
    }
}
