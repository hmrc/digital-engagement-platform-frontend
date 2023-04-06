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

class CiapiControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike with MockAuditService {

  lazy val controller = new CiapiController(
    app.injector.instanceOf[AppConfig],
    app.injector.instanceOf[MessagesControllerComponents],
    mockAuditingService,
    app.injector.instanceOf[TaxCreditsCUIView],
    app.injector.instanceOf[CustomsInternationalTradeCUIView],
    app.injector.instanceOf[VatOnlineCuiView],
    app.injector.instanceOf[CorporationTaxCuiView],
    app.injector.instanceOf[ChildBenefitCUIView],
    app.injector.instanceOf[ConstructionIndustrySchemeCUIView],
    app.injector.instanceOf[SelfAssessmentCUIView],
    app.injector.instanceOf[OnlineServicesHelpdeskCUIView],
    app.injector.instanceOf[EmployerEnquiriesCUIView],
    app.injector.instanceOf[TradeTariffCUIView],
    app.injector.instanceOf[NationalMinimumWageCUIView],
    app.injector.instanceOf[PAYECUIView],
    app.injector.instanceOf[DebtManagementCUIView],
    app.injector.instanceOf[NationalInsuranceCUIView])

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Nuance Full Page CIAPI Test Controller" should {
    "render Tax Credits Ask HMRC Online page" in {
      val result = controller.askHmrcOnline(fakeRequest)
      status(result) mustBe OK
      verifyAudit(DAv3AuditModel("askHmrcOnline"))
    }

    "render Customs and International Trade CUI page" in {
      val result = controller.customsInternationalTrade(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Customs and international trade: chat"
      verifyAudit(DAv3AuditModel("customsInternationalTrade"))
    }

    "render Vat Online CUI page" in {
      val result = controller.vatOnline(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "VAT Online: chat"
      verifyAudit(DAv3AuditModel("vatOnline"))
    }

    "render Corporation Tax CUI page" in {
      val result = controller.corporationTax(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Corporation Tax: chat"
      verifyAudit(DAv3AuditModel("corporationTax"))
    }

    "render child benefit CUI page" in {
      val result = controller.childBenefit(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Child Benefit: chat"
      verifyAudit(DAv3AuditModel("childBenefit"))
    }

    "render construction industry scheme CUI page" in {
      val result = controller.constructionIndustryScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Construction Industry Scheme: chat"
      verifyAudit(DAv3AuditModel("constructionIndustryScheme"))
    }

    "render self assessment CUI page" in {
      val result = controller.selfAssessment(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Self Assessment: chat"
      verifyAudit(DAv3AuditModel("selfAssessment"))
    }

    "render online services helpdesk CUI page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Technical support with HMRC online services: chat"
      verifyAudit(DAv3AuditModel("onlineServicesHelpdesk"))
    }

    "render employee enquiries CUI page" in {
      val result = controller.employerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Employers enquiries: chat"
      verifyAudit(DAv3AuditModel("employerEnquiries"))
    }

    "render trade tariff CUI page" in {
      val result = controller.tradeTariff(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Trade Tariff: Chat"
      verifyAudit(DAv3AuditModel("tradeTariff"))
    }

    "render debt management CUI page" in {
      val result = controller.debtManagement(fakeRequest)
      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Payment Problems: chat"
    }

    "render national minimum wage CUI page if shutter flag is true" in {
      val application = builder.configure("features.showNMWCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalMinimumWage.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "National Minimum Wage: chat"
      }
    }

    "render not found if national minimum wage CUI page shutter flag is false" in {
      val application = builder.configure("features.showNMWCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalMinimumWage.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render PAYE CUI page if shutter flag is true" in {
      val application = builder.configure("features.showPAYECUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.paye.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "PAYE: chat"
      }
    }

    "render not found if PAYE CUI page shutter flag is false" in {
      val application = builder.configure("features.showPAYECUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.paye.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render national insurance CUI page is displayed if shutter flag is true" in {
      val application = builder.configure("features.showNICUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalInsurance.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "National Insurance: chat"
      }
    }

    "render national insurance CUI page is not displayed if shutter flag is false. 404 page received" in {
      val application = builder.configure("features.showNICUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, routes.CiapiController.nationalInsurance.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }
  }
}