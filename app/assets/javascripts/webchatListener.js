export var chatListener = {
    downTimeoutDuration: 9000,
    loadingTextSelector: '.webchat-loading-text',
    messagingContainerSelector: '.webchat-messaging-container',
    nuanceDownTimeout: null,

    //In console
    onPageLanding: function(evt) {
        console.log("On Page Landing: data=", evt.data, "page=", evt.page, "reinitialized=", evt.reinitialized);
    },
    //In console
    onRuleSatisfied: function(evt) {
        console.log("On Rule Satisfied:", evt);
    },
    //In console
    onExposureQualified: function(evt) {
        console.log("On Exposure Qualified:", evt);
    },
    //Not seen in console
    chatRequestQ: function(evt) {
        console.log("chatRequestQ:", evt);
    },
    //In console
    onServiceInvitation: function(evt) {
        console.log("onServiceInvitation:", evt);
    },
    //In console
    onServiceMissed: function(evt) {
        console.log("onServiceMissed:", evt);
    },
    //In console
    onChatLaunched: function(evt) {
        console.log("Chat Launched: chatID=" +evt.chatID+
            ",customerID=" +evt.customerID + " Chat Type: " + evt.chatType + " Biz Rule Name: " + evt.bizRuleName + " Event Type: " + evt.evtType);
    },
    //In console
    onChatShown: function(evt) {
        console.log("Chat shown:", evt);
    },
    //In console
    onChatEvent: function(evt) {
        console.log("Chat event:", evt);
    },
    //In console
    onBeforeChatClosed: function(evt) {
        console.log("onBeforeChatClosed:", evt);
    },
    //In console
    onAgentMsg: function(evt) {
        console.log("onAgentMsg:", evt);
    },
    //In console
    onCustomerMsg: function(evt) {
        console.log("onCustomerMsg:", evt);
    },
    //In console
    onChatClosed: function(evt){
        console.log("Chat Closed: chatID=" +evt.chatID+ ", chatType="+evt.chatType+ ", evtType=" +evt.evtType + " Biz Rule Name: " + evt.bizRuleName + ",customerID=" +evt.customerID);
    },
    //In console
    onC2CStateChanged: function(evt) {
        console.log("C2C State Changed = ", evt);
        this.chatHasEngaged();
    },
    //Not seen in console
    onC2CDisplayed: function(evt) {
        console.log("C2C Displayed - rule= ", evt);
    },
    //In console
    onC2CDisplayed: function(evt) {
        console.log("C2C Displayed: Business Rule Name: " + evt.bizRuleName + " Customer ID: " + evt.customerID );
    },
    //In console
    onC2CClicked: function(evt) {
        console.log("C2C Clicked: Business Rule Name: " + evt.bizRuleName + " Customer ID: " + evt.customerID );
    },
    //Not seen in console
    onChatEngagedEvent: function(evt) {
        console.log("Chat Engaged: chatID=" +evt.chatID+ ", chatType="+evt.chatType+ ", evtType=" +evt.evtType + " Biz Rule Name: " + evt.bizRuleName + ",customerID=" +evt.customerID);
    },
    //In console
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
        console.log("technicalError");
        this.showNuanceDiv();
    },
    waitForSignsOfLife: function() {
        var self = this;
        this.nuanceDownTimeout = setTimeout(function() {
            console.log("Nuance is down...");
            self.showNuanceDiv();
        }, this.downTimeoutDuration);
    },
    loadFunction: null,
    startup: function(w) {
//        localStorage.enableJSLogging = true;
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

