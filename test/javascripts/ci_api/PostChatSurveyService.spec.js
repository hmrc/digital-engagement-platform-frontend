import PostChatSurveyService from '../../../app/assets/javascripts/ci_api/PostChatSurveyService'

const chatParams = {
    agId: "AgId",
    agentID: "AgentId",
    agentAttributes: "AgentAttributes",
    browserType: "BrowserType",
    browserVersion: "BrowserVersion",
    brID: 123456,
    businessUnitID: "BusinessUnitID",
    chatTitle: "ChatTitle",
    countryCode: "CountryCode",
    deviceType: "DeviceType",
    chatID: "ChatID",
    getVisitorAttributes: () => { return "VisitorAttributes"; },
    launchPageId: 123458,
    operatingSystemType: "OperatingSystemType",
    regionCode: "RegionCode",
    ruleAttributes: "RuleAttributes",
    sessionID: "SessionID",
    siteID: 123459,
    thisCustomerID: "ThisCustomerID",
};

const survey = {
    id: 123456,
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
            automatonStartedBy: "survey,survey",
            startedIn: "chat",
            type: "satisfactionSurvey",
            clientTimestamp: timestamp,
            chatID: "ChatID",
            customerID: "ThisCustomerID",
            agentID: "AgentId",
            custID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            sessionID: "SessionID",
            visitorAttributes: "VisitorAttributes",
            automatonAttributes: "",
            siteID: 123459,
            clientID: 123459,
            pageID: 123458,
            businessUnitID: "BusinessUnitID",
            businessRuleID: 123456,
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
            preAssigned: false,
            surveyId: 123456,
            automatonID: "AutomatonID",
            automatonName: "AutomatonName"
        };

        const expectedContentSentToCustomerEvent = {
            _domain: "automaton",
            evt: "contentSentToCustomer",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance%20-%20Initial",
            "custom.decisiontree.questions": "0.Was%20the%20chatbot%20useful?,1.Was%20the%20chatbot%20your%20first%20contact%20choice?,2.If%20you%20had%20not%20used%20chatbot%20today,%20how%20else%20would%20you%20have%20contacted%20us?",
            "custom.decisiontree.questionIDs": "0.q1,1.q2,2.q3",
            clientTimestamp: timestamp,
            automatonType: "satisfactionSurvey",
            chatID: "ChatID",
            customerID: "ThisCustomerID",
            agentID: "AgentId",
            custID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            sessionID: "SessionID",
            visitorAttributes: "VisitorAttributes",
            automatonAttributes: "",
            siteID: 123459,
            clientID: 123459,
            pageID: 123458,
            businessUnitID: "BusinessUnitID",
            businessRuleID: 123456,
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
            preAssigned: false,
            surveyId: 123456,
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
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance%20-%20Initial",
            "custom.decisiontree.questionIDs": "0.q1,1.q2,2.q3",
            "custom.decisiontree.questions": "0.Was%20the%20chatbot%20useful?,1.Was%20the%20chatbot%20your%20first%20contact%20choice?,2.If%20you%20had%20not%20used%20chatbot%20today,%20how%20else%20would%20you%20have%20contacted%20us?",
            "custom.decisiontree.answers": "0.Yes,1.No,2.Phone",
            "custom.decisiontree.answerIDs": "0.a1,1.a2,2.a3",
            "custom.decisiontree.answerTypes": "0,0,0",
            clientTimestamp: timestamp,
            automatonType:"satisfactionSurvey",
            automatonID: "AutomatonID",
            automatonName: "AutomatonName",
            chatID: "ChatID",
            customerID: "ThisCustomerID",
            agentID: "AgentId",
            custID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            sessionID: "SessionID",
            visitorAttributes: "VisitorAttributes",
            automatonAttributes: "",
            siteID: 123459,
            clientID: 123459,
            pageID: 123458,
            businessUnitID: "BusinessUnitID",
            businessRuleID: 123456,
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
            preAssigned: false,
            surveyId: 123456
        };

        const expectedEndedEvent = {
            _domain: "automaton",
            evt: "ended",
            automatonType: "satisfactionSurvey",
            "automaton.outcomeType": "Completed",
            clientTimestamp: timestamp,
            "automaton.outcome": "User has submitted postchat feedback.",
            automatonID: "AutomatonID",
            automatonName: "AutomatonName",
            chatID: "ChatID",
            customerID: "ThisCustomerID",
            agentID: "AgentId",
            custID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            sessionID: "SessionID",
            visitorAttributes: "VisitorAttributes",
            automatonAttributes: "",
            siteID: 123459,
            clientID: 123459,
            pageID: 123458,
            businessUnitID: "BusinessUnitID",
            businessRuleID: 123456,
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
            preAssigned: false,
            surveyId: 123456
        };

        service.submitPostChatSurvey(survey, automaton, timestamp);

        expect(sdk.logEventToDW).toHaveBeenCalledWith({eventList:[
            expectedCustomerRespondedEvent,
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
            siteID: 123459,
            customerID: "ThisCustomerID",
            incAssignmentID: "SessionID",
            pageID: 123458,
            sessionID: "SessionID",
            chatID: "ChatID",
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
