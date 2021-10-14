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
            automatonName: "AutomatonName",
            automatonOrigin: "richMedia"
        };

        const expectedContentSentToCustomerEvent = {
            _domain: "automaton",
            evt: "contentSentToCustomer",
            unique_node_id: "node_1",
            "custom.decisiontree.nodeID": "HMRC_PostChat_Guidance%20-%20Initial",
            "custom.decisiontree.questions": "Was%252520the%252520chatbot%252520useful%25253F%25252CWas%252520the%252520chatbot%252520your%252520first%252520contact%252520choice%25253F%25252CIf%252520you%252520had%252520not%252520used%252520chatbot%252520today%25252C%252520how%252520else%252520would%252520you%252520have%252520contacted%252520us%25253F",
            "custom.decisiontree.questionIDs": "q1%2Cq2%2Cq3",
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
            automatonName: "AutomatonName",
            automatonOrigin: "richMedia"
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
            "custom.decisiontree.questionIDs": "q1%2Cq2%2Cq3",
            "custom.decisiontree.questions": "Was%252520the%252520chatbot%252520useful%25253F%25252CWas%252520the%252520chatbot%252520your%252520first%252520contact%252520choice%25253F%25252CIf%252520you%252520had%252520not%252520used%252520chatbot%252520today%25252C%252520how%252520else%252520would%252520you%252520have%252520contacted%252520us%25253F",
            "custom.decisiontree.answers": "Yes%2CNo%2CPhone",
            "custom.decisiontree.answerIDs": "a1%2Ca2%2Ca3",
            "custom.decisiontree.answerTypes": "0%2C0%2C0",
            clientTimestamp: timestamp,
            automatonType:"satisfactionSurvey",
            automatonID: "AutomatonID",
            automatonName: "AutomatonName",
            automatonOrigin: "richMedia",
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
            automatonOrigin: "richMedia",
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
            clientTimestamp: timestamp,
            automatonOrigin: "richMedia"
        };

        service.closePostChatSurvey(automaton, timestamp);

        expect(sdk.logEventToDW).toHaveBeenCalledWith({eventList:[
            expectedEndedEvent
        ]});

    });
});
