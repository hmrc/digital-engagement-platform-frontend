export default class Transcript {
    constructor(content, vaLinkCallback, classes) {
        this.content = content;
        this.vaLinkCallback = vaLinkCallback;
        this.classes = classes
    }

    addAgentMsg(msg, agent) {
        this._appendMessage(msg, this.classes.Agent);
    }

    addCustomerMsg(msg, agent) {
        this._appendMessage(msg, this.classes.Customer);
    }

    addSystemMsg(msg) {
        this._appendMessage(msg, this.classes.System);
    }

    addOpenerScript(msg) {
        this._appendMessage(msg, this.classes.Opener);
    }

    addAutomatonMsg(msg) {
        const msgDiv = `<div class='${this.classes.Agent.Inner}'>${msg}</div>`;

        let agentDiv = document.createElement("div")
        agentDiv.classList.add(this.classes.Agent.Outer);
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this._fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);
        this._showLatestContent();
    }

    _fixUpVALinks(div) {
        const links = div.getElementsByTagName('a');

        for (const link of links) {
            for (const attribute of link.attributes) {
                if (attribute.name === "data-vtz-link-type" && attribute.value === "Dialog") {
                    link.onclick = this.vaLinkCallback;
                }
            }
        }
    }

    _appendMessage(msg, msg_class) {
        const msgDiv = `<div class='${msg_class.Outer}'><div class='${msg_class.Inner}'>${msg}</div></div>`;
        this.content.insertAdjacentHTML("beforeend", msgDiv);
        this._showLatestContent();
    }

    _showLatestContent() {
        this.content.scrollTo(0, this.content.scrollHeight);
    }
}
