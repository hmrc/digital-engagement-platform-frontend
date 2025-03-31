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

package views.html.pages.IVR.dav4

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ChatViewBehaviours
import views.html.IVR.dav4.DAv4SelfAssessmentIVRView

class DAv4SelfAssessmentIVRViewSpec extends ChatViewBehaviours with Matchers with AnyWordSpecLike {

  private val view = app.injector.instanceOf[DAv4SelfAssessmentIVRView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Self Assessment IVR DAv4 webchat view" must {
    val returnUrl: String = "https://www.gov.uk/contact-hmrc"

    behave like normalPage(
      createView,
      "Self Assessment: live chat - Ask HMRC - GOV.UK",
      "Self Assessment: live chat",
      "Return to Contact HMRC",
      returnUrl,
      Some(Seq(
        "Opening times:",
        "Monday to Friday, 8am to 7:30pm",
        "Saturday, 8am to 4pm",
        "Closed Sundays and bank holidays."
      )),
      None,
      Some(Seq("dav4IVRWebchat"))
    )
  }

}