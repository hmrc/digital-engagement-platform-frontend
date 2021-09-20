export default class PostChatSurveyService {
    constructor(sdk) {
        this.sdk = sdk;
    }

    closePostChatSurvey(automaton, timestamp) {
        const chatParams = this.sdk.getChatParams();

        const endedEvent = {
            _domain: "automaton",
            evt: "ended",
            automatonType: "satisfactionSurvey",
            siteID: Number(chatParams.siteID),
            customerID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            pageID: Number(chatParams.launchPageId),
            sessionID: chatParams.sessionID,
            chatID: chatParams.getChatId,
            preAssigned: this.sdk.isConnected() && !chatParams.agentId,
            automatonID: automaton.id,
            "automaton.outcomeType": "Refused",
            clientTimestamp: timestamp
        };

        console.log("===== closePostChatSurvey =====");

        try {
            this.sdk.logEventToDW({eventList:[endedEvent]});
        } catch (e) {
            console.error("!!!! logEventToDW got exception: ", e);
        }

    }

    submitPostChatSurvey(survey, automaton, timestamp) {
        const chatParams = this.sdk.getChatParams();

        const customerRespondedEvent = {
            _domain:"automaton",
            evt:"customerResponded",
            automatonType:"satisfactionSurvey",
            siteID: Number(chatParams.siteID),
            customerID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            pageID: Number(chatParams.launchPageId),
            sessionID: chatParams.sessionID,
            chatID: chatParams.getChatId,
            preAssigned: this.sdk.isConnected() && !chatParams.agentId,
            automatonID: automaton.id,
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance - Initial",
            automatonNodeAttributes: "",
            "custom.decisiontree.questionIDs": "0." + survey.questions[0].id + ",1." + survey.questions[1].id + ",2." + survey.questions[2].id,
            "custom.decisiontree.questions": "0." + survey.questions[0].text + ",1." + survey.questions[1].text + ",2." + survey.questions[2].text,
            "custom.decisiontree.answerIDs":"0." + survey.answers[0].id + ",1." + survey.answers[1].id + ",2." + survey.answers[2].id,
            "custom.decisiontree.answers": "0." + survey.answers[0].text + ",1." + survey.answers[1].text + ",2." + survey.answers[2].text,
            "custom.decisiontree.answerTypes": "0,0,0",
            "custom.decisiontree.answersNumeric": "0,1,2",
            clientTimestamp: timestamp
        };

        const contentSentToCustomerEvent = {
            _domain: "automaton",
            evt: "contentSentToCustomer",
            automatonType: "satisfactionSurvey",
            siteID: Number(chatParams.siteID),
            customerID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            pageID: Number(chatParams.launchPageId),
            sessionID: chatParams.sessionID,
            chatID: chatParams.getChatId,
            preAssigned: this.sdk.isConnected() && !chatParams.agentId,
            automatonID: automaton.id,
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance - Thank You",
            automatonNodeAttributes: "node_id,node_1;node_name,HMRC_PostChat_Guidance - Thank You;node_type,thankyou;node_is_outcome,1",
            "custom.decisiontree.questions": "Thank you",
            "custom.decisiontree.questionIDs": "node_1",
            clientTimestamp: timestamp
        };

        const endedEvent = {
            _domain: "automaton",
            evt: "ended",
            automatonType: "satisfactionSurvey",
            siteID: Number(chatParams.siteID),
            customerID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            pageID: Number(chatParams.launchPageId),
            sessionID: chatParams.sessionID,
            chatID: chatParams.getChatId,
            preAssigned: this.sdk.isConnected() && !chatParams.agentId,
            automatonID: automaton.id,
            "automaton.outcomeType": "Completed",
            "automaton.outcome": "User has submitted postchat feedback.",
            clientTimestamp: timestamp
        };

        console.log("===== submitPostChatSurvey =====");

        try {
            this.sdk.logEventToDW({eventList:[customerRespondedEvent, contentSentToCustomerEvent, endedEvent]});
        } catch (e) {
            console.error("!!!! logEventToDW got exception: ", e);
        }
    }

    beginPostChatSurvey(survey, automaton, timestamp) {
        const chatParams = this.sdk.getChatParams();

        const startedEvent = {
            _domain: "automaton",
            evt: "started",
            automatonType: "satisfactionSurvey",
            automatonStartedBy: "survey, survey",
            startedIn: "chat",
            type: "satisfactionSurvey",
            clientTimestamp: timestamp,
            chatID: chatParams.getChatId,
            customerID: chatParams.thisCustomerID,
            agentID: chatParams.agentId,
            custID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            sessionID: chatParams.sessionID,
            visitorAttributes: chatParams.getVisitorAttributes(),
            automatonAttributes: "",
            siteID: Number(chatParams.siteID),
            clientID: Number(chatParams.siteID),
            pageID: Number(chatParams.launchPageId),
            businessUnitID: chatParams.businessUnitID,
            businessRuleID: Number(chatParams.brID),
            busUnitID: chatParams.businessUnitID,
            BRName: chatParams.chatTitle,
            agentGroupID: chatParams.agId,
            availableAgentAttributes: chatParams.agentAttributes,
            brAttributes: chatParams.ruleAttributes,
            countryCode: chatParams.countryCode,
            regionCode: chatParams.regionCode,
            deviceType: chatParams.deviceType,
            operatingSystemType: chatParams.operatingSystemType,
            browserType: chatParams.browserType,
            browserVersion: chatParams.browserVersion,
            preassigned: this.sdk.isConnected() && !chatParams.agentId,
            surveyId: Number(survey.id),
            automatonID: automaton.id,
            automatonName: automaton.name
        };

        const contentSentToCustomerEvent = {
            _domain: "automaton",
            evt: "contentSentToCustomer",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance - Initial",
            "custom.decisiontree.questions": "0." + survey.questions[0].text + ",1." + survey.questions[1].text + ",2." + survey.questions[2].text,
            "custom.decisiontree.questionIDs": "0." + survey.questions[0].id + ",1." + survey.questions[1].id + ",2." + survey.questions[2].id,
            clientTimestamp: timestamp,
            automatonType: "satisfactionSurvey",
            chatID: chatParams.getChatId,
            customerID: chatParams.thisCustomerID,
            agentID: chatParams.agentId,
            custID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            sessionID: chatParams.sessionID,
            visitorAttributes: chatParams.getVisitorAttributes(),
            automatonAttributes: "",
            siteID: Number(chatParams.siteID),
            clientID: Number(chatParams.siteID),
            pageID: Number(chatParams.launchPageId),
            businessUnitID: chatParams.businessUnitID,
            businessRuleID: Number(chatParams.brID),
            busUnitID: chatParams.businessUnitID,
            BRName: chatParams.chatTitle,
            agentGroupID: chatParams.agId,
            availableAgentAttributes: chatParams.agentAttributes,
            brAttributes: chatParams.ruleAttributes,
            brAttributes: chatParams.ruleAttributes,
            countryCode: chatParams.countryCode,
            regionCode: chatParams.regionCode,
            deviceType: chatParams.deviceType,
            operatingSystemType: chatParams.operatingSystemType,
            browserType: chatParams.browserType,
            browserVersion: chatParams.browserVersion,
            preassigned: this.sdk.isConnected() && !chatParams.agentId,
            surveyId: Number(survey.id),
            automatonID: automaton.id,
            automatonName: automaton.name
        }


       console.log("===== beginPostChatSurvey =====");

        try {
            this.sdk.logEventToDW({eventList:[startedEvent, contentSentToCustomerEvent]});
        } catch (e) {
            console.error("!!!! logEventToDW got exception: ", e);
        }

    }
}
