"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  'use strict'; // C2C button display types as expressed in the Nuance sample chat skin.
  // These should not be changed.

  var _c2cDisplayStateMessa;

  var OutOfHours = 'outofhours';
  var Ready = 'ready';
  var Busy = 'busy';
  var ChatActive = 'chatactive';

  var ClickToChatButtons = /*#__PURE__*/function () {
    function ClickToChatButtons(onClicked, displayStateMessages) {
      _classCallCheck(this, ClickToChatButtons);

      this.buttons = {};
      this.onClicked = onClicked;
      this.displayStateMessages = displayStateMessages;
    }

    _createClass(ClickToChatButtons, [{
      key: "addButton",
      value: function addButton(c2cObj, button) {
        this.buttons[c2cObj.c2cIdx] = button;

        this._updateButton(c2cObj, button);
      }
    }, {
      key: "updateC2CButtonsToInProgress",
      value: function updateC2CButtonsToInProgress() {
        for (var _i = 0, _Object$keys = Object.keys(this.buttons); _i < _Object$keys.length; _i++) {
          var c2cId = _Object$keys[_i];
          var c2cObj = {
            c2cIdx: c2cId,
            displayState: ChatActive,
            launchable: false
          };

          this._updateButton(c2cObj, this.buttons[c2cId]);
        }
      }
    }, {
      key: "_getDisplayStateText",
      value: function _getDisplayStateText(displayState) {
        return this.displayStateMessages[displayState] || "Unknown display state: " + displayState;
      }
    }, {
      key: "_updateButton",
      value: function _updateButton(c2cObj, button) {
        var buttonText = this._getDisplayStateText(c2cObj.displayState);

        var innerHTML = "<div class=\"".concat(button.buttonClass, " ").concat(c2cObj.displayState, "\">").concat(buttonText, "</div>");
        var div = button.replaceChild(innerHTML);

        if (c2cObj.launchable) {
          div.onclick = function () {
            console.log(this);
            this.onClicked(c2cObj.c2cIdx);
          }.bind(this);
        }
      }
    }]);

    return ClickToChatButtons;
  }();

  var ClickToChatButton = /*#__PURE__*/function () {
    function ClickToChatButton(parentElement, buttonClass) {
      _classCallCheck(this, ClickToChatButton);

      this.parentElement = parentElement;
      this.buttonClass = buttonClass;
    }

    _createClass(ClickToChatButton, [{
      key: "replaceChild",
      value: function replaceChild(innerHTML) {
        var buttonDiv = this.parentElement.ownerDocument.createElement("div");
        buttonDiv.setAttribute("class", "c2cButton");
        buttonDiv.innerHTML = innerHTML;
        this.parentElement.innerHTML = "";
        this.parentElement.appendChild(buttonDiv);
        return buttonDiv;
      }
    }]);

    return ClickToChatButton;
  }();

  var html = "\n    <div id=\"postChatSurvey\">\n        <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\" id=\"legend_give_feedback\" tabindex=\"-1\">\n          <h2 class=\"govuk-fieldset__heading\">Give feedback</h2>\n        </legend>\n\n        <p>Your feedback helps us improve our services. The survey takes about one minute and all of the questions are optional.</p>\n\n        <div class=\"govuk-grid-row\">\n            <div class=\"govuk-grid-column-two-thirds\">\n\n              <form>\n\n                <div class=\"govuk-form-group\">\n\n                  <fieldset class=\"govuk-fieldset\" id=\"question1\">\n                    <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--m\">\n                      <h2 class=\"govuk-fieldset__heading\">Was the chatbot useful?</h2>\n                    </legend>\n                    <div class=\"govuk-radios govuk-radios--inline\">\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q1-\" name=\"q1-\" type=\"radio\" value=\"yes\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"formItem-\">Yes</label>\n                      </div>\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q1--2\" name=\"q1-\" type=\"radio\" value=\"no\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"q1--2\">No</label>\n                      </div>\n                    </div>\n                  </fieldset>\n\n                  <fieldset class=\"govuk-fieldset\" id=\"question2\">\n                    <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--m\">\n                      <h2 class=\"govuk-fieldset__heading\">Was the chatbot your first contact choice?</h2>\n                    </legend>\n                    <div class=\"govuk-radios govuk-radios--inline\">\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q2-\" name=\"q2-\" type=\"radio\" value=\"yes\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"formItem-\">Yes</label>\n                      </div>\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q2--2\" name=\"q2-\" type=\"radio\" value=\"no\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"q2--2\">No</label>\n                      </div>\n                    </div>\n                  </fieldset>\n\n                  <fieldset class=\"govuk-fieldset\" id=\"question3\">\n                    <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--m\">\n                      <h2 class=\"govuk-fieldset__heading\">If you had not used chatbot today, how else would you have contacted us?</h2>\n                    </legend>\n                    <div class=\"govuk-radios\">\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q3-\" name=\"q3-\" type=\"radio\" value=\"phone\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"q3-\">Phone</label>\n                      </div>\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q3--2\" name=\"q3-\" type=\"radio\" value=\"webchat\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"q3--2\">Webchat</label>\n                      </div>\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q3--3\" name=\"q3-\" type=\"radio\" value=\"social media\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"q3--3\">Social media</label>\n                      </div>\n                      <div class=\"govuk-radios__item\">\n                        <input class=\"govuk-radios__input\" id=\"q3--4\" name=\"q3-\" type=\"radio\" value=\"other\">\n                        <label class=\"govuk-label govuk-radios__label\" for=\"q3--4\">Other</label>\n                      </div>\n                    </div>\n                  </fieldset>\n\n                </div>\n\n                <button id=\"submitPostChatSurvey\" class=\"govuk-button\">Submit</button>\n\n              </form>\n            </div>\n        </div>\n    </div>\n";

  var PostChatSurvey = /*#__PURE__*/function () {
    function PostChatSurvey(onSubmitted) {
      _classCallCheck(this, PostChatSurvey);

      this.onSubmitted = onSubmitted;
    }

    _createClass(PostChatSurvey, [{
      key: "attachTo",
      value: function attachTo(container) {
        var _this = this;

        this.container = container;
        this.wrapper = document.createElement("div");
        this.wrapper.id = "postChatSurveyWrapper";
        this.wrapper.insertAdjacentHTML("beforeend", html);
        container.appendChild(this.wrapper);
        this.wrapper.querySelector("#submitPostChatSurvey").addEventListener("click", function (e) {
          _this.onSubmitted(_this);
        });
      }
    }, {
      key: "detach",
      value: function detach() {
        this.container.removeChild(this.wrapper);
      }
    }]);

    return PostChatSurvey;
  }();

  var Transcript = /*#__PURE__*/function () {
    function Transcript(content, vaLinkCallback, classes) {
      _classCallCheck(this, Transcript);

      this.content = content;
      this.vaLinkCallback = vaLinkCallback;
      this.classes = classes;
    }

    _createClass(Transcript, [{
      key: "addAgentMsg",
      value: function addAgentMsg(msg, agent) {
        this._appendMessage(msg, this.classes.Agent);
      }
    }, {
      key: "addCustomerMsg",
      value: function addCustomerMsg(msg, agent) {
        this._appendMessage(msg, this.classes.Customer);
      }
    }, {
      key: "addSystemMsg",
      value: function addSystemMsg(msg) {
        this._appendMessage(msg, this.classes.System);
      }
    }, {
      key: "addOpenerScript",
      value: function addOpenerScript(msg) {
        this._appendMessage(msg, this.classes.Opener);
      }
    }, {
      key: "addSkipToBottomLink",
      value: function addSkipToBottomLink() {
        var chatContainer = document.getElementById("ciapiSkinChatTranscript");

        if (chatContainer.scrollHeight > chatContainer.clientHeight) {
          this.createSkipLink("skipToTopWithScroll");
        } else {
          this.createSkipLink("skipToTopWithOutScroll");
        }
      }
    }, {
      key: "createSkipLink",
      value: function createSkipLink(className) {
        var chatContainer = document.getElementById("ciapiSkinChatTranscript");
        chatContainer.insertAdjacentHTML("beforeend", '<div id="skipToTop" class="' + className + ' govuk-!-padding-top-2"><a id="skipToTopLink" href="#" class="govuk-skip-link">Skip to top of conversation</a></div>');
        document.getElementById("skipToTopLink").addEventListener("click", function (e) {
          e.preventDefault();
          document.getElementById("skipToBottomLink").focus();
        });
      }
    }, {
      key: "addAutomatonMsg",
      value: function addAutomatonMsg(msg) {
        var msgDiv = "<div class='".concat(this.classes.Agent.Inner, "'>").concat(msg, "</div>");
        var skipToTop = document.getElementById("skipToTop");
        var chatContainer = document.getElementById("ciapiSkinChatTranscript");
        var agentDiv = document.createElement("div");
        agentDiv.classList.add(this.classes.Agent.Outer);
        agentDiv.insertAdjacentHTML("beforeend", msgDiv);

        this._fixUpVALinks(agentDiv);

        this.content.appendChild(agentDiv);

        if (chatContainer) {
          if (skipToTop != null) {
            chatContainer.removeChild(skipToTop);
          }

          this.addSkipToBottomLink();
        }

        this._showLatestContent(this.classes.Agent);
      }
    }, {
      key: "_fixUpVALinks",
      value: function _fixUpVALinks(div) {
        var links = div.getElementsByTagName('a');

        var _iterator = _createForOfIteratorHelper(links),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var link = _step.value;

            var _iterator2 = _createForOfIteratorHelper(link.attributes),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var attribute = _step2.value;

                if (attribute.name === "data-vtz-link-type" && attribute.value === "Dialog") {
                  link.onclick = this.vaLinkCallback;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "_appendMessage",
      value: function _appendMessage(msg, msg_class) {
        var msgDiv = "<div class='".concat(msg_class.Outer, "'><div class='").concat(msg_class.Inner, "'>").concat(msg, "</div></div>");
        var skipToTop = document.getElementById("skipToTop");
        var chatContainer = document.getElementById("ciapiSkinChatTranscript");
        this.content.insertAdjacentHTML("beforeend", msgDiv);

        if (chatContainer) {
          if (skipToTop != null) {
            chatContainer.removeChild(skipToTop);
          }

          this.addSkipToBottomLink();
        }

        this._showLatestContent(msg_class);
      }
    }, {
      key: "_showLatestContent",
      value: function _showLatestContent(msg_class) {
        var agentInner = msg_class.Inner;
        var innerClassArray = document.getElementsByClassName(agentInner);
        var outerAgent = msg_class.Outer;
        var outerClassArray = document.getElementsByClassName(outerAgent);

        if (innerClassArray.length > 0 && outerClassArray.length > 0) {
          var lengthOfAgentInnerArray = innerClassArray.length - 1;
          var heightOfLastMessage = innerClassArray[lengthOfAgentInnerArray].clientHeight;
          var outerAgentParentId = outerClassArray[0].parentElement;
          var heightOfSkinChat = outerAgentParentId.clientHeight;

          if (typeof heightOfLastMessage !== 'undefined' && typeof heightOfSkinChat !== 'undefined') {
            if (heightOfLastMessage > heightOfSkinChat) {
              innerClassArray[lengthOfAgentInnerArray].scrollIntoView({
                block: 'nearest'
              });
            } else {
              this.content.scrollTo(0, this.content.scrollHeight);
            }
          } else {
            this.content.scrollTo(0, this.content.scrollHeight);
          }
        } else {
          this.content.scrollTo(0, this.content.scrollHeight);
        }
      }
    }]);

    return Transcript;
  }();

  var html$1 = "\n    <div id=\"endChatPopup\" role=\"dialog\" aria-modal=\"true\">\n      <h1 class=\"govuk-heading-xl\" id=\"heading_end_chat_popup\" tabindex=\"-1\">End chat?</h1>\n\n      <button id=\"confirmEndChat\" class=\"govuk-button\">\n              End chat\n            </button>\n\n      <button id=\"cancelEndChat\" class=\"govuk-button govuk-!-margin-right-1 govuk-button--secondary\">\n        Return to chat\n      </button>\n\n    </div>\n    <div id=\"popupOverlay\" class=\"backdrop\"></div>\n";

  var Popup = /*#__PURE__*/function () {
    function Popup(container, eventHandler) {
      var _this2 = this;

      _classCallCheck(this, Popup);

      this.container = container;
      this.eventHandler = eventHandler;
      this.wrapper = document.createElement("div");
      this.wrapper.id = "endChatPopupWrapper";
      this.hide();
      this.wrapper.insertAdjacentHTML("beforeend", html$1);
      container.appendChild(this.wrapper);
      this.wrapper.querySelector("#cancelEndChat").addEventListener("click", function (e) {
        return _this2.eventHandler.onCancelEndChat();
      });
      this.wrapper.querySelector("#confirmEndChat").addEventListener("click", function (e) {
        return _this2.eventHandler.onConfirmEndChat();
      });
    }

    _createClass(Popup, [{
      key: "show",
      value: function show() {
        this._setDisplay("block");
      }
    }, {
      key: "hide",
      value: function hide() {
        this._setDisplay("none");
      }
    }, {
      key: "_setDisplay",
      value: function _setDisplay(state) {
        this.wrapper.style.display = state;
      }
    }]);

    return Popup;
  }();

  var nullEventHandler = {
    onSend: function onSend() {},
    onCloseChat: function onCloseChat() {},
    onHideChat: function onHideChat() {},
    onRestoreChat: function onRestoreChat() {},
    onClickedVALink: function onClickedVALink(e) {},
    onConfirmEndChat: function onConfirmEndChat() {}
  };

  var ChatContainer = /*#__PURE__*/function () {
    function ChatContainer(messageClasses, containerHtml) {
      var _this3 = this;

      _classCallCheck(this, ChatContainer);

      this.container = document.createElement("div");
      this.container.id = "ciapiSkin";
      this.eventHandler = nullEventHandler;
      this.container.insertAdjacentHTML("beforeend", containerHtml);
      this.content = this.container.querySelector("#ciapiSkinChatTranscript");
      this.custInput = this.container.querySelector("#custMsg");
      this.transcript = new Transcript(this.content, function (e) {
        return _this3.eventHandler.onClickedVALink(e);
      }, messageClasses);

      this._registerEventListeners();

      this.endChatPopup = new Popup(this.container.querySelector("#ciapiSkinContainer"), this);
    }

    _createClass(ChatContainer, [{
      key: "element",
      value: function element() {
        return this.container;
      }
    }, {
      key: "contentElement",
      value: function contentElement() {
        return this.content;
      }
    }, {
      key: "currentInputText",
      value: function currentInputText() {
        return this.custInput.value;
      }
    }, {
      key: "clearCurrentInputText",
      value: function clearCurrentInputText() {
        this.custInput.value = "";
      }
    }, {
      key: "getTranscript",
      value: function getTranscript() {
        return this.transcript;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.container.parentElement.removeChild(this.container);
      }
    }, {
      key: "minimise",
      value: function minimise() {
        this.container.classList.add("minimised");
      }
    }, {
      key: "restore",
      value: function restore() {
        this.container.classList.remove("minimised");
      }
    }, {
      key: "setEventHandler",
      value: function setEventHandler(eventHandler) {
        this.eventHandler = eventHandler;
      }
    }, {
      key: "_registerEventListener",
      value: function _registerEventListener(selector, handler) {
        var element = this.container.querySelector(selector);

        if (element) {
          element.addEventListener("click", handler);
        }
      }
    }, {
      key: "_registerEventListeners",
      value: function _registerEventListeners() {
        var _this4 = this;

        this._registerEventListener("#ciapiSkinSendButton", function (e) {
          _this4.eventHandler.onSend();
        });

        this._registerEventListener("#ciapiSkinCloseButton", function (e) {
          var ciapiSkinContainer = document.querySelector("#ciapiSkin");
          var endChatNonFocusable = ciapiSkinContainer.querySelectorAll('a[href], input, textarea, button:not([id="cancelEndChat"]):not([id="confirmEndChat"]');
          endChatNonFocusable.forEach(function (element) {
            element.tabIndex = -1;
          });
          document.getElementById("ciapiSkinChatTranscript").setAttribute("tabindex", -1);

          _this4.eventHandler.onCloseChat();
        });

        this._registerEventListener("#ciapiSkinHideButton", function (e) {
          _this4.eventHandler.onHideChat();
        });

        this._registerEventListener("#skipToBottomLink", function (e) {
          _this4.eventHandler.onSkipToTopLink(e);
        });

        this._registerEventListener("#ciapiSkinRestoreButton", function (e) {
          _this4.eventHandler.onRestoreChat();
        });

        this.custInput.addEventListener('keypress', function (e) {
          if (e.which == 13) {
            _this4.eventHandler.onSend();

            e.preventDefault();
          }
        });
      }
    }, {
      key: "confirmEndChat",
      value: function confirmEndChat() {
        this.endChatPopup.show();
        document.getElementById("heading_end_chat_popup").focus();
      }
    }, {
      key: "onCancelEndChat",
      value: function onCancelEndChat() {
        var ciapiSkinContainer = document.querySelector("#ciapiSkin");
        var endChatNonFocusable = ciapiSkinContainer.querySelectorAll('a[href], input, textarea, button');
        endChatNonFocusable.forEach(function (element) {
          element.removeAttribute("tabindex");
        });
        document.getElementById("ciapiSkinChatTranscript").setAttribute("tabindex", 0);
        this.endChatPopup.hide();
        document.getElementById("ciapiSkinCloseButton").focus();
      }
    }, {
      key: "onConfirmEndChat",
      value: function onConfirmEndChat() {
        this.endChatPopup.hide();
        this.eventHandler.onConfirmEndChat();
        document.getElementById("legend_give_feedback").focus();
      }
    }, {
      key: "showPage",
      value: function showPage(page) {
        this.container.querySelector("#ciapiSkinChatTranscript").style.display = "none";
        this.container.querySelector("#ciapiSkinFooter").style.display = "none";
        page.attachTo(this.container.querySelector("#ciapiChatComponents"));
      }
    }]);

    return ChatContainer;
  }();

  var Agent = {
    Outer: 'ciapi-agent-container',
    Inner: 'ciapi-agent-message'
  };
  var Customer = {
    Outer: 'ciapi-customer-container',
    Inner: 'ciapi-customer-message'
  };
  var System = {
    Outer: 'ciapi-system-container',
    Inner: 'ciapi-system-message'
  };
  var Opener = {
    Outer: 'ciapi-agent-container',
    Inner: 'ciapi-agent-message'
  };
  var MessageClasses = Object.freeze({
    Agent: Agent,
    Customer: Customer,
    System: System,
    Opener: Opener
  });
  'use strict';

  var ContainerHtml = "\n<div id=\"ciapiSkinContainer\">\n    <div id=\"ciapiSkinHeader\">\n        <div id=\"print\">\n            <button class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n                Print or save\n            </button>\n        </div>\n        <div id=\"sound\">\n            <button class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n                Turn sound on\n            </button>\n        </div>\n    </div>\n    <div id=\"ciapiChatComponents\">\n        <div id=\"ciapiSkinChatTranscript\" role=\"log\" tabindex=\"0\">\n            <div id=\"skipToBottom\"><a id=\"skipToBottomLink\" href=\"#\" class=\"govuk-skip-link\">Skip to bottom of conversation</a></div>\n            <p class=\"info\"><img src=\"/ask-hmrc/assets/media/intro-warn.svg\" alt=\"\">You are currently chatting with a computer.</p>\n        </div>\n        <div id=\"ciapiSkinFooter\">\n            <div>\n                <div id=\"ciapiInput\"><textarea\n                    id=\"custMsg\"\n                    aria-label=\"Type your message here\"\n                    placeholder=\"Type your message here\"\n                    class=\"govuk-textarea\"\n                    cols=\"50\"\n                    name=\"comments\"></textarea>\n                </div>\n                <div id=\"ciapiSend\">\n                    <button id=\"ciapiSkinSendButton\" class=\"govuk-button\">Send</button>\n                </div>\n            </div>\n            <div id=\"ciapiClose\">\n                <button id=\"ciapiSkinCloseButton\" class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">End chat</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
  'use strict';

  var ContainerHtml$1 = "\n<div id=\"ciapiSkinContainer\">\n    <div id=\"ciapiSkinHeader\">\n        <div id=\"ciapiTitleBarLogo\"><img src='/ask-hmrc/assets/media/logo.png' alt=\"\"></div>\n        <div id=\"ciapiSkinTitleBar\"><h2 class=\"govuk-heading-s govuk-!-font-size-19\">Ask HMRC</h2></div>\n        <div id=\"hideCloseContainer\">\n            <button id=\"ciapiSkinHideButton\"  draggable=\"false\" role=\"button\" type=\"button\" aria-label=\"Minimise chat window\"></button>\n            <button id=\"ciapiSkinCloseButton\" draggable=\"false\" role=\"button\" type=\"button\" aria-label=\"Close chat window\"></button>\n        </div>\n    </div>\n    <div id=\"tools\">\n        <div id=\"print\">\n            <button class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n                Print or save\n            </button>\n        </div>\n        <div id=\"sound\">\n            <button class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n                Turn sound on\n            </button>\n        </div>\n    </div>\n    <div id=\"ciapiChatComponents\">\n        <div id=\"ciapiSkinChatTranscript\" role=\"log\" tabindex=\"0\">\n            <div id=\"skipToBottom\"><a id=\"skipToBottomLink\" href=\"#skipToTopLink\" class=\"govuk-skip-link\">Skip to bottom of conversation</a></div>\n            <p class=\"info\"><img src=\"/ask-hmrc/assets/media/intro-warn.svg\" alt=\"\">You are currently chatting with a computer.</p>\n        </div>\n        <div id=\"ciapiSkinFooter\">\n            <div id=\"ciapiInput\"><textarea\n                id=\"custMsg\"\n                class=\"govuk-textarea\"\n                aria-label=\"Type your message here\"\n                placeholder=\"Type your message here\"\n                rows=\"5\"\n                cols=\"50\"\n                name=\"comments\"></textarea></div>\n            <div id=\"ciapiSend\"><button\n                id=\"ciapiSkinSendButton\"\n                class=\"govuk-button\">Send</button></div>\n        </div>\n    </div>\n</div>\n<div id=\"ciapiSkinMinimised\">\n    <button id=\"ciapiSkinRestoreButton\" type=\"button\" draggable=\"false\" role=\"button\">\n        <div id=\"logo-white\"><img src=\"/ask-hmrc/assets/media/logo-white.png\" alt=\"\" aria-hidden=\"true\"></div>\n        <h2 class=\"govuk-heading-s govuk-!-font-size-19\">Ask HMRC a Question</h2>\n    </button>\n</div>\n"; // Message types as defined in the Nuance CI API documentation
  // These should not be changed.

  var Chat_AutomationRequest = 'chat.automaton_request';
  var Chat_Communication = 'chat.communication';
  var Chat_CommunicationQueue = 'chat.communication.queue';
  var Chat_Denied = 'chat.denied';
  var Chat_Exit = 'chat.exit';
  var Chat_System = 'chat.system';
  var Chat_TransferResponse = "chat.transfer_response";
  var ChatRoom_MemberConnected = "chatroom.member_connected";
  var ChatRoom_MemberLost = "chatroom.member_lost"; // State at start, before anything happens.

  var NullState = /*#__PURE__*/function () {
    function NullState() {
      _classCallCheck(this, NullState);
    }

    _createClass(NullState, [{
      key: "onSend",
      value: function onSend(text) {
        console.error("State Error: Trying to send text with no state.");
      }
    }, {
      key: "onClickedVALink",
      value: function onClickedVALink(text) {
        console.error("State Error: Trying to handle VA link with no state.");
      }
    }, {
      key: "onClickedClose",
      value: function onClickedClose() {
        console.error("State Error: Trying to close chat with no state.");
      }
    }]);

    return NullState;
  }(); // Chat skin shown, but not engaged yet.
  // First input from customer should engage chat.


  var ShownState = /*#__PURE__*/function () {
    function ShownState(engageRequest, closeChat) {
      _classCallCheck(this, ShownState);

      this.engageRequest = engageRequest;
      this.closeChat = closeChat;
    }

    _createClass(ShownState, [{
      key: "onSend",
      value: function onSend(text) {
        console.log(">>> not connected: engage request");
        this.engageRequest(text);
      }
    }, {
      key: "onClickedVALink",
      value: function onClickedVALink(e) {
        console.error("State Error: Trying to handle VA link before engaged.");
      }
    }, {
      key: "onClickedClose",
      value: function onClickedClose() {
        this.closeChat();
      }
    }]);

    return ShownState;
  }(); // Customer is engaged in a chat.


  var EngagedState = /*#__PURE__*/function () {
    function EngagedState(sdk, container, previousMessages, closeChat) {
      _classCallCheck(this, EngagedState);

      this.sdk = sdk;
      this.container = container;
      this.closeChat = closeChat;

      this._displayPreviousMessages(previousMessages);

      this._getMessages();
    }

    _createClass(EngagedState, [{
      key: "onSend",
      value: function onSend(text) {
        console.log(">>> connected: send message");
        this.sdk.sendMessage(text);
      }
    }, {
      key: "onClickedVALink",
      value: function onClickedVALink(e) {
        var _this5 = this;

        this.sdk.sendVALinkMessage(e, function () {
          return _this5._linkCallback;
        });
      }
    }, {
      key: "onClickedClose",
      value: function onClickedClose() {
        this.closeChat();
      }
    }, {
      key: "_displayPreviousMessages",
      value: function _displayPreviousMessages(messages) {
        var _iterator3 = _createForOfIteratorHelper(messages),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var message = _step3.value;

            this._displayMessage(message);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }, {
      key: "_getMessages",
      value: function _getMessages() {
        var _this6 = this;

        this.sdk.getMessages(function (msg_in) {
          return _this6._displayMessage(msg_in);
        });
      }
    }, {
      key: "_displayMessage",
      value: function _displayMessage(msg_in) {
        var msg = msg_in.data;
        console.log("---- Received message:", msg);
        var transcript = this.container.getTranscript();

        if (msg.messageType === Chat_Communication) {
          if (msg.agentID) {
            transcript.addAgentMsg(msg.messageText);
          } else {
            transcript.addCustomerMsg(msg.messageText);
          }
        } else if (msg.messageType === Chat_AutomationRequest) {
          transcript.addAutomatonMsg(msg["automaton.data"]);
        } else if (msg.messageType === Chat_Exit) {
          // This message may also have msg.state === "closed".
          // Not sure about transfer scenarios.
          transcript.addSystemMsg(msg["display.text"] || "Adviser exited chat");
        } else if (msg.state === "closed") {
          transcript.addSystemMsg("Agent Left Chat.");
        } else if (msg.messageType === Chat_CommunicationQueue) {
          transcript.addSystemMsg(msg.messageText);
        } else if (msg.messageType === Chat_Denied) {
          //            this.isConnected = false;
          transcript.addSystemMsg("No agents are available.");
        } else if ([Chat_System, Chat_TransferResponse, ChatRoom_MemberConnected, ChatRoom_MemberLost].includes(msg.messageType)) {
          transcript.addSystemMsg(msg["client.display.text"]);
        } else {
          console.log("==== Unknown message:", msg);
        }
      }
    }, {
      key: "_linkCallback",
      value: function _linkCallback(data) {// data seems to be the text clicked on.
        //        console.log("link callback: ", data);
      }
    }]);

    return EngagedState;
  }(); // In the process of closing (post-chat survey, etc.)


  var ClosingState = /*#__PURE__*/function () {
    function ClosingState(closeChat) {
      _classCallCheck(this, ClosingState);

      this.closeChat = closeChat;
    }

    _createClass(ClosingState, [{
      key: "onSend",
      value: function onSend(text) {
        console.error("State Error: Trying to send text when closing.");
      }
    }, {
      key: "onClickedVALink",
      value: function onClickedVALink(e) {
        console.error("State Error: Trying to handle VA link when closing.");
      }
    }, {
      key: "onClickedClose",
      value: function onClickedClose() {
        this.closeChat();
      }
    }]);

    return ClosingState;
  }();

  var PostChatSurveyService = /*#__PURE__*/function () {
    function PostChatSurveyService(sdk) {
      _classCallCheck(this, PostChatSurveyService);

      this.sdk = sdk;
    }

    _createClass(PostChatSurveyService, [{
      key: "beginPostChatSurvey",
      value: function beginPostChatSurvey(survey, automaton, timestamp) {
        var chatParams = this.sdk.getChatParams();
        var startedEvent = {
          _domain: "automaton",
          evt: "started",
          automatonType: "satisfactionSurvey",
          automatonStartedBy: "survey,survey",
          startedIn: "chat",
          type: "satisfactionSurvey",
          clientTimestamp: timestamp,
          chatID: chatParams.chatID,
          customerID: chatParams.thisCustomerID,
          agentID: chatParams.agentID,
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
          preAssigned: this.sdk.isConnected() && !chatParams.agentID,
          surveyId: Number(survey.id),
          automatonID: automaton.id,
          automatonName: automaton.name,
          automatonOrigin: "richMedia"
        };
        var contentSentToCustomerEvent = {
          _domain: "automaton",
          evt: "contentSentToCustomer",
          unique_node_id: "node_1",
          "custom.decisiontree.nodeID": encodeURIComponent("HMRC_PostChat_Guidance - Initial"),
          "custom.decisiontree.questions": escape(encodeURIComponent(survey.questions[0].text)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[1].text)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[2].text)),
          "custom.decisiontree.questionIDs": escape(encodeURIComponent(survey.questions[0].id)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[1].id)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[2].id)),
          clientTimestamp: timestamp,
          automatonType: "satisfactionSurvey",
          chatID: chatParams.chatID,
          customerID: chatParams.thisCustomerID,
          agentID: chatParams.agentID,
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
          preAssigned: this.sdk.isConnected() && !chatParams.agentID,
          surveyId: Number(survey.id),
          automatonID: automaton.id,
          automatonName: automaton.name,
          automatonOrigin: "richMedia"
        };
        console.log("===== beginPostChatSurvey =====");

        try {
          this.sdk.logEventToDW({
            eventList: [startedEvent, contentSentToCustomerEvent]
          });
        } catch (e) {
          console.error("!!!! logEventToDW got exception: ", e);
        }
      }
    }, {
      key: "submitPostChatSurvey",
      value: function submitPostChatSurvey(survey, automaton, timestamp) {
        var chatParams = this.sdk.getChatParams();
        var customerRespondedEvent = {
          _domain: "automaton",
          evt: "customerResponded",
          automatonType: "satisfactionSurvey",
          siteID: Number(chatParams.siteID),
          customerID: chatParams.thisCustomerID,
          incAssignmentID: chatParams.sessionID,
          pageID: Number(chatParams.launchPageId),
          sessionID: chatParams.sessionID,
          chatID: chatParams.chatID,
          agentID: chatParams.agentID,
          automatonName: automaton.name,
          custID: chatParams.thisCustomerID,
          preAssigned: this.sdk.isConnected() && !chatParams.agentID,
          automatonID: automaton.id,
          unique_node_id: "node_1",
          "custom.decisiontree.nodeID": encodeURIComponent("HMRC_PostChat_Guidance - Initial"),
          automatonAttributes: "",
          visitorAttributes: chatParams.getVisitorAttributes(),
          clientID: Number(chatParams.siteID),
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
          surveyId: Number(survey.id),
          "custom.decisiontree.questionIDs": escape(encodeURIComponent(survey.questions[0].id)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[1].id)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[2].id)),
          "custom.decisiontree.questions": escape(encodeURIComponent(survey.questions[0].text)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[1].text)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.questions[2].text)),
          "custom.decisiontree.answerIDs": escape(encodeURIComponent(survey.answers[0].text)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.answers[1].text)) + encodeURIComponent(",") + escape(encodeURIComponent(survey.answers[2].text)),
          "custom.decisiontree.answers": escape(encodeURIComponent(encodeURIComponent(survey.answers[0].text))) + encodeURIComponent(",") + escape(encodeURIComponent(encodeURIComponent(survey.answers[1].text))) + encodeURIComponent(",") + escape(encodeURIComponent(encodeURIComponent(survey.answers[2].text))),
          "custom.decisiontree.answerTypes": escape(encodeURIComponent("0")) + "," + escape(encodeURIComponent("0")) + "," + escape(encodeURIComponent("0")),
          clientTimestamp: timestamp,
          automatonOrigin: "richMedia"
        };
        var endedEvent = {
          _domain: "automaton",
          evt: "ended",
          automatonType: "satisfactionSurvey",
          siteID: Number(chatParams.siteID),
          customerID: chatParams.thisCustomerID,
          incAssignmentID: chatParams.sessionID,
          pageID: Number(chatParams.launchPageId),
          sessionID: chatParams.sessionID,
          chatID: chatParams.chatID,
          agentID: chatParams.agentID,
          automatonName: automaton.name,
          preAssigned: this.sdk.isConnected() && !chatParams.agentID,
          automatonID: automaton.id,
          custID: chatParams.thisCustomerID,
          visitorAttributes: chatParams.getVisitorAttributes(),
          automatonAttributes: "",
          clientID: Number(chatParams.siteID),
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
          surveyId: Number(survey.id),
          "automaton.outcomeType": "Completed",
          "automaton.outcome": "User has submitted postchat feedback.",
          clientTimestamp: timestamp,
          automatonOrigin: "richMedia"
        };
        console.log("===== submitPostChatSurvey =====");

        try {
          this.sdk.logEventToDW({
            eventList: [customerRespondedEvent, endedEvent]
          });
        } catch (e) {
          console.error("!!!! logEventToDW got exception: ", e);
        }
      }
    }, {
      key: "closePostChatSurvey",
      value: function closePostChatSurvey(automaton, timestamp) {
        var chatParams = this.sdk.getChatParams();
        var endedEvent = {
          _domain: "automaton",
          evt: "ended",
          automatonType: "satisfactionSurvey",
          siteID: Number(chatParams.siteID),
          customerID: chatParams.thisCustomerID,
          incAssignmentID: chatParams.sessionID,
          pageID: Number(chatParams.launchPageId),
          sessionID: chatParams.sessionID,
          chatID: chatParams.chatID,
          preAssigned: this.sdk.isConnected() && !chatParams.agentID,
          automatonID: automaton.id,
          "automaton.outcomeType": "Refused",
          clientTimestamp: timestamp,
          automatonOrigin: "richMedia"
        };
        console.log("===== closePostChatSurvey =====");

        try {
          this.sdk.logEventToDW({
            eventList: [endedEvent]
          });
        } catch (e) {
          console.error("!!!! logEventToDW got exception: ", e);
        }
      }
    }]);

    return PostChatSurveyService;
  }();

  var html$2 = "\n<div id=\"endPage\">\n    <div class=\"govuk-panel govuk-panel--confirmation\" style=\"margin-right:0.8em;\">\n        <h1 class=\"govuk-panel__title\" id=\"heading_chat_ended\" tabindex=\"-1\">\n            Chat ended\n        </h1>\n    </div>\n\n    <p id=\"endpage-thanks\" class=\"govuk-body\">Thank you for your feedback.</p>\n\n    <div onclick=\"window.print();\">\n        <p><a href=\"#\" class=\"govuk-link\">Print or save a copy of this chat</a></p>\n    </div>\n\n</div>\n";

  var PostPCSPage = /*#__PURE__*/function () {
    function PostPCSPage(showThanks) {
      _classCallCheck(this, PostPCSPage);

      this.showThanks = showThanks;
    }

    _createClass(PostPCSPage, [{
      key: "attachTo",
      value: function attachTo(container) {
        this.container = container;
        this.wrapper = document.createElement("div");
        this.wrapper.id = "postPCSPageWrapper";
        this.wrapper.insertAdjacentHTML("beforeend", html$2);

        if (!this.showThanks) {
          this.wrapper.querySelector('#endpage-thanks').style.display = 'none';
        }

        container.appendChild(this.wrapper);
      }
    }, {
      key: "detach",
      value: function detach() {
        this.container.removeChild(this.wrapper);
      }
    }]);

    return PostPCSPage;
  }();

  var automaton = {
    id: "survey-13000303",
    name: "HMRC_PostChat_Transactional-CUI"
  };
  var timestamp = Date.now();
  var survey = {
    id: "13000303",
    questions: [{
      id: ["question1"],
      text: "Was the chatbot useful?",
      freeform: false
    }, {
      id: ["question2"],
      text: "Was the chatbot your first contact choice?",
      freeform: false
    }, {
      id: ["question3"],
      text: "If you had not used chatbot today, how else would you have contacted us?",
      freeform: false
    }]
  };

  function getRadioValue(radioGroup) {
    var elements = document.getElementsByName(radioGroup);

    for (var i = 0, l = elements.length; i < l; i++) {
      if (elements[i].checked) {
        return elements[i].value;
      }
    }
  }

  function getRadioId(radioGroup) {
    var elements = document.getElementsByName(radioGroup);

    for (var i = 0, l = elements.length; i < l; i++) {
      // @ts-ignore
      if (elements[i].checked) {
        return elements[i].id;
      }
    }
  }

  var CommonChatController = /*#__PURE__*/function () {
    function CommonChatController() {
      _classCallCheck(this, CommonChatController);

      this.sdk = null;
      this.state = new NullState();
      this.minimised = false;
    }

    _createClass(CommonChatController, [{
      key: "_launchChat",
      value: function _launchChat() {
        var _this7 = this;

        // TODO: Do we need this any more, now that the above timeout is gone?
        if (this.container) {
          console.error("This should never happen. If it doesn't, then remove this 'if'");
          return;
        }

        try {
          //            console.log("in launchChat: ", this);
          this._showChat();

          this._displayOpenerScripts(window);

          console.log("===== chatDisplayed =====");
          this.sdk.chatDisplayed({
            "customerName": "You",
            "previousMessagesCb": function previousMessagesCb(resp) {
              return _this7._moveToChatEngagedState(resp.messages);
            },
            "disconnectCb": function disconnectCb() {
              return console.log("%%%%%% disconnected %%%%%%");
            },
            "reConnectCb": function reConnectCb() {
              return console.log("%%%%%% reconnected %%%%%%");
            },
            "failedCb": function failedCb() {
              return console.log("%%%%%% failed %%%%%%");
            },
            "openerScripts": null,
            "defaultAgentAlias": "HMRC"
          });
        } catch (e) {
          console.error("!!!! launchChat got exception: ", e);
        }
      }
    }, {
      key: "_showChat",
      value: function _showChat() {
        var embeddedDiv = this._getEmbeddedDiv();

        var fixedPopupDiv = this._getFixedPopupDiv();

        var anchoredPopupDiv = this._getAnchoredPopupDiv();

        try {
          if (embeddedDiv) {
            this.container = new ChatContainer(MessageClasses, ContainerHtml);
            embeddedDiv.appendChild(this.container.element());
          } else if (fixedPopupDiv) {
            this.container = new ChatContainer(MessageClasses, ContainerHtml$1);
            fixedPopupDiv.appendChild(this.container.element());
          } else if (anchoredPopupDiv && !fixedPopupDiv) {
            this.container = new ChatContainer(MessageClasses, ContainerHtml$1);
            anchoredPopupDiv.appendChild(this.container.element());
          } else {
            this.container = new ChatContainer(MessageClasses, ContainerHtml$1);
            document.getElementsByTagName("body")[0].appendChild(this.container.element());
          }

          this.container.setEventHandler(this);

          this._moveToChatShownState();
        } catch (e) {
          console.error("!!!! _showChat got exception: ", e);
        }
      }
    }, {
      key: "_displayOpenerScripts",
      value: function _displayOpenerScripts(w) {
        var _this8 = this;

        this.sdk = w.Inq.SDK;
        this.sdk.getOpenerScripts(function (openerScripts) {
          if (openerScripts == null) return;

          var _iterator4 = _createForOfIteratorHelper(openerScripts),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var openerScript = _step4.value;

              _this8.container.getTranscript().addOpenerScript(openerScript);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        });
      }
    }, {
      key: "_moveToChatEngagedState",
      value: function _moveToChatEngagedState() {
        var _this9 = this;

        var previousMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this._moveToState(new EngagedState(this.sdk, this.container, previousMessages, function () {
          return _this9.container.confirmEndChat();
        }));
      }
    }, {
      key: "_moveToState",
      value: function _moveToState(state) {
        // Clean up previous state?
        this.state = state;
      }
    }, {
      key: "_getEmbeddedDiv",
      value: function _getEmbeddedDiv() {
        return document.getElementById("HMRC_CIAPI_Embedded_1");
      }
    }, {
      key: "_getFixedPopupDiv",
      value: function _getFixedPopupDiv() {
        return document.getElementById("HMRC_CIAPI_Fixed_1");
      }
    }, {
      key: "_getAnchoredPopupDiv",
      value: function _getAnchoredPopupDiv() {
        return document.getElementById("HMRC_CIAPI_Anchored_1");
      }
    }, {
      key: "_moveToChatShownState",
      value: function _moveToChatShownState() {
        var _this10 = this;

        this._moveToState(new ShownState(function (text) {
          return _this10._engageChat(text);
        }, function () {
          return _this10.closeChat();
        }));

        this.minimised = false;
      }
    }, {
      key: "_engageChat",
      value: function _engageChat(text) {
        var _this11 = this;

        this.sdk.engageChat(text, function (resp) {
          console.log("++++ ENGAGED ++++ ->", resp);

          if (resp.httpStatus == 200) {
            _this11._moveToChatEngagedState();
          }
        });
      }
    }, {
      key: "closeChat",
      value: function closeChat() {
        if (document.body.contains(document.getElementById("postChatSurveyWrapper"))) {
          this._sendPostChatSurvey(this.sdk).closePostChatSurvey(automaton, timestamp);
        }

        this.closeNuanceChat();

        if (this._getEmbeddedDiv()) {
          // Embedded view never dies.
          this.showEndChatPage(false);
        } else {
          this.container.destroy();
          this.container = null;
        }

        this._moveToChatNullState();
      } // End event handler method

    }, {
      key: "_sendPostChatSurvey",
      value: function _sendPostChatSurvey(sdk) {
        return new PostChatSurveyService(sdk);
      }
    }, {
      key: "onSkipToTopLink",
      value: function onSkipToTopLink(e) {
        e.preventDefault();
        document.getElementById("skipToTopLink").focus();
      }
    }, {
      key: "closeNuanceChat",
      value: function closeNuanceChat() {
        if (this.sdk.isChatInProgress()) {
          this.sdk.closeChat();
        }
      }
    }, {
      key: "showEndChatPage",
      value: function showEndChatPage(showThanks) {
        this.container.showPage(new PostPCSPage(showThanks));
        this.closeNuanceChat();
      }
    }, {
      key: "_moveToChatNullState",
      value: function _moveToChatNullState() {
        this._moveToState(new NullState());
      }
    }, {
      key: "nuanceFrameworkLoaded",
      value: function nuanceFrameworkLoaded(w) {
        console.log("### framework loaded");
        this.sdk = w.Inq.SDK;

        if (this.sdk.isChatInProgress()) {
          console.log("************************************");
          console.log("******* chat is in progress ********");
          console.log("************************************"); //            setTimeout(() => this._launchChat(), 2000);
        }
      }
    }, {
      key: "_moveToClosingState",
      value: function _moveToClosingState() {
        var _this12 = this;

        this._moveToState(new ClosingState(function () {
          return _this12.closeChat();
        }));
      } // Begin event handler methods

    }, {
      key: "onSend",
      value: function onSend() {
        var text = this.container.currentInputText().trim();
        this.container.clearCurrentInputText();
        if (text !== "") this.state.onSend(text);
      }
    }, {
      key: "onCloseChat",
      value: function onCloseChat() {
        this.state.onClickedClose();
      }
    }, {
      key: "onHideChat",
      value: function onHideChat() {
        if (!this.minimised) {
          this.container.minimise();
          this.sdk.sendActivityMessage("minimize");
          this.minimised = true;
        }
      }
    }, {
      key: "onRestoreChat",
      value: function onRestoreChat() {
        if (this.minimised) {
          this.container.restore();
          this.sdk.sendActivityMessage("restore");
          this.minimised = false;
        }
      }
    }, {
      key: "onClickedVALink",
      value: function onClickedVALink(e) {
        this.state.onClickedVALink(e);
      }
    }, {
      key: "onConfirmEndChat",
      value: function onConfirmEndChat() {
        var _this13 = this;

        this._moveToClosingState();

        this._sendPostChatSurvey(this.sdk).beginPostChatSurvey(survey, automaton, timestamp);

        this.container.showPage(new PostChatSurvey(function (page) {
          return _this13.onPostChatSurveySubmitted(page);
        }));
      }
    }, {
      key: "onPostChatSurveySubmitted",
      value: function onPostChatSurveySubmitted(surveyPage) {
        var answers = {
          answers: [{
            id: getRadioId("q1-"),
            text: getRadioValue("q1-"),
            freeform: false
          }, {
            id: getRadioId("q2-"),
            text: getRadioValue("q2-"),
            freeform: false
          }, {
            id: getRadioId("q3-"),
            text: getRadioValue("q3-"),
            freeform: false
          }]
        };
        var surveyWithAnswers = Object.assign(answers, survey);

        this._sendPostChatSurvey(this.sdk).submitPostChatSurvey(surveyWithAnswers, automaton, timestamp);

        surveyPage.detach();
        this.showEndChatPage(true);
      }
    }]);

    return CommonChatController;
  }();

  var c2cDisplayStateMessages = (_c2cDisplayStateMessa = {}, _defineProperty(_c2cDisplayStateMessa, OutOfHours, "Out of hours"), _defineProperty(_c2cDisplayStateMessa, Ready, "Ask HMRC a question"), _defineProperty(_c2cDisplayStateMessa, Busy, "All advisers are busy"), _defineProperty(_c2cDisplayStateMessa, ChatActive, "In progress"), _c2cDisplayStateMessa);

  var ReactiveChatController = /*#__PURE__*/function () {
    function ReactiveChatController() {
      var _this14 = this;

      _classCallCheck(this, ReactiveChatController);

      this.sdk = null;
      this.c2cButtons = new ClickToChatButtons(function (c2cIdx) {
        return _this14._onC2CButtonClicked(c2cIdx);
      }, c2cDisplayStateMessages);
      this.commonChatController = new CommonChatController();
    }

    _createClass(ReactiveChatController, [{
      key: "addC2CButton",
      value: function addC2CButton(c2cObj, divID, buttonClass) {
        this.c2cButtons.addButton(c2cObj, new ClickToChatButton(document.getElementById(divID), buttonClass));
      }
    }, {
      key: "_onC2CButtonClicked",
      value: function _onC2CButtonClicked(c2cIdx) {
        var _this15 = this;

        this.sdk.onC2CClicked(c2cIdx, function (state) {
          console.log("onC2CClicked callback:");
          console.log(state);

          _this15.commonChatController._launchChat();
        });
      }
    }]);

    return ReactiveChatController;
  }();

  var ProactiveChatController = /*#__PURE__*/function () {
    function ProactiveChatController() {
      _classCallCheck(this, ProactiveChatController);

      this.commonChatController = new CommonChatController();
    }

    _createClass(ProactiveChatController, [{
      key: "launchProactiveChat",
      value: function launchProactiveChat() {
        this.commonChatController._launchChat();
      }
    }]);

    return ProactiveChatController;
  }();

  function safeHandler(f, helpful_name) {
    return function () {
      try {
        f.apply(null, arguments);
      } catch (e) {
        console.error("!!!! handler for ".concat(f.name, ": got exception "), e);
      }
    };
  }

  var chatListener = {
    //    onAnyEvent: function(evt) {
    //        console.log("Chat any event:", evt);
    //    },
    onC2CStateChanged: function onC2CStateChanged(evt) {
      console.log("C2C state changed..."); //        chatController.updateC2CButtonsToInProgress();
    }
  };

  function hookWindow(w) {
    var commonChatController = new CommonChatController();
    var reactiveChatController = new ReactiveChatController();
    var proactiveChatController = new ProactiveChatController();
    w.InqRegistry = {
      listeners: [chatListener]
    };
    w.nuanceFrameworkLoaded = safeHandler(function nuanceFrameworkLoaded() {
      commonChatController.nuanceFrameworkLoaded(w);
    });
    w.nuanceReactive_HMRC_CIAPI_Fixed_1 = safeHandler(function nuanceReactive_HMRC_CIAPI_Fixed_1(c2cObj) {
      reactiveChatController.addC2CButton(c2cObj, "HMRC_CIAPI_Fixed_1", "fixed");
    });
    w.nuanceReactive_HMRC_CIAPI_Anchored_1 = safeHandler(function nuanceReactive_HMRC_CIAPI_Anchored_1(c2cObj) {
      reactiveChatController.addC2CButton(c2cObj, "HMRC_CIAPI_Anchored_1", "anchored");
    });
    w.nuanceProactive = safeHandler(function nuanceProactive(obj) {
      console.log("### PROACTIVE", obj);
      proactiveChatController.launchProactiveChat();
    });
  }

  hookWindow(window);
})();