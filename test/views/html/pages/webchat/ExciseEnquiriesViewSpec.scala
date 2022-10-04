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

package views.html.pages.webchat

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ChatViewBehaviours
import views.html.webchat.ExciseEnquiriesView

class ExciseEnquiriesViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike {

  private val view = app.injector.instanceOf[ExciseEnquiriesView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Excise Enquiries View" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/excise-enquiries"

    behave like normalPage(
      createView,
      "Ask HMRC",
      "Excise: webchat - GOV.UK",
      "Excise: webchat",
      "Return to Contact HMRC",
      returnUrl,
      Seq(
        "Opening times:",
        "Monday to Friday, 8am to 6pm",
        "Closed weekends and bank holidays."
      )
    )
  }
}