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

import org.scalatest.{Matchers, WordSpecLike}
import play.api.mvc.{AnyContentAsEmpty, Cookie}
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ChatViewBehaviours
import views.html.webchat.EmployingExpatriateEmployeesView

class EmployingExpatriateEmployeesViewSpec extends ChatViewBehaviours with Matchers with WordSpecLike {
  implicit override val fakeRequest: FakeRequest[AnyContentAsEmpty.type] = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view: EmployingExpatriateEmployeesView = app.injector.instanceOf[EmployingExpatriateEmployeesView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Employing expatriate employees view" should {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/enquiries-from-employers-with-expatriate-employees"

    behave like normalPage(
      createView,
      "Ask HMRC",
      "Employing expatriate employees: webchat - GOV.UK",
      "Employing expatriate employees: webchat",
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
