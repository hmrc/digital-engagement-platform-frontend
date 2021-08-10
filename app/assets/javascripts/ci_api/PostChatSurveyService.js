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
            cust: chatParams.thisCustomerID,
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
            custom.decisiontree.questions: "0.How much did you like your broker?,1.How likely are you to visit us again?,2.Write any comments you have below"
            custom.decisiontree.questionIDs: ""
            clientTimestamp
            automatonType
            chatID
            customerID
            agentID
            custID
            incAssignmentID
            sessionID
            visitorAttributes
            automatonAttributes
            siteID
            ClientID
            pageID
            businessUnitID
            businessRuleID
            busUnitID
            BRName
            agentGroupID
            availableAgentAttributes
            brAttributes
            countryCode
            regionCode
            deviceType
            operatingSystemType
            browserType
            browserVersion
            preassigned
            surveyId
            automatonID
            automatonName
        }

        this.sdk.logEventToDW([
            startedEvent,
            // contentSentToCustomerEvent
        ]);
    }
}
