export default class PostChatSurveyService {
    constructor(sdk) {
        this.sdk = sdk;
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
            chatID: chatParams.getChatId(),
            customerID: chatParams.thisCustomerID,
            agentID: chatParams.agentId,
            custID: chatParams.thisCustomerID,
            incAssignmentID: chatParams.sessionID,
            sessionID: chatParams.sessionID,
            visitorAttributes: chatParams.getVisitorAttributes(),
            automatonAttributes: "",
            siteID: chatParams.siteID,
            clientID: chatParams.siteID,
            pageID: chatParams.launchPageId,
            businessUnitID: chatParams.businessUnitID,
            businessRuleID: chatParams.brID,
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
            surveyId: survey.id,
            automatonID: automaton.id,
            automatonName: automaton.name
        };

        const contentSentToCustomerEvent = {
            _domain: "automaton"
            evt: "contentSentToCustomer"
            unique_node_id: "node_1"
            custom.decisiontree.nodeID: ""
            custom.decisiontree.questions: "0.Was the chatbot useful?,1.Was the chatbot your first contact choice?,2.If you had not used chatbot today how else would you have contacted us?"
            custom.decisiontree.questionIDs: ""
            clientTimestamp: timestamp
            automatonType: "satisfactionSurvey"
            chatID: chatParams.getChatId(),
            customerID: chatParams.thisCustomerID,
            agentID: chatParams.agentId,
            custID: chatParams.thisCustomerID
            incAssignmentID: chatParams.sessionID
            sessionID: chatParams.sessionID
            visitorAttributes: chatParams.getVisitorAttributes()
            automatonAttributes: ""
            siteID: chatParams.siteID,
            clientID: chatParams.siteID,
            pageID: chatParams.launchPageId,
            businessUnitID: chatParams.businessUnitID,
            businessRuleID: chatParams.brID,
            busUnitID: chatParams.businessUnitID,
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
            surveyId: survey.id,
            automatonID: automaton.id,
            automatonName: automaton.name
        }

        this.sdk.logEventToDW([
            startedEvent,
            contentSentToCustomerEvent
        ]);
    }
}
