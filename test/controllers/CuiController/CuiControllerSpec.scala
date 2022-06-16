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

package controllers.CuiController

import controllers.CuiController.{routes => cuiRoutes}
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class CuiControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike {

  private val controller = app.injector.instanceOf[CuiController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Nuance Full Page CUI Test Controller" should {

    "render job retention scheme CUI page" in {
      val result = controller.jobRetentionSchemeHelp(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus Job Retention Scheme: chat"
    }

    "render self assessment CUI page if showSACUI is true" in {
      val application = builder.configure("features.showSACUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: chat"
      }
    }

    "render technical support with HMRC online services page : if showSACUI is false" in {
      val application = builder.configure("features.showSACUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.selfAssessment.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render online Services Helpdesk CUI page if showOSHCUI is true" in {
      val application = builder.configure("features.showOSHCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Technical support with HMRC online services: chat"
      }
    }

    "render technical support with HMRC online services page : if showOSHCUI is false" in {
      val application = builder.configure("features.showOSHCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.onlineServicesHelpdesk.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render employer enquiries CUI page if showEHLCUI is true" in {
      val application = builder.configure("features.showEHLCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.employerEnquiries.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Employers enquiries: chat"
      }
    }

    "render technical support with HMRC online services page : if showEHLCUI is false" in {
      val application = builder.configure("features.showEHLCUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.employerEnquiries.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }

    "render construction industry scheme CUI page if showDAv2CUI is true" in {
      val application = builder.configure("features.showDAv2CUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.constructionIndustryScheme.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Construction Industry Scheme: chat"
      }
    }

    "render child benefit CUI page if showCHBCUI is true" in {
      val application = builder.configure("features.showCHBCUI" -> "true").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.childBenefit.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Child Benefit: chat"
      }
    }

    "render technical support with HMRC online services page : if showDAv2CUI is false" in {
      val application = builder.configure("features.showDAv2CUI" -> "false").build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.constructionIndustryScheme.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Sorry, this webchat is unavailable"
      }
    }
  }
}
