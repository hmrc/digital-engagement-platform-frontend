export default class PostChatSurveyService {
    constructor(sdk) {
        this.sdk = sdk;
    }

    beginPostChatSurvey(survey, automaton, timestamp) {
        const chatParams = this.sdk.getChatParams();

        console.log("ChatID---------------------" + chatParams.getChatId)
        console.log("thisCustomerID---------------------" + chatParams.thisCustomerID)
        console.log("agentId---------------------" + chatParams.agentId)
        console.log("thisCustomerID---------------------" + chatParams.thisCustomerID)
        console.log("sessionID---------------------" + chatParams.sessionID)
        console.log("getVisitorAttributes---------------------" + chatParams.getVisitorAttributes())
        console.log("siteID---------------------" + chatParams.siteID)
        console.log("launchPageId---------------------" + chatParams.launchPageId)
        console.log("businessUnitID---------------------" + chatParams.businessUnitID)
        console.log("chatTitle---------------------" + chatParams.chatTitle)
        console.log("agId---------------------" + chatParams.agId)
        console.log("agentAttributes---------------------" + chatParams.agentAttributes)
        console.log("ruleAttributes---------------------" + chatParams.ruleAttributes)
        console.log("countryCode---------------------" + chatParams.countryCode)
        console.log("regionCode---------------------" + chatParams.regionCode)
        console.log("deviceType---------------------" + chatParams.deviceType)
        console.log("operatingSystemType---------------------" + chatParams.operatingSystemType)
        console.log("browserType---------------------" + chatParams.browserType)
        console.log("browserVersion---------------------" + chatParams.browserVersion)


        const startedEvent = {
            "_domain": "automaton",
            "evt": "started",
            "automatonType": "satisfactionSurvey",
            "automatonStartedBy": "survey, survey",
            "startedIn": "chat",
            "type": "satisfactionSurvey",
            "clientTimestamp": timestamp,
            "chatID": chatParams.getChatId,
            "customerID": chatParams.thisCustomerID,
            "agentID": chatParams.agentId,
            "custID": chatParams.thisCustomerID,
            "incAssignmentID": chatParams.sessionID,
            "sessionID": chatParams.sessionID,
            "visitorAttributes": chatParams.getVisitorAttributes(),
            "automatonAttributes": "",
            "siteID": chatParams.siteID,
            "clientID": chatParams.siteID,
            "pageID": chatParams.launchPageId,
            "businessUnitID": chatParams.businessUnitID,
            "businessRuleID": chatParams.brID,
            "busUnitID": chatParams.businessUnitID,
            "BRName": chatParams.chatTitle,
            "agentGroupID": chatParams.agId,
            "availableAgentAttributes": chatParams.agentAttributes,
            "brAttributes": chatParams.ruleAttributes,
            "countryCode": chatParams.countryCode,
            "regionCode": chatParams.regionCode,
            "deviceType": chatParams.deviceType,
            "operatingSystemType": chatParams.operatingSystemType,
            "browserType": chatParams.browserType,
            "browserVersion": chatParams.browserVersion,
            "preassigned": this.sdk.isConnected() && !chatParams.agentId,
            "surveyId": survey.id,
            "automatonID": automaton.id,
            "automatonName": automaton.name
        };

        const contentSentToCustomerEvent = {
            _domain: "automaton",
            evt: "contentSentToCustomer",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "",
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


       console.error("===== beginPostChatSurvey =====");
       console.log("STARTEDEVENT--------------------------" + startedEvent);

        this.sdk.logEventToDW([
            startedEvent
            //contentSentToCustomerEvent
        ]);
    }
}
