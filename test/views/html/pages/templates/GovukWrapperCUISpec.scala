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

package views.html.pages.templates

import org.scalatest.{Matchers, WordSpecLike}
import play.api.mvc.{AnyContentAsEmpty, Cookie}
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.CUIViews.SelfAssessmentCUIDAv2View
import views.html.pages.helpers.ChatViewBehaviours

class GovukWrapperCUISpec extends ChatViewBehaviours with Matchers with WordSpecLike {

  implicit override val fakeRequest: FakeRequest[AnyContentAsEmpty.type] = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view: SelfAssessmentCUIDAv2View = app.injector.instanceOf[SelfAssessmentCUIDAv2View]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "GovukWrapperCUI" must {
    behave like generalContentCUI(
      createView,
      "Self Assessment: chat",
      "Self Assessment: chat"
    )
  }
}
