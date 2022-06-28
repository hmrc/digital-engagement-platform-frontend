export var chatListener = {
    downTimeoutDuration: 9000,
    loadingTextSelector: '.webchat-loading-text',
    messagingContainerSelector: '.webchat-messaging-container',
    nuanceDownTimeout: null,

    onPageLanding: function(evt) {
        console.log("On Page Landing: data=", evt.data, "page=", evt.page, "reinitialized=", evt.reinitialized);
    },
    onRuleSatisfied: function(evt) {
        console.log("On Rule Satisfied:", evt);
    },
    onExposureQualified: function(evt) {
        console.log("On Exposure Qualified:", evt);
    },
    chatRequestQ: function(evt) {
        console.log("chatRequestQ:", evt);
    },
    onServiceInvitation: function(evt) {
        console.log("onServiceInvitation:", evt);
    },
    onServiceMissed: function(evt) {
        console.log("onServiceMissed:", evt);
    },
    onChatLaunched: function(evt) {
        console.log("Chat Launched: chatID=" +evt.chatID+
            ",customerID=" +evt.customerID + " Chat Type: " + evt.chatType + " Biz Rule Name: " + evt.bizRuleName + " Event Type: " + evt.evtType);
    },
    onChatShown: function(evt) {
        console.log("Chat shown:", evt);
    },
    onChatEvent: function(evt) {
        console.log("Chat event:", evt);
    },
    onBeforeChatClosed: function(evt) {
        console.log("onBeforeChatClosed:", evt);
    },
    onAgentMsg: function(evt) {
        console.log("onAgentMsg:", evt);
    },
    onCustomerMsg: function(evt) {
        console.log("onCustomerMsg:", evt);
    },
    onChatClosed: function(evt){
        console.log("Chat Closed: chatID=" +evt.chatID+ ", chatType="+evt.chatType+ ", evtType=" +evt.evtType + " Biz Rule Name: " + evt.bizRuleName + ",customerID=" +evt.customerID);
    },
    onC2CStateChanged: function(evt) {
        console.log("C2C State Changed = ", evt);
        this.chatHasEngaged();
    },
    onC2CDisplayed: function(evt) {
        console.log("C2C Displayed - rule= ", evt);
    },
    onC2CDisplayed: function(evt) {
        console.log("C2C Displayed: Business Rule Name: " + evt.bizRuleName + " Customer ID: " + evt.customerID );
    },
    onC2CClicked: function(evt) {
        console.log("C2C Clicked: Business Rule Name: " + evt.bizRuleName + " Customer ID: " + evt.customerID );
    },
    onChatEngagedEvent: function(evt) {
        console.log("Chat Engaged: chatID=" +evt.chatID+ ", chatType="+evt.chatType+ ", evtType=" +evt.evtType + " Biz Rule Name: " + evt.bizRuleName + ",customerID=" +evt.customerID);
    },
    onAnyEvent: function(evt) {
        console.log("Chat any event:", evt);
    },
    chatHasEngaged: function() {
        if (this.nuanceDownTimeout) {
            clearTimeout(this.nuanceDownTimeout);
            this.nuanceDownTimeout = null;
        }
        this.showNuanceDiv();
    },
    showElements: function(selector, displayState) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; ++i) {
            elements[i].style.display = (displayState ? "block": "none");
        }
    },
    showNuanceDiv: function() {
        console.log("show Nuance Div text...");
        this.showElements(this.loadingTextSelector, false);
        this.showElements(this.messagingContainerSelector, true);
    },
    showLoadingText: function() {
        this.showElements(this.messagingContainerSelector, false);
        this.showElements(this.loadingTextSelector, true);
    },
    technicalError: function() {
        this.showNuanceDiv();
    },
    waitForSignsOfLife: function() {
        var self = this;
        this.nuanceDownTimeout = setTimeout(function() {
            self.showNuanceDiv();
        }, this.downTimeoutDuration);
    },
    loadFunction: null,
    startup: function(w) {
        var self = this;
        this.loadFunction = function() {
            self.showLoadingText();
            self.waitForSignsOfLife();
        }
        w.addEventListener("load", this.loadFunction);
    },
    shutdown: function(w) {
        w.removeEventListener("load", this.loadFunction);
    }
};

export function initChatListener(w) {
    w.InqRegistry = {
        listeners: [chatListener]
    };

    chatListener.startup(w);
}

