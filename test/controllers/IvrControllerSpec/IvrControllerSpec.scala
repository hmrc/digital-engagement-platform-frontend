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

package controllers.IvrController

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class IvrControllerSpec
  extends AppBuilderSpecBase
    with Matchers
    with AnyWordSpecLike {

  def asDocument(html: String): Document = Jsoup.parse(html)

  "IVR URLs" must {

    "Self Assessment page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatSA" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: live chat"
      }
    }

    "Self Assessment page is not displayed if shutter flag is false. Shutter page is displayed instead" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatSA" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.selfAssessment.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

     "National Insurance page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatNI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.nationalInsurance.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "National Insurance: live chat"
      }
    }

    "National Insurance page is not displayed if shutter flag is false. Shutter page is displayed instead" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatNI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.nationalInsurance.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }
  }
}
