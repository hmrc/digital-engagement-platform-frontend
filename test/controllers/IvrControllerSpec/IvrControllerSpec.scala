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

    "Self Assessment DAv1 live webchat page is displayed if DAv4 feature switch is false but DAv1 feature switch is true" in {
      val application = builder.configure("features.digitalAssistants.showDAv4IVRWebchatSA" -> "false", "features.digitalAssistants.showIVRWebchatSA" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: live chat"
        assert(doc.getElementsByClass("dav4IVRWebchat").isEmpty)
      }
    }

    "Self Assessment DAv4 live webchat page is displayed if DAv4 feature switch is true but DAv1 feature switch is false" in {
      val application = builder.configure("features.digitalAssistants.showDAv4IVRWebchatSA" -> "true", "features.digitalAssistants.showIVRWebchatSA" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: live chat"
        assert(!doc.getElementsByClass("dav4IVRWebchat").isEmpty)
      }
    }

     "Self Assessment DAv4 live webchat page is displayed if DAv4 feature switch is true but DAv1 feature switch is also true" in {
      val application = builder.configure("features.digitalAssistants.showDAv4IVRWebchatSA" -> "true", "features.digitalAssistants.showIVRWebchatSA" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: live chat"
        assert(!doc.getElementsByClass("dav4IVRWebchat").isEmpty)
      }
    }

    "Self Assessment page is not displayed if feature switches are false for both DAv4 and DAv1. The shutter page is displayed instead" in {
      val application = builder.configure("features.digitalAssistants.showDAv4IVRWebchatSA" -> "false", "features.digitalAssistants.showIVRWebchatSA" -> "false").build()

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

    "Employer Helpline page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatEHL" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.employerHelpline.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Employer Helpline: live chat"
      }
    }

    "Employer Helpline page is not displayed if shutter flag is false. Shutter page is displayed instead" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatEHL" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.employerHelpline.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }
    
    "Construction Industry Scheme page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatCIS" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.constructionIndustryScheme.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Construction Industry Scheme: live chat"
      }
    }

    "Construction Industry Scheme page is not displayed if shutter flag is false. Shutter page is displayed instead" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatCIS" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.constructionIndustryScheme.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

     "Debt Management page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatDM" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.debtManagement.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Payment Problems: live chat"
      }
    }

    "Debt Management page is not displayed if shutter flag is false. Shutter page is displayed instead" in {
      val application = builder.configure("features.digitalAssistants.showIVRWebchatDM" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.IvrController.debtManagement.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

  }
}
