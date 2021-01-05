/*
 * Copyright 2021 HM Revenue & Customs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package views.html.pages

import play.twirl.api.HtmlFormat
import views.html.AccessibilityStatementView
import views.html.pages.helpers.ChatViewBehaviours

class AccessibilityStatementViewSpec extends ChatViewBehaviours {
  private val view = app.injector.instanceOf[AccessibilityStatementView]
  private val userAction: String = "%2Fask-hmrc%2Fwebchat%2Fconstruction-industry-scheme-enquiries"
  private val serviceIdentifier = "digital-engagement-platform-frontend"
  private val pageUri: String = s"https://www.tax.service.gov.uk/contact/accessibility-unauthenticated?service=$serviceIdentifier&userAction=$userAction"

  private def createView: () => HtmlFormat.Appendable = () => view(pageUri)(fakeRequest, messages)

  "Accessibility Statement page" when {
    "rendered" must {
      "have the correct banner title" in {
        val doc = asDocument(createView())
        val nav = doc.getElementById("proposition-menu")
        val span = nav.children.first
        span.text mustBe messages("Ask HMRC - Webchat")
      }

      "display the correct browser title" in {
        val doc = asDocument(createView())
        assertEqualsMessage(doc, "title", s"Accessibility statement for webchat and digital assistant")
      }

      "display the correct page title" in {
        val doc = asDocument(createView())
        doc.getElementsByTag("h1")
        assertPageTitleEqualsMessage(doc, s"Accessibility statement for webchat and digital assistant")
      }
    }
  }
}