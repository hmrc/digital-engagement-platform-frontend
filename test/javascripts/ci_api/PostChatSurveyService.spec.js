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
    ],
    answers: [
        { id: "a1", text: "Yes", freeform: false},
        { id: "a2", text: "No", freeform: false},
        { id: "a3", text: "Phone", freeform: false},
    ]
};

const automaton = {
    id: "AutomatonID",
    name: "AutomatonName"
};

describe("PostChatSurveyService", () => {
    it("sends event for beginning a post chat survey", () => {
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

    it("sends event for submitting a post chat survey", () => {
        const sdk = {
            getChatParams: () => { return chatParams; },
            isConnected: () => { return true; },
            logEventToDW: jest.fn()
        };

        const service = new PostChatSurveyService(sdk);
        const timestamp = Date.now();

        const expectedCustomerRespondedEvent = {
            _domain:"automaton",
            evt:"customerResponded",
            automatonType:"satisfactionSurvey",
            siteID: "SiteID",
            customerID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            pageID: "LaunchPageId",
            sessionID: "SessionID",
            chatID: "ChatId",
            preAssigned: false,
            automatonID: "AutomatonID",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance - Initial",
            automatonNodeAttributes: "",
            "custom.decisiontree.questionIDs": "0.q1,1.q2,2.q3",
            "custom.decisiontree.questions": "0.Was the chatbot useful?,1.Was the chatbot your first contact choice?,2.If you had not used chatbot today, how else would you have contacted us?",
            "custom.decisiontree.answerIDs": "0.a1,1.a2,2.a3",
            "custom.decisiontree.answers": "0.Yes,1.No,2.Phone",
            "custom.decisiontree.answerTypes": "0,0,0",
            "custom.decisiontree.answersNumeric": "0,1,2",
            clientTimestamp: timestamp
        };

        const expectedContentSentToCustomerEvent = {
            _domain: "automaton",
            evt: "contentSentToCustomer",
            automatonType: "satisfactionSurvey",
            siteID: "SiteID",
            customerID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            pageID: "LaunchPageId",
            sessionID: "SessionID",
            chatID: "ChatId",
            preAssigned: false,
            automatonID: "AutomatonID",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance - Thank You",
            automatonNodeAttributes: "node_id,node_1;node_name,HMRC_PostChat_Guidance - Thank You;node_type,thankyou;node_is_outcome,1",
            "custom.decisiontree.questions": "Thank you",
            "custom.decisiontree.questionIDs": "node_1",
            clientTimestamp: timestamp
        };

        const expectedEndedEvent = {
            _domain: "automaton",
            evt: "ended",
            automatonType: "satisfactionSurvey",
            siteID: "SiteID",
            customerID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            pageID: "LaunchPageId",
            sessionID: "SessionID",
            chatID: "ChatId",
            preAssigned: false,
            automatonID: "AutomatonID",
            "automaton.outcomeType": "Completed",
            "automaton.outcome": "User has submitted postchat feedback.",
            clientTimestamp: timestamp
        };

        service.submitPostChatSurvey(survey, automaton, timestamp);

        expect(sdk.logEventToDW).toHaveBeenCalledWith({eventList:[
            expectedCustomerRespondedEvent,
            expectedContentSentToCustomerEvent,
            expectedEndedEvent
        ]});
    });

    it("sends event for closing webchat and not submitting post chat survey", () => {
        const sdk = {
            getChatParams: () => { return chatParams; },
            isConnected: () => { return true; },
            logEventToDW: jest.fn()
        };

        const service = new PostChatSurveyService(sdk);
        const timestamp = Date.now();

        const expectedEndedEvent = {
            _domain: "automaton",
            evt: "ended",
            automatonType: "satisfactionSurvey",
            siteID: "SiteID",
            customerID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            pageID: "LaunchPageId",
            sessionID: "SessionID",
            chatID: "ChatId",
            preAssigned: false,
            automatonID: "AutomatonID",
            "automaton.outcomeType": "Refused",
            clientTimestamp: timestamp
        };

        service.closePostChatSurvey(automaton, timestamp);

        expect(sdk.logEventToDW).toHaveBeenCalledWith({eventList:[
            expectedEndedEvent
        ]});

    });
});
