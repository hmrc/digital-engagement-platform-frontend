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
import views.html.StampDutyView

class StampDutyViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[StampDutyView]

  "Stamp Duty Land Tax view" must {
    def createView: () => HtmlFormat.Appendable = () => view("landTax")(fakeRequest, messages)
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/stamp-duty-land-tax"

    behave like normalPage(
      createView,
      "Stamp Duty Land Tax: webchat",
      "Stamp Duty Land Tax: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq("Monday to Friday, 8:30am to 5pm")
    )
  }

  "Stamp Duty Reserve Tax view" must {
    def createView: () => HtmlFormat.Appendable = () => view("reserveTax")(fakeRequest, messages)
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/stamp-duty-reserve-tax"

    behave like normalPage(
      createView,
      "Stamp Duty Reserve Tax: webchat",
      "Stamp Duty Reserve Tax: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq("Monday to Friday, 8:30am to 5pm")
    )
  }

  "Stamp Duty Shares and LAnd Tax view" must {
    def createView: () => HtmlFormat.Appendable = () => view("sharesAndLand")(fakeRequest, messages)
    val returnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/stamp-duty-enquiries-shares-and-land"

    behave like normalPage(
      createView,
      "Stamp Duty shares and land: webchat",
      "Stamp Duty shares and land: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq("Monday to Friday, 8:30am to 5pm")
    )
  }
}