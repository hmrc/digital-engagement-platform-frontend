/*
 * Copyright 2021 HM Revenue & Customs
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

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class CuiControllerSpec
  extends AppBuilderSpecBase with ScalaCheckPropertyChecks {

  private val controller = app.injector.instanceOf[CuiController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Nuance Full Page CUI Test Controller" should {
    "render JRS Variant One Test page" in {
      val result = controller.jobRetentionSchemeHelp(fakeRequest)

      status(result) mustBe OK
    }

    "render JRS Variant Two Test page" in {
      val result = controller.helpJobRetentionScheme(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.CuiController.jobRetentionSchemeHelp.url)
    }

    "render SA Variant page" in {
      val result = controller.selfAssessment(fakeRequest)

      if(frontendAppConfig.showSACUI) {
        status(result) mustBe OK
      }
      else {
        status(result) mustBe NOT_FOUND
      }
    }

    "render Ask HMRC Online page" in {
      val result = controller.askHmrcOnline(fakeRequest)
        status(result) mustBe OK
    }
  }
}
