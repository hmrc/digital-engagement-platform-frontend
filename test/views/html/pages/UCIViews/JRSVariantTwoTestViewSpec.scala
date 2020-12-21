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

package views.html.pages.UCIViews

import play.twirl.api.HtmlFormat
import views.html.UCIViews.JRSVariantTwoTestView
import views.html.pages.ChatViewBehaviours

class JRSVariantTwoTestViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[JRSVariantTwoTestView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "JRS Variant Two Test View" must {
    "rendered" must {
      //TODO add title when dicided what it will be
      behave like normalPage(
        createView,
        "",
        "Get help with the Coronavirus Job Retention Scheme - GOV.UK",
        "Coronavirus Job Retention Scheme: chat",
        "",
        "",
        Nil,
        Seq("nuanMessagingFrame")
      )
    }
  }
}