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

import org.scalatest.MustMatchers.convertToAnyMustWrapper
import org.scalatest.{Matchers, WordSpecLike}
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class StampDutyControllerSpec
    extends AppBuilderSpecBase with Matchers with WordSpecLike  {

  private val controller = app.injector.instanceOf[StampDutyController]

  "service unavailable redirect" should {
    "show the service unavailable page" in {
      val result = controller.serviceUnavailableRedirect(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }
  }

  "fixed URLs" should {
    "render land tax page" in {
      val result = controller.landTax(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }
    "render reserve tax page" in {
      val result = controller.reserveTax(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }
    "render shares and land page" in {
      val result = controller.sharesAndLand(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }
    "render annual tax on enveloped dwellings page" in {
      val result = controller.annualTaxOnEnvelopedDwellings(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }
  }
}
