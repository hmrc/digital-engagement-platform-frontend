export default class Transcript {
    constructor(content, sdk) {
        this.content = content;
        this.sdk = sdk;
    }

    addTextAndScroll(msg) {
      this.content.insertAdjacentHTML("beforeend", msg);
      this.content.scrollTo(0, this.content.scrollHeight);
    }

    addText(msg, agent) {
      let msgDiv = "";
      if (agent) {
        msgDiv = "<div class='ciapiSkinTranscriptAgentLine'><div class='bubble agent-bubble background-img enter'>" + msg + "</div></div>";
      } else {
        msgDiv = "<div class='ciapiSkinTranscriptCustLine'><div class='bubble customer-bubble background-img enter'>" + msg + "</div></div>";
      }
      this.addTextAndScroll(msgDiv);
    }

    addSystemMsg(msg) {
      const msgDiv = "<div class='ciapiSkinTranscriptSysMsg'><div class='ciapiSkinSysMsg'>" + msg + "</div></div>";
      this.addTextAndScroll(msgDiv);
    }

    addOpenerScript(openerScript) {
      const msgDiv = "<div class='ciapiSkinTranscriptOpener'><div class='ciapiSkinOpener'>" + openerScript + "</div></div>";
      this.addTextAndScroll(msgDiv);
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
        const msgDiv = "<div class='bubble agent-bubble background-img enter'>" + msg + "</div>";

        let agentDiv = document.createElement("div")
        agentDiv.classList.add('ciapiSkinTranscriptAgentLine');
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this.fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);
        this.content.scrollTo(0, this.content.scrollHeight);
    }

    handleMessage(msg) {
//      console.log(msg);
      if (msg.messageType === "chat.communication") {
        this.addText(msg.messageText, msg.agentID);
      } else if (msg.messageType === "chat.automaton_request") {
        this.addAutomatonText(msg["automaton.data"]);
      } else if (msg.state === "closed") {
        this.addSystemMsg("Agent Left Chat.");
      } else if (msg.messageType === "chat.communication.queue") {
        this.addSystemMsg(msg.messageText);
      } else if (msg.messageType === "chat.denied") {
        this.addSystemMsg("No agents are available.");
      }
    }
}
