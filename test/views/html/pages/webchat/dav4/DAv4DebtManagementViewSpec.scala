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
import views.html.webchat.dav4.DAv4DebtManagementView

class DAv4DebtManagementViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike {

  private val view = app.injector.instanceOf[DAv4DebtManagementView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

 "Debt Management DAv4 webchat view" must {

    behave like normalPage(
      createView,
      "Payment Plan: webchat - Ask HMRC - GOV.UK",
      "Payment Plan: webchat",
      "",
      "",
       Some(Seq(
        "Opening times:",
        "Monday to Friday, 8am to 6pm",
        "Closed weekends and bank holidays."
      )),
      Some(Seq("HMRC_CIAPI_Fixed_1")),
      None
    )
  }
}