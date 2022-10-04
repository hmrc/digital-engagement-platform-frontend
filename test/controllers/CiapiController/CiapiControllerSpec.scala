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

package controllers.CiapiController

import audit.AuditHelper
import config.AppConfig
import controllers.CiapiController.{routes => ciapiRoutes}
import mocks.MockAuditService
import models.DAv3AuditModel
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.MustMatchers.convertToAnyMustWrapper
import org.scalatest.{Matchers, WordSpecLike}
import play.api.mvc.MessagesControllerComponents
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.CIAPIViews.{ChildBenefitCUIView, ConstructionIndustrySchemeCUIView, CorporationTaxCuiView, CustomsInternationalTradeCUIView, EmployerEnquiriesCUIView, OnlineServicesHelpdeskCUIView, SelfAssessmentCUIView, TaxCreditsCUIView, VatOnlineCuiView}
import views.html.CUIViews.{ConstructionIndustrySchemeCUIDAv2View, EmployerEnquiriesCUIDAv2View, OnlineServicesHelpdeskCUIDAv2View, SelfAssessmentCUIDAv2View, childBenefitCUIDAv2View}
import views.html.pages.helpers.AppBuilderSpecBase

class CiapiControllerSpec
  extends AppBuilderSpecBase with Matchers with WordSpecLike with MockAuditService {

  def controller = new CiapiController(
    app.injector.instanceOf[AppConfig],
    app.injector.instanceOf[MessagesControllerComponents],
    app.injector.instanceOf[TaxCreditsCUIView],
    app.injector.instanceOf[CustomsInternationalTradeCUIView],
    app.injector.instanceOf[VatOnlineCuiView],
    app.injector.instanceOf[CorporationTaxCuiView],
    app.injector.instanceOf[childBenefitCUIDAv2View],
    app.injector.instanceOf[ChildBenefitCUIView],
    app.injector.instanceOf[ConstructionIndustrySchemeCUIDAv2View],
    app.injector.instanceOf[ConstructionIndustrySchemeCUIView],
    app.injector.instanceOf[SelfAssessmentCUIDAv2View],
    app.injector.instanceOf[SelfAssessmentCUIView],
    app.injector.instanceOf[OnlineServicesHelpdeskCUIDAv2View],
    app.injector.instanceOf[OnlineServicesHelpdeskCUIView],
    app.injector.instanceOf[EmployerEnquiriesCUIView],
    app.injector.instanceOf[EmployerEnquiriesCUIDAv2View],
    mockAuditingService
  )

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Nuance Full Page CIAPI Test Controller" should {
    "render Tax Credits Ask HMRC Online page" in {
      val result = controller.askHmrcOnline(fakeRequest)
      status(result) mustBe OK
    }

    "render Customs and International Trade CUI page if showCITCUI is true" in {
      val application = builder.configure("features.showCITCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.customsInternationalTrade.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Customs and international trade: chat"
        verifyAudit(DAv3AuditModel("customsInternationalTrade"))
      }
    }

    "render technical support with HMRC online services page : if showCITCUI is false" in {
      val application = builder.configure("features.showCITCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.customsInternationalTrade.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render Vat Online CUI page if showVATCUI is true" in {
        val application = builder.configure("features.showVATCUI" -> "true").build()

        running(application) {
            val request = FakeRequest(GET, ciapiRoutes.CiapiController.vatOnline.url)
            val result = route(application, request).get
            val doc = asDocument(contentAsString(result))
            status(result) mustBe OK
            doc.select("h1").text() mustBe "VAT Online: chat"
            verifyAudit(DAv3AuditModel("vatOnline"))
        }
    }

    "render technical support with HMRC online services page : if showVATCUI is false" in {
        val application = builder.configure("features.showVATCUI" -> "false").build()

        running(application) {
            val request = FakeRequest(GET, ciapiRoutes.CiapiController.vatOnline.url)
            val result = route(application, request).get
            status(result) mustBe NOT_FOUND
        }
    }

    "render Corporation Tax CUI page if showCTCUI is true" in {
      val application = builder.configure("features.showCTCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.corporationTax.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Corporation Tax: chat"
        verifyAudit(DAv3AuditModel("corporationTax"))
      }
    }

    "render technical support with HMRC online services page : if showCTCUI is false" in {
      val application = builder.configure("features.showCTCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.corporationTax.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render child benefit CUI page if showCHBCUI is true" in {
      val application = builder.configure("features.showCHBCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.childBenefit.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Child Benefit: chat"
        verifyAudit(DAv3AuditModel("childBenefit"))
      }
    }

    "render child benefit DAv2 CUI page if showCHBCUI is false" in {
      val application = builder.configure("features.showCHBCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.childBenefit.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Child Benefit: chat"
      }
    }

    "render construction industry scheme CUI page if showCISCUI is true" in {
      val application = builder.configure("features.showCISCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.constructionIndustryScheme.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Construction Industry Scheme: chat"
        verifyAudit(DAv3AuditModel("constructionIndustryScheme"))
      }
    }

    "render construction industry scheme CUI page if showCISCUI is false" in {
      val application = builder.configure("features.showCISCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.constructionIndustryScheme.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Construction Industry Scheme: chat"
      }
    }

    "render self assessment CUI page if showSACUI is true" in {
      val application = builder.configure("features.showSACUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: chat"
        verifyAudit(DAv3AuditModel("selfAssessment"))
      }
    }

    "render self assessment CUI page if showSACUI is false" in {
      val application = builder.configure("features.showSACUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: chat"
      }
    }

    "render online services helpdesk CUI page if showOSHCUI is true" in {
      val application = builder.configure("features.showOSHCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Technical support with HMRC online services: chat"
        verifyAudit(DAv3AuditModel("onlineServicesHelpdesk"))
      }
    }

    "render online services helpdesk DAv2 page if showOSHCUI is false" in {
      val application = builder.configure("features.showOSHCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Technical support with HMRC online services: chat"
      }
    }

    "render employee enquiries CUI page if showEHLCUI is true" in {
      val application = builder.configure("features.showEHLCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.employerEnquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Employers enquiries: chat"
        verifyAudit(DAv3AuditModel("employerEnquiries"))
      }
    }

    "render employee enquiries DAv2 CUI page if showEHLCUI is false" in {
      val application = builder.configure("features.showEHLCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, ciapiRoutes.CiapiController.employerEnquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Employers enquiries: chat"
      }
    }
  }
}
