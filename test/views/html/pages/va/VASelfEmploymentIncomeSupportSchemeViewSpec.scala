/*
 * Copyright 2022 HM Revenue & Customs
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

package views.html.pages.va

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ChatViewBehaviours
import views.html.va.VASelfEmploymentIncomeSupportSchemeView

class VASelfEmploymentIncomeSupportSchemeViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike {

  private val view = app.injector.instanceOf[VASelfEmploymentIncomeSupportSchemeView]
  private val selfEmploymentIncomeSupportSchemeUrl =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-with-the-self-employment-income-support-scheme"

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Customs Self Employment Income Support Scheme view" must {
    "behave like a normal page" when {
      "rendered" must {
        "have the correct banner title" in {
          val doc = asDocument(createView())
          val nav = doc.getElementsByClass("hmrc-header__service-name")
          val span = nav.first
          span.text mustBe messages("Ask HMRC’s digital assistant")
        }

        "display the correct browser title" in {
          val doc = asDocument(createView())
          assertEqualsMessage(doc, "title", "Use HMRC’s digital assistant")
        }

        "display the correct page title" in {
          val doc = asDocument(createView())
          doc.getElementsByTag("h1")
          assertPageTitleEqualsMessage(doc, "Use HMRC’s digital assistant")
        }
      }

      "display self employment income support scheme link" in {
        val doc = asDocument(createView())
        val a = doc.getElementById("self-employment-income-support-scheme-link")

        val href = a.attr("href")
        href mustBe selfEmploymentIncomeSupportSchemeUrl
      }
    }
  }
}