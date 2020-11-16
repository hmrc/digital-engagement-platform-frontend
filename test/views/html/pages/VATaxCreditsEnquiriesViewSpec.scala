/*
 * Copyright 2020 HM Revenue & Customs
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
import views.html.VATaxCreditsEnquiriesView

class VATaxCreditsEnquiriesViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[VATaxCreditsEnquiriesView]
  private val taxCreditsEnquiriesUrl1: String = "https://www.gov.uk/manage-your-tax-credits"
  private val taxCreditsEnquiriesUrl2: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/tax-credits-enquiries"

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "VA Tax credits enquiries view" must {
    "behave like a normal page" when {
      "rendered" must {

        "have the correct banner title" in {
          val doc = asDocument(createView())
          val nav = doc.getElementById("proposition-menu")
          val span = nav.children.first
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

      "display coronavirus general information link" in {
        val doc = asDocument(createView())
        val a = doc.getElementById("tax-credits-enquiries-general-info-link")

        val href = a.attr("href")
        href mustBe taxCreditsEnquiriesUrl1
      }


      "display coronavirus helpline link" in {
        val doc = asDocument(createView())
        val a = doc.getElementById("tax-credits-enquiries-contact-link")
        val href = a.attr("href")
        href mustBe taxCreditsEnquiriesUrl2
      }
    }
  }
}