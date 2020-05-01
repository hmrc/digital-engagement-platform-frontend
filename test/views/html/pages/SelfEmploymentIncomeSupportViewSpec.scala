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
import views.html.SelfEmploymentIncomeSupportView

class SelfEmploymentIncomeSupportViewSpec extends ChatViewBehaviours {

  implicit override val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view = app.injector.instanceOf[SelfEmploymentIncomeSupportView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Self Employment Income Support view" must {
    val returnUrl: String = "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-with-the-self-employment-income-support-scheme"

    behave like normalPage(
      createView,
      "Coronavirus (COVID-19): Self-employment Income Support Scheme",
      "Coronavirus (COVID-19): Self-employment Income Support Scheme",
      "Return to Contact HMRC",
      returnUrl,
      "Opening times:",
      "Monday to Thursday, 8am to 8pm",
      "Friday (8th May Bank Holiday), 8am to 4pm",
      "Saturday (9th and 16th), 8am to 4pm"
    )
  }
}