/*
 * Copyright 2020 HM Revenue & Customs
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

import config.AppConfig
import org.scalatest.{Matchers, WordSpec}
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.{Cookie, MessagesControllerComponents}
import play.api.test.FakeRequest
import play.api.test.Helpers._
import services.NuanceEncryptionService
import views.html._

class IvrControllerSpec
    extends WordSpec
    with Matchers
    with GuiceOneAppPerSuite
    with ScalaCheckPropertyChecks {

  implicit private val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  implicit val appConfig = app.injector.instanceOf[AppConfig]
  val taxCreditsView = app.injector.instanceOf[TaxCreditsView]
  val childBenefitView = app.injector.instanceOf[ChildBenefitView]
  val incomeTaxEnquiriesView = app.injector.instanceOf[IncomeTaxEnquiriesView]
  val employerEnquiriesView = app.injector.instanceOf[EmployerEnquiriesView]
  val vatEnquiriesView = app.injector.instanceOf[VatEnquiriesView]
  val nationalInsuranceNumbersView = app.injector.instanceOf[NationalInsuranceNumbersView]
  val exciseEnquiries = app.injector.instanceOf[ExciseEnquiriesView]
  val selfAssessmentView = app.injector.instanceOf[SelfAssessmentView]
  val eatOutToHelpOutView = app.injector.instanceOf[EatOutToHelpOutView]
  val nuanceEncryptionService = app.injector.instanceOf[NuanceEncryptionService]

  val messagesCC = app.injector.instanceOf[MessagesControllerComponents]
  private val controller = new IvrController(
    appConfig,
    messagesCC,
    taxCreditsView,
    childBenefitView,
    incomeTaxEnquiriesView,
    employerEnquiriesView,
    vatEnquiriesView,
    nationalInsuranceNumbersView,
    exciseEnquiries,
    selfAssessmentView,
    eatOutToHelpOutView,
    nuanceEncryptionService)

  "ivr redirect URLs" should {

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/tax-credits-enquiries?nuance=ivr")
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/child-benefit?nuance=ivr")
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/income-tax-enquiries-for-individuals-pensioners-and-employees?nuance=ivr")
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/employer-enquiries?nuance=ivr")
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/vat-enquiries?nuance=ivr")
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/national-insurance-numbers?nuance=ivr")
    }

    "render excise page" in {
      val result = controller.exciseEnquiries(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/excise-enquiries?nuance=ivr")
    }

    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/self-assessment?nuance=ivr")
    }

    "render job retention page" in {
      val result = controller.jobRetentionScheme(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/job-retention-scheme?nuance=ivr")
    }

    "self employment income support scheme page" in {
      val result = controller.selfEmploymentIncomeSupportScheme(fakeRequest)
      status(result) shouldBe SEE_OTHER
      redirectLocation(result) shouldBe Some("/ask-hmrc/webchat/self-employment-income-support-scheme?nuance=ivr")
    }
  }
}
