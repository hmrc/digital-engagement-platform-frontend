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

package views.html.pages.CIAPIViews

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.CIAPIViews.SelfAssessmentCUIView
import views.html.pages.helpers.ChatViewBehaviours

class SelfAssessmentCUIViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike{

  private val view = app.injector.instanceOf[SelfAssessmentCUIView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Self Assessment View" must {
    "rendered" must {
      behave like normalCuiPage(
      createView,
        "Ask HMRC",
        "Self Assessment: chat - Ask HMRC - GOV.UK",
        "Self Assessment: chat"
      )
    }
  }
}
