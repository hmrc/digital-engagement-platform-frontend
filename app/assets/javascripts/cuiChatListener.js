export var chatListener = {
    downTimeoutDuration: 8000,
    engagementTimeoutDuration: 4000,
    loadingAnimationSelector: '#cui-loading-animation',
    messagingContainerSelector: '#cui-messaging-container',
    nuanceDownTimeout: null,
    engageTimeout: null,
    engaged: false,
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

        // Wait for Nuance div to settle. We should get a "shown" event,
        // but if not, then show anyway but later.
        var self = this;
        setTimeout(function() {
            self.chatHasEngaged();
        }, 2000);
    },
    onChatShown: function(evt) {
        console.log("Chat shown:", evt);
        this.chatHasEngaged();
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
        console.log("C2C State Changed - rule= "+evt.bizRuleName+", oldstate: " + evt.oldState + ", newstate: "+evt.newState + ",customerID=" +evt.customerID);
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
        if (this.nuanceDownTimeout) {
            console.log("Clear down timeout.")
            clearTimeout(this.nuanceDownTimeout);
            this.nuanceDownTimeout = null;
            this.waitForEngagement();
        }
    },
    waitForEngagement: function() {
        if (this.engaged) {
            return;
        }

        var self = this;
        this.engageTimeout = setTimeout(function() {
            console.log("Chat did not start...");
            self.technicalError();
        }, this.engagementTimeoutDuration);
    },
    chatHasEngaged: function() {
        if (this.engageTimeout) {
            clearTimeout(this.engageTimeout);
            this.engageTimeout = null;
        }
        this.engaged = true;
        $('.cui-technical-error').hide();   // If we showed the technical error, clear it.
        this.showNuanceDiv();
    },
    showNuanceDiv: function() {
        console.log("showNuanceDiv");

        var loadingAnimation = $(this.loadingAnimationSelector)
        var messagingContainer = $(this.messagingContainerSelector)
        messagingContainer.fadeTo(2000, 1.0);
        loadingAnimation.fadeTo(1500, 0.0, function() {
            loadingAnimation.hide();
        });
      
        if($("#ciapiSkin").length){
             $('.cui-technical-error').hide();
        }
    },
    showLoadingAnimation: function() {
        var loadingAnimation = $(this.loadingAnimationSelector);
        var messagingContainer = $(this.messagingContainerSelector);

        messagingContainer.fadeTo(0, 0.0);
        loadingAnimation.show();
    },
    technicalError: function() {
        let errorId = "error-message";
        var errorMessageDiv = document.createElement("div");
        errorMessageDiv.setAttribute('id', errorId);
        errorMessageDiv.setAttribute('aria-live', 'assertive');
        $('#nuanMessagingFrame').append(errorMessageDiv);
        document.getElementById(errorId).innerHTML = '<p class="cui-technical-error error-message">Sorry, there is a problem with this service. Try again later</p>';

        this.showNuanceDiv();
    },
    waitForSignsOfLife: function() {
        var self = this;

        this.nuanceDownTimeout = setTimeout(function() {
            self.technicalError();
        }, this.downTimeoutDuration);

    },
    loadFunction: null,
    startup: function(w) {
//        localStorage.enableJSLogging = true;
        var self = this;

        this.loadFunction = function() {
            self.showLoadingAnimation();
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

