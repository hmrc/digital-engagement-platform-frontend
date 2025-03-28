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

package controllers

import controllers.CiapiController.{routes => ciapiRoutes}
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class WebchatControllerSpec
  extends AppBuilderSpecBase
    with Matchers
    with AnyWordSpecLike {

  private val controller = app.injector.instanceOf[WebchatController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "service unavailable redirect" must {
    "show the service unavailable page" in {
      val result = controller.serviceUnavailableRedirect(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }
  }

  "fixed URLs" must {

    "National Clearance Hub DAv1 live webchat page if feature switch is false" in {
      val application = builder.configure("features.digitalAssistants.showDAv4NCH" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.nationalClearanceHub.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "National Clearance Hub: webchat"
        assert(doc.getElementById("HMRC_Fixed_1") != null)
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") == null)
      }
    }

    "National Clearance Hub DAv4 live webchat page if feature switch is true" in {
      val application = builder.configure("features.digitalAssistants.showDAv4NCH" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.nationalClearanceHub.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "National Clearance Hub: webchat"
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") != null)
        assert(doc.getElementById("HMRC_Fixed_1") == null)
      }
    }

    "Additional Needs Help DAv1 live webchat page if feature switch is false" in {
      val application = builder.configure("features.digitalAssistants.showDAv4ANH" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.additionalNeedsHelp.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "HMRC’s Extra Support team: webchat"
        assert(doc.getElementById("HMRC_Fixed_1") != null)
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") == null)
      }
    }

    "Additional Needs Help DAv4 live webchat page if feature switch is true" in {
      val application = builder.configure("features.digitalAssistants.showDAv4ANH" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.additionalNeedsHelp.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "HMRC’s Extra Support team: webchat"
        assert(doc.getElementById("HMRC_Fixed_1") == null)
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") != null)
      }
    }

    "Complaints PAYE / SA DAv4 live webchat page if feature switch is true" in {
      val application = builder.configure("features.digitalAssistants.showDAv4PAYESAR" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.payeandSelfAssessmentResolutions.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "PAYE and Self Assessment resolutions: webchat"
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") != null)
      }
    }

    "Complaints PAYE / SA DAv4 live webchat page is not displayed if feature switch is false" in {
      val application = builder.configure("features.digitalAssistants.showDAv4PAYESAR" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.payeandSelfAssessmentResolutions.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe NOT_FOUND
      }
    }

     "Personal Transport Unit Enquiries DAv1 live webchat page if feature switch is false" in {
      val application = builder.configure("features.digitalAssistants.showDAv4PTU" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.personalTransportUnitEnquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Personal Transport Unit: webchat"
        assert(doc.getElementById("HMRC_Fixed_1") != null)
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") == null)
      }
    }

    "Personal Transport Unit Enquiries DAv4 live webchat page if feature switch is true" in {
      val application = builder.configure("features.digitalAssistants.showDAv4PTU" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.personalTransportUnitEnquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Personal Transport Unit: webchat"
        assert(doc.getElementById("HMRC_CIAPI_Fixed_1") != null)
        assert(doc.getElementById("HMRC_Fixed_1") == null)
      }
    }

    "Service unavailable page" in {
      val result = controller.serviceUnavailable(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Sorry, this webchat is unavailable"
    }
  }
}
