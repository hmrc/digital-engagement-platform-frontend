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
import views.html.webchat.NonUkResidentLandlordsView

class NonUkResidentLandlordsViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[NonUkResidentLandlordsView]

  private def createView(isEntertainersRedirect: Boolean): () => HtmlFormat.Appendable = () => view(isEntertainersRedirect)(fakeRequest, messages)

  "NonUk Resident Landlords view" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/non-resident-landlords"

    behave like normalPage(
      createView(false),
      "Ask HMRC - Webchat",
      "Non-UK resident landlords: webchat",
      "Non-UK resident landlords: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq(
        "Opening times:",
        "Monday to Friday, 8:30am to 5pm",
        "Closed weekends and bank holidays."
      )
    )
  }

  "NonUk Resident Entertainers view" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/non-uk-resident-entertainers"

    behave like normalPage(
      createView(true),
      "Ask HMRC - Webchat",
      "Non-UK resident entertainers: webchat",
      "Non-UK resident entertainers: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq(
        "Opening times:",
        "Monday to Friday, 8:30am to 5pm",
        "Closed weekends and bank holidays."
      )
    )
  }

}