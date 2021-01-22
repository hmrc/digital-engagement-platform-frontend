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
import views.html.webchat.AdditionalNeedsHelpView

class AdditionalNeedsHelpViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[AdditionalNeedsHelpView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Additional Needs Help view" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-from-hmrc-s-extra-support-team"

    behave like normalPage(
      createView,
      "Ask HMRC - Webchat",
      "HMRC’s Extra Support team: webchat",
      "HMRC’s Extra Support team: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq(
        "Opening times:",
        "Monday to Friday, 8am to 8pm",
        "We will be extending our opening hours on these days:",
        "Saturday 30 January 2021, 8am to 8pm",
        "Sunday 31 January 2021, 8am to 8pm"
      )
    )
  }
}