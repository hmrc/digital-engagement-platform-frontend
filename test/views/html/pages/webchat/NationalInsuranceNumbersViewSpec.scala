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

package views.html.pages.webchat

import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ChatViewBehaviours
import views.html.webchat.NationalInsuranceNumbersView

class NationalInsuranceNumbersViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[NationalInsuranceNumbersView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "National Insurance Numbers View" must {
    val returnUrl: String = "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-insurance-numbers"

    behave like normalPage(
      createView,
      "Ask HMRC - Webchat",
      "National Insurance: webchat",
      "National Insurance: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq(
        "Opening times:",
        "Monday to Friday, 8am to 7:30pm",
        "Saturday, 8am to 4pm",
        "Closed Sundays and bank holidays.",
        "If you need help with a National Insurance number application, you will need to contact the Department for Work and Pensions. It can take up to 16 weeks to get your National Insurance number after you have proven your identity.",
        "Find out more information about",
        "how to apply for a National Insurance number (opens in a new tab)."
      )
    )
  }
}