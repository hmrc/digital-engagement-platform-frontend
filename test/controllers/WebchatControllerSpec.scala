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

import org.scalatest.{Matchers, WordSpec}
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.Cookie
import play.api.test.FakeRequest
import play.api.test.Helpers._
import config.AppConfig
import views.html._
import uk.gov.hmrc.play.bootstrap.tools.Stubs.stubMessagesControllerComponents

class WebchatControllerSpec
    extends WordSpec
    with Matchers
    with GuiceOneAppPerSuite
    with ScalaCheckPropertyChecks {

  implicit private val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  implicit val appConfig = app.injector.instanceOf[AppConfig]
  val selfAssessmentView = app.injector.instanceOf[SelfAssessmentView]
  val taxCreditsView = app.injector.instanceOf[TaxCreditsView]
  val childBenefitView = app.injector.instanceOf[ChildBenefitView]
  val customsEnquiriesView = app.injector.instanceOf[CustomsEnquiriesView]
  val employerEnquiriesView = app.injector.instanceOf[EmployerEnquiriesView]
  val incomeTaxEnquiriesView = app.injector.instanceOf[IncomeTaxEnquiriesView]
  val nationalInsuranceNumbersView = app.injector.instanceOf[NationalInsuranceNumbersView]
  val onlineServiceHelpdeskView = app.injector.instanceOf[OnlineServiceHelpdeskView]
  val vatEnquiriesView = app.injector.instanceOf[VatEnquiriesView]
  val vatOnlineServicesHelpdeskView = app.injector.instanceOf[VatOnlineServicesHelpdeskView]
  val paymentProblemsSelfAssessmentView = app.injector.instanceOf[PaymentProblemsSelfAssessmentView]
  val paymentProblemsVATEnquiriesView = app.injector.instanceOf[PaymentProblemsVATEnquiriesView]
  val paymentProblemsPAYEEnquiriesView = app.injector.instanceOf[PaymentProblemsPAYEEnquiriesView]
  val paymentProblemsCorporationTaxEnquiriesView = app.injector.instanceOf[PaymentProblemsCorporationTaxEnquiriesView]


  val mcc = stubMessagesControllerComponents()
  implicit val messages = mcc.messagesApi.preferred(fakeRequest)

  private val controller = new WebchatController(
    appConfig,
    mcc,
    selfAssessmentView,
    taxCreditsView,
    childBenefitView,
    customsEnquiriesView,
    employerEnquiriesView,
    incomeTaxEnquiriesView,
    nationalInsuranceNumbersView,
    onlineServiceHelpdeskView,
    vatEnquiriesView,
    vatOnlineServicesHelpdeskView,
    paymentProblemsSelfAssessmentView,
    paymentProblemsVATEnquiriesView,
    paymentProblemsPAYEEnquiriesView,
    paymentProblemsCorporationTaxEnquiriesView)

  "fixed URLs" should {
    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe selfAssessmentView().toString
    }

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe taxCreditsView().toString()
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe childBenefitView().toString
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe employerEnquiriesView().toString
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe vatEnquiriesView().toString
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe vatOnlineServicesHelpdeskView().toString
    }

    "render online services helpdesk page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe onlineServiceHelpdeskView().toString
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe nationalInsuranceNumbersView().toString
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe customsEnquiriesView().toString
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe incomeTaxEnquiriesView().toString
    }

    "render payment-problems self-assessment page" in {
      val result = controller.paymentProblemsSelfAssessment(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe paymentProblemsSelfAssessmentView().toString
    }

    "render payment-problems vat enquiries page" in {
      val result = controller.paymentProblemsVATEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe paymentProblemsVATEnquiriesView().toString
    }

    "render payment-problems paye enquiries page" in {
      val result = controller.paymentProblemsPAYEEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe paymentProblemsPAYEEnquiriesView().toString
    }

    "render payment-problems corporation tax enquiries page" in {
      val result = controller.paymentProblemsCorporationTaxEnquiries(fakeRequest)
      status(result) shouldBe OK
      contentAsString(result) shouldBe paymentProblemsCorporationTaxEnquiriesView().toString
    }
  }
}
