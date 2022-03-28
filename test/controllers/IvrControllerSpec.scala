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

import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase
import controllers.CuiController.{routes => cuiRoutes}
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike

class IvrControllerSpec extends AppBuilderSpecBase with Matchers with AnyWordSpecLike{

  private val controller = app.injector.instanceOf[IvrController]

  "ivr redirect URLs" should {

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(cuiRoutes.CuiController.askHmrcOnline.url)
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render excise page" in {
      val result = controller.exciseEnquiries(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some("/ask-hmrc/webchat/self-assessment?nuance=ivr")
    }

    "render job retention page" in {
      val result = controller.jobRetentionScheme(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "self employment income support scheme page" in {
      val result = controller.selfEmploymentIncomeSupportScheme(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(routes.WebchatController.serviceUnavailable.url)
    }

    "c19 employer enquiries page" in {
      val result = controller.c19EmployerEnquiries(fakeRequest)
      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some("/ask-hmrc/webchat/c19-employer-enquiries?nuance=ivr")
    }

  }
}
