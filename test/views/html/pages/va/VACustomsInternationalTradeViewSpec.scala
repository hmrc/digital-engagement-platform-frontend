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

import views.html.pages.helpers.ChatViewBehaviours
import views.html.va.VACustomsInternationalTradeView
import play.twirl.api.HtmlFormat

class VACustomsInternationalTradeViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[VACustomsInternationalTradeView]
  private val eoriUrl = "https://www.gov.uk/eori"
  private val tariffLink = "https://www.gov.uk/trade-tariff"
  private val importsExportsGeneralEnquiries =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/customs-international-trade-and-excise-enquiries"

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Customs International Trade view" must {
    "behave like a normal page" when {
      "rendered" must {
        "have the correct banner title" in {
          val doc = asDocument(createView())
          val nav = doc.getElementsByClass("govuk-header__link--service-name")
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

      "display EORI link" in {
        val doc = asDocument(createView())
        val a = doc.getElementById("customs-internation-trade-eori-link")

        val href = a.attr("href")
        href mustBe eoriUrl
      }

      "display commodity codes, duty and VAT rates link" in {
        val doc = asDocument(createView())
        val a = doc.getElementById("customs-internation-trade-tariff-link")

        val href = a.attr("href")
        href mustBe tariffLink
      }

      "display imports and exports general enquiries link" in {
        val doc = asDocument(createView())
        val a = doc.getElementById("customs-general-enquiries-link")

        val href = a.attr("href")
        href mustBe importsExportsGeneralEnquiries
      }
    }
  }
}
