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

import play.api.mvc.Cookie
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.NationalClearanceHubView

class NationalClearanceHubViewSpec extends ChatViewBehaviours {
  implicit override val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view = app.injector.instanceOf[NationalClearanceHubView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

    "Non Uk Resident Employees view" must {
      val returnUrl: String =
        "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-clearance-hub"

      behave like normalPage(
        createView,
        "National Clearance Hub: webchat",
        "National Clearance Hub: webchat",
        "Return to Contact HMRC",
        returnUrl,
        "Opening times:",
        "24 hours a day, 7 days a week"
      )
    }
}