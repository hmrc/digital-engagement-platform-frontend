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

package views.html.pages.webchat.dav4

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ChatViewBehaviours
import views.html.webchat.dav4.DAv4BereavementView

class DAv4BereavementViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike {

  private val view = app.injector.instanceOf[DAv4BereavementView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Bereavement DAv4 webchat view" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-clearance-hub"

    behave like normalPage(
      createView,
      "National Clearance Hub webchat - Ask HMRC - GOV.UK",
      "Bereavement webchat",
      "contact HMRC",
      returnUrl,
       Some(Seq(
        "Opening times:",
        "24 hours a day, 7 days a week"
      )),
      Some(Seq("HMRC_CIAPI_Fixed_1")),
      None
    )
  }
}
  