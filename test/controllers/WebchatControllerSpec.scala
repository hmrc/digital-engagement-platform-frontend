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

    "Construction industry scheme page" in {
      val result = controller.constructionIndustryScheme(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(ciapiRoutes.CiapiController.constructionIndustryScheme.url)
    }

    "National clearance hub page" in {
      val result = controller.nationalClearanceHub(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "National Clearance Hub: webchat"
    }

    "Additional Needs page" in {
      val result = controller.additionalNeedsHelp(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "HMRC’s Extra Support team: webchat"
    }

    "Personal Transport Unit Enquiries page" in {
      val result = controller.personalTransportUnitEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Personal Transport Unit: webchat"
    }

    "IR-35 Enquiries page is displayed if shutter flag is false" in {
      val application = builder.configure("features.shutter" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.ir35Enquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Off-payroll working (IR35): webchat"
      }
    }

    "IR-35 Enquiries page is not displayed if shutter flag is true. Shutter page is displayed instead" in {
      val application = builder.configure("features.shutter" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.ir35Enquiries.url)
        val result = route(application, request).get
        status(result) mustBe SEE_OTHER
        redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
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
