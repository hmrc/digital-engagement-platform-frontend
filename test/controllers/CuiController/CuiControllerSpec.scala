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

    "render self assessment CUI page" in {
      val application = builder.build()

      running(application) {
        val request = FakeRequest(GET, cuiRoutes.CuiController.selfAssessment.url)
        val result = route(application, request).get
        val doc = asDocument(contentAsString(result))
        status(result) mustBe OK
        doc.select("h1").text() mustBe "Self Assessment: chat"
      }
    }

    "render online Services Helpdesk CUI page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)

      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Technical support with HMRC online services: chat"
    }

    "render employer enquiries CUI page" in {
      val result = controller.employerEnquiries(fakeRequest)

      val doc = asDocument(contentAsString(result))
      status(result) mustBe OK
      doc.select("h1").text() mustBe "Employers enquiries: chat"
    }
  }
}
