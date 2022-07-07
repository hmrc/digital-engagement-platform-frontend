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

import controllers.CiapiController.{routes => ciapiRoutes}
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class CiapiControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike {

  private val controller = app.injector.instanceOf[CiapiController]

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
  }
}
