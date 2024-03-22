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

package controllers.CiapiController

import config.AppConfig
import mocks.MockAuditService
import models.DAv3AuditModel
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.mvc.MessagesControllerComponents
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.CIAPIViews._
import views.html.pages.helpers.AppBuilderSpecBase
import scala.concurrent.ExecutionContext

class CiapiControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike with MockAuditService {

  implicit lazy val ec: ExecutionContext = app.injector.instanceOf[ExecutionContext]

  lazy val controller = new CiapiController(
    app.injector.instanceOf[AppConfig],
    app.injector.instanceOf[MessagesControllerComponents],
    mockAuditingService,
    app.injector.instanceOf[AskHMRCOnlineCIAPIView],
    app.injector.instanceOf[NationalMinimumWageCUIView],
    app.injector.instanceOf[DebtManagementCUIView])

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Nuance Full Page CIAPI Test Controller" should {

    "render Tax Credits Ask HMRC Online page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showTCCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.askHmrcOnline.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Tax Credits Ask HMRC Online page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showTCCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.askHmrcOnline.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Customs and International Trade CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showCITCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.customsInternationalTrade.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Customs and International Trade CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showCITCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.customsInternationalTrade.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Vat Online CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showVATCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.vatOnline.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Vat Online CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showVATCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.vatOnline.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Corporation Tax CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showCTCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.corporationTax.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Corporation Tax CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showCTCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.corporationTax.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Child Benefit CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showCHBCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.childBenefit.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Child Benefit CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showCHBCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.childBenefit.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Construction Industry Scheme CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showCISCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.constructionIndustryScheme.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Construction Industry Scheme CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showCISCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.constructionIndustryScheme.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Self Assessment CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showSACUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Self Assessment CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showSACUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.selfAssessment.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

       "render Help To Save CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showH2SCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.helpToSave.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Help To Save CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showH2SCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.helpToSave.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Agent Dedicated Line CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showADLCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.agentDedicatedLine.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Agent Dedicated Line CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showADLCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.agentDedicatedLine.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Online Services Helpdesk CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showOSHCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Online Services Helpdesk CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showOSHCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Employee Enquiries CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showEHLCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.employerEnquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Employee Enquiries CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showEHLCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.employerEnquiries.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Trade Tariff CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showTTCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.tradeTariff.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Trade Tariff CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showTTCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.tradeTariff.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Debt Management CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showDMCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.debtManagement.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if Debt Management CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showDMCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.debtManagement.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render national minimum wage CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showNMWCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalMinimumWage.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if national minimum wage CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showNMWCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalMinimumWage.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render PAYE CUI page if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showPAYECUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.paye.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render not found if PAYE CUI page shutter flag is false" in {
      val application = builder.configure("features.digitalAssistants.showPAYECUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.paye.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render national insurance CUI page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showNICUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalInsurance.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render national insurance CUI page is not displayed if shutter flag is false. 404 page received" in {
      val application = builder.configure("features.digitalAssistants.showNICUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalInsurance.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render inheritance tax CUI page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showIHTCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.inheritanceTax.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render inheritance tax CUI page is not displayed if shutter flag is false. 404 page received" in {
      val application = builder.configure("features.digitalAssistants.showIHTCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.inheritanceTax.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render anti-money laundering services CUI page is displayed if shutter flag is true" in {
      val application = builder.configure("features.digitalAssistants.showAMLSCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.antiMoneyLaunderingServices.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Ask HMRC online"
      }
    }

    "render anti-money laundering services CUI page is not displayed if shutter flag is false. 404 page received" in {
      val application = builder.configure("features.digitalAssistants.showAMLSCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.antiMoneyLaunderingServices.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }
  }
}