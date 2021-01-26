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

package controllers

import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.Result
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

import scala.concurrent.Future

class AccessibilityStatementControllerSpec
  extends AppBuilderSpecBase with ScalaCheckPropertyChecks{

  private val controller = app.injector.instanceOf[AccessibilityStatementController]

  private val expectedAccessibilityStatementUrl = "http://localhost:12346/accessibility-statement/digital-engagement-platform-frontend"

  "fixed URLs" should {
    "render accessibility statement page" in {
      val pageUri: String = s"https://www.tax.service.gov.uk/ask-hmrc/webchat/construction-industry-scheme-enquiries"
      val result: Future[Result] = controller.accessibility(Some(pageUri))(fakeRequest)

      val expectedReferrerUrl = "https%3A%2F%2Fwww.tax.service.gov.uk%2Fask-hmrc%2Fwebchat%2Fconstruction-industry-scheme-enquiries-nuance"

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustEqual Some(s"$expectedAccessibilityStatementUrl?referrerUrl=$expectedReferrerUrl")
    }

    "render accessibility statement page from link inside webchat" in {
      val result = controller.accessibility(None)(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustEqual Some(s"$expectedAccessibilityStatementUrl?referrerUrl=nuance")
    }
  }
}
