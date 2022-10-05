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

package views.html.pages.CUIViews

import org.scalatest.{Matchers, WordSpecLike}
import play.twirl.api.HtmlFormat
import views.html.CUIViews.EmployerEnquiriesCUIDAv2View
import views.html.pages.helpers.ChatViewBehaviours

class EmployerEnquiriesCUIViewSpec extends ChatViewBehaviours with Matchers with WordSpecLike {

  private val view = app.injector.instanceOf[EmployerEnquiriesCUIDAv2View]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Employer enquiries CUI View" should {
    "rendered" should {
      behave like normalCuiPage(
        createView,
        "Ask HMRC",
        "Employers enquiries: chat - Ask HMRC - GOV.UK",
        "Employers enquiries: chat"
      )
    }
  }
}
