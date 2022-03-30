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

package controllers

import controllers.CuiController.{routes => cuiRoutes}
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.mvc.{AnyContent, Request}
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class WebchatControllerSpec
  extends AppBuilderSpecBase
    with Matchers
    with AnyWordSpecLike {

  private val controller = app.injector.instanceOf[WebchatController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "fixed URLs" must {
    "render self-assessment webchat page if showSACUI is false and IVR false" in {
      val application = builder.configure("features.showSACUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: webchat"
      }
    }

    "render self-assessment CUI page if showSACUI is true and IVR false" in {
      val application = builder.configure("features.showSACUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.selfAssessment.url)
        val result = route(application, request).get
        status(result) mustBe SEE_OTHER
        redirectLocation(result) mustBe Some(cuiRoutes.CuiController.selfAssessment.url)
      }
    }

    "render technical support with HMRC online services page : if showOSHCUI is true" in {
      val application = builder.configure("features.showOSHCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        status(result) mustBe SEE_OTHER
        redirectLocation(result) mustBe Some(cuiRoutes.CuiController.onlineServicesHelpdesk.url)

      }
    }

    "render technical support with HMRC online services page : if showOSHCUI is false" in {
      val application = builder.configure("features.showOSHCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Online services helpdesk: webchat"
      }
    }

    "render self-assessment webchat page showSACUI is false and IVR true" in {
      val application = builder.configure("features.showSACUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.selfAssessment.url + "?nuance=ivr")
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: webchat"
      }
    }

    "render self-assessment webchat page if showSACUI is true and IVR true" in {
      val application = builder.configure("features.showSACUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.WebchatController.selfAssessment.url + "?nuance=ivr")
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: webchat"
      }
    }

    "render tax-credits page" when {
      "ivr query param is available " in {
        val ivrFakeRequest: Request[AnyContent] = FakeRequest("GET", "?nuance=ivr")
        val result = controller.taxCredits(ivrFakeRequest)
        val doc = asDocument(contentAsString(result))

        status(result) mustBe SEE_OTHER
        redirectLocation(result) mustBe Some(cuiRoutes.CuiController.askHmrcOnline.url)
      }
    }

    "redirect to cui" when {
      "ivr query param is not available " in {

        val result = controller.taxCredits(fakeRequest)

        status(result) mustBe SEE_OTHER
        redirectLocation(result) mustBe Some(cuiRoutes.CuiController.askHmrcOnline.url)
      }
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Imports and exports: webchat"
    }

    "render excise page" in {
      val result = controller.exciseEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render charities community sports page" in {
      val result = controller.charitiesCommunitySports(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render employing expatriate employees page" in {
      val result = controller.employingExpatriateEmployees(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render employment related securities page" in {
      val result = controller.employmentRelatedSecurities(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Non-UK resident employees page" in {
      val result = controller.nonUkResidentEmployees(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Non-UK resident landlords page" in {
      val result = controller.nonUkResidentLandlords(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Corporation tax enquiries page" in {
      val result = controller.corporationTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Construction industry scheme page" in {
      val result = controller.constructionIndustryScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "VAT registration page" in {
      val result = controller.vatRegistration(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "National clearance hub page" in {
      val result = controller.nationalClearanceHub(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "National Clearance Hub: webchat"
    }

    "Job Retention Scheme page" in {
      val result = controller.jobRetentionScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Self Employment Income Support Scheme page" in {
      val result = controller.selfEmploymentIncomeSupportScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "C19 Employer Enquiries page" in {
      val result = controller.c19EmployerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Probate page" in {
      val result = controller.probate(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "Inheritance page" in {
      val result = controller.inheritanceTax(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
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
        val doc = asDocument(contentAsString(result))
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
