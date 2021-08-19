export default class PostChatSurveyService {
    constructor(sdk) {
        this.sdk = sdk;
    }

    beginPostChatSurvey(survey, automaton, timestamp) {
        const chatParams = this.sdk.getChatParams();

        //TEMP LOGGING #TODO REMOVE THIS LATER
        console.log("ChatID---------------------" + chatParams.getChatId)
        console.log("thisCustomerID---------------------" + chatParams.thisCustomerID)
        console.log("agentId---------------------" + chatParams.agentId)
        console.log("thisCustomerID---------------------" + chatParams.thisCustomerID)
        console.log("sessionID---------------------" + chatParams.sessionID)
        console.log("getVisitorAttributes---------------------" + chatParams.getVisitorAttributes())
        console.log("siteID---------------------" + chatParams.siteID)
        console.log("pageID---------------------" + chatParams.launchPageId)
        console.log("businessUnitID---------------------" + chatParams.businessUnitID)
        console.log("BRName---------------------" + chatParams.chatTitle)
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

       console.log("===== beginPostChatSurvey =====");

        try {
            //TEMP started object just to get the call working. This returned successfully using Postman. Replace this with 'startedEvent' when we get this working
            this.sdk.logEventToDW([
                {"_domain":"automaton",
                "evt":"started",
                "automatonType":"satisfactionSurvey",
                "automatonStartedBy":"survey,survey",
                "startedIn":"chat",
                "type":"satisfactionSurvey",
                "clientTimestamp":"2021-08-04T16:00",
                "chatID":90000001,
                "customerID":"ThisCustomerID",
                "agentID":"AgentId",
                "custID":"ThisCustomerID",
                "incAssignmentID":"SessionID",
                "sessionID":"SessionID",
                "visitorAttributes":"VisitorAttributes",
                "automatonAttributes":"",
                "siteID":10006719,
                "clientID":12345566,
                "pageID":"1234",
                "businessUnitID":"BusinessUnitID",
                "businessRuleID":123455,
                "busUnitID":1233435,
                "BRName":"ChatTitle",
                "agentGroupID":1234535,
                "availableAgentAttributes":"AgentAttributes",
                "brAttributes":"RuleAttributes",
                "countryCode":"CountryCode",
                "regionCode":"RegionCode",
                "deviceType":"DeviceType",
                "operatingSystemType":"OperatingSystemType",
                "browserType":"BrowserType",
                "browserVersion":"BrowserVersion",
                "preassigned":false,
                "surveyId":"SurveyId",
                "automatonID":444445,
                "automatonName":"AutomatonName"}
            ]);
        } catch (e) {
            console.error("!!!! logEventToDW got exception: ", e);
        }

    }
}
