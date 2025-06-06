/*
 * Copyright 2023 HM Revenue & Customs
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
import views.html.webchat.PersonalTransportUnitEnquiriesView

class PersonalTransportUnitEnquiriesViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike {

  private val view = app.injector.instanceOf[PersonalTransportUnitEnquiriesView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Additional Needs Help view" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/personal-transport-unit-enquiries"

    behave like normalPage(
      createView,
      "Personal Transport Unit webchat - Ask HMRC - GOV.UK",
      "Personal Transport Unit webchat",
      "Return to Contact HMRC",
      returnUrl,
      Some(Seq(
        "Opening times:",
        "Monday to Friday, 8:30am to 5pm",
        "Closed weekends and bank holidays."
      )),
      None,
      None
    )
  }
}