import PostChatSurveyService from '../../../app/assets/javascripts/ci_api/PostChatSurveyService'

const chatParams = {
    agId: "AgId",
    agentId: "AgentId",
    agentAttributes: "AgentAttributes",
    browserType: "BrowserType",
    browserVersion: "BrowserVersion",
    brID: "BrID",
    businessUnitID: "BusinessUnitID",
    chatTitle: "ChatTitle",
    countryCode: "CountryCode",
    deviceType: "DeviceType",
    getChatId: "ChatId",
    getVisitorAttributes: () => { return "VisitorAttributes"; },
    launchPageId: "LaunchPageId",
    operatingSystemType: "OperatingSystemType",
    regionCode: "RegionCode",
    ruleAttributes: "RuleAttributes",
    sessionID: "SessionID",
    siteID: "SiteID",
    thisCustomerID: "ThisCustomerID",
};

const survey = {
    id: "SurveyId",
    questions: [
        { id: "q1", text: "Was the chatbot useful?", freeform: false},
        { id: "q2", text: "Was the chatbot your first contact choice?", freeform: false},
        { id: "q3", text: "If you had not used chatbot today, how else would you have contacted us?", freeform: false}
    ]
};

const answers = [
    "Yes",
    "No",
    "Phone"
];

const automaton = {
    id: "AutomatonID",
    name: "AutomatonName"
};

describe("PostChatSurveyService", () => {
    it("sends event for begining a post chat survey", () => {
        const sdk = {
            getChatParams: () => { return chatParams; },
            isConnected: () => { return true; },
            logEventToDW: jest.fn()
        };

        const service = new PostChatSurveyService(sdk);

        const timestamp = Date.now();

        const expectedStartedEvent = {
            _domain: "automaton",
            evt: "started",
            automatonType: "satisfactionSurvey",
            automatonStartedBy: "survey, survey",
            startedIn: "chat",
            type: "satisfactionSurvey",
            clientTimestamp: timestamp,
            chatID: "ChatId",
            customerID: "ThisCustomerID",
            agentID: "AgentId",
            custID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            sessionID: "SessionID",
            visitorAttributes: "VisitorAttributes",
            automatonAttributes: "",
            siteID: "SiteID",
            clientID: "SiteID",
            pageID: "LaunchPageId",
            businessUnitID: "BusinessUnitID",
            businessRuleID: "BrID",
            busUnitID: "BusinessUnitID",
            BRName: "ChatTitle",
            agentGroupID: "AgId",
            availableAgentAttributes: "AgentAttributes",
            brAttributes: "RuleAttributes",
            countryCode: "CountryCode",
            regionCode: "RegionCode",
            deviceType: "DeviceType",
            operatingSystemType: "OperatingSystemType",
            browserType: "BrowserType",
            browserVersion: "BrowserVersion",
            preassigned: false,
            surveyId: "SurveyId",
            automatonID: "AutomatonID",
            automatonName: "AutomatonName"
        };

        const expectedContentSentToCustomerEvent = {
        _domain: "automaton",
            evt: "contentSentToCustomer",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance - Initial",
            "custom.decisiontree.questions": "0.Was the chatbot useful?,1.Was the chatbot your first contact choice?,2.If you had not used chatbot today, how else would you have contacted us?",
            "custom.decisiontree.questionIDs": "0.q1,1.q2,2.q3",
            clientTimestamp: timestamp,
            automatonType: "satisfactionSurvey",
            chatID: "ChatId",
            customerID: "ThisCustomerID",
            agentID: "AgentId",
            custID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            sessionID: "SessionID",
            visitorAttributes: "VisitorAttributes",
            automatonAttributes: "",
            siteID: "SiteID",
            clientID: "SiteID",
            pageID: "LaunchPageId",
            businessUnitID: "BusinessUnitID",
            businessRuleID: "BrID",
            busUnitID: "BusinessUnitID",
            BRName: "ChatTitle",
            agentGroupID: "AgId",
            availableAgentAttributes: "AgentAttributes",
            brAttributes: "RuleAttributes",
            countryCode: "CountryCode",
            regionCode: "RegionCode",
            deviceType: "DeviceType",
            operatingSystemType: "OperatingSystemType",
            browserType: "BrowserType",
            browserVersion: "BrowserVersion",
            preassigned: false,
            surveyId: "SurveyId",
            automatonID: "AutomatonID",
            automatonName: "AutomatonName"
        };


        service.beginPostChatSurvey(survey, automaton, timestamp);

        expect(sdk.logEventToDW).toHaveBeenCalledWith({eventList:[
            expectedStartedEvent,
            expectedContentSentToCustomerEvent
        ]});
    });
});
