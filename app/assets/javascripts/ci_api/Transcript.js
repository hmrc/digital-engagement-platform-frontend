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
    constructor(content, vaLinkCallback) {
        this.content = content;
        this.vaLinkCallback = vaLinkCallback;
    }

    addAgentMsg(msg, agent) {
        this._addTextWithClass(msg, Classes.Agent);
    }

    addCustomerMsg(msg, agent) {
        this._addTextWithClass(msg, Classes.Customer);
    }

    addSystemMsg(msg) {
        this._addTextWithClass(msg, Classes.System);
    }

    addOpenerScript(msg) {
        this._addTextWithClass(msg, Classes.Opener);
    }

    addAutomatonMsg(msg) {
        const msgDiv = `<div class='${Classes.Agent.Inner}'>${msg}</div>`;

        let agentDiv = document.createElement("div")
        agentDiv.classList.add(Classes.Agent.Outer);
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this._fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);
        this.content.scrollTo(0, this.content.scrollHeight);
    }

    _fixUpVALinks(div) {
        const links = div.getElementsByTagName('a');

        for (var link of links) {
            for (var attribute of link.attributes) {
                if (attribute.name === "data-vtz-link-type" && attribute.value === "Dialog") {
                    link.onclick = this.vaLinkCallback;
                }
            }
        }
    }

    _addTextAndScroll(msg) {
        this.content.insertAdjacentHTML("beforeend", msg);
        this.content.scrollTo(0, this.content.scrollHeight);
    }

    _addTextWithClass(msg, msg_class) {
        const msgDiv = `<div class='${msg_class.Outer}'><div class='${msg_class.Inner}'>${msg}</div></div>`;
        this._addTextAndScroll(msgDiv);
    }


}
