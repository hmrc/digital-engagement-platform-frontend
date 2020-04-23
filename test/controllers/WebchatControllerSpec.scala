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
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.{Matchers, WordSpec}
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.{Cookie, MessagesControllerComponents}
import play.api.test.FakeRequest
import play.api.test.Helpers._
import services.NuanceEncryptionService
import views.html._

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
  val charitiesCommunityAmateurSportsView = app. injector.instanceOf[CharitiesCommunityAmateurSportsView]
  val employingExpatriateEmployeesView = app.injector.instanceOf[EmployingExpatriateEmployeesView]
  val employmentRelatedSecuritiesView = app.injector.instanceOf[EmploymentRelatedSecuritiesView]
  val nonUkResidentEmployeesView = app.injector.instanceOf[NonUkResidentEmployeesView]
  val nonUkResidentLandlordsView = app.injector.instanceOf[NonUkResidentLandlordsView]
  val corporationTaxEnquiriesView = app.injector.instanceOf[CorporationTaxEnquiriesView]
  val constructionIndustrySchemeView = app.injector.instanceOf[ConstructionIndustrySchemeView]
  val vatRegistrationView = app.injector.instanceOf[VatRegistrationView]
  val nationalClearanceHubView = app.injector.instanceOf[NationalClearanceHubView]
  val jobRetentionSchemeView = app.injector.instanceOf[JobRetentionSchemeView]
  val selfEmploymentIncomeSupportView = app.injector.instanceOf[SelfEmploymentIncomeSupportView]

  val nuanceEncryptionService = app.injector.instanceOf[NuanceEncryptionService]

  val messagesCC = app.injector.instanceOf[MessagesControllerComponents]

  private val controller = new WebchatController(
    appConfig,
    messagesCC,
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
    charitiesCommunityAmateurSportsView,
    employingExpatriateEmployeesView,
    employmentRelatedSecuritiesView,
    nonUkResidentEmployeesView,
    nonUkResidentLandlordsView,
    corporationTaxEnquiriesView,
    constructionIndustrySchemeView,
    vatRegistrationView,
    nationalClearanceHubView,
    jobRetentionSchemeView,
    selfEmploymentIncomeSupportView,
    nuanceEncryptionService)

  def asDocument(html: String): Document = Jsoup.parse(html)

  "fixed URLs" should {
    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Self Assessment: webchat"
    }

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Tax credits: webchat"
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Child Benefit: webchat"
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Employers: webchat"
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "VAT: webchat"
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "VAT online services helpdesk: webchat"
    }

    "render online services helpdesk page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Online services helpdesk: webchat"
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "National Insurance: webchat"
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Imports and exports: webchat"
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Income tax for individuals, pensioners and employees: webchat"
    }

    "render charities community sports page" in {
      val result = controller.charitiesCommunitySports(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Charities and Community Amateur Sports Clubs: webchat"
    }

    "render employing expatriate employees page" in {
      val result = controller.employingExpatriateEmployees(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Employing expatriate employees: webchat"
    }

    "render employment related securities page" in {
      val result = controller.employmentRelatedSecurities(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Employment related securities: webchat"
    }

    "Non-UK resident employees page" in {
      val result = controller.nonUkResidentEmployees(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Non-UK resident employees: webchat"
    }

    "Non-UK resident landlords page" in {
      val result = controller.nonUkResidentLandlords(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Non-UK resident landlords: webchat"
    }

    "Corporation tax enquiries page" in {
      val result = controller.corporationTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Corporation Tax: webchat"
    }

    "Construction industry scheme page" in {
      val result = controller.constructionIndustryScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Construction Industry Scheme: webchat"
    }

    "VAT registration page" in {
      val result = controller.vatRegistration(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "VAT registration: webchat"
    }

    "National clearance hub page" in {
      val result = controller.nationalClearanceHub(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "National Clearance Hub: webchat"
    }

    "Job Retention Scheme page" in {
      val result = controller.jobRetentionScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Coronavirus (COVID-19): Job Retention Scheme"
    }

    "Self Employment Income Support Scheme page" in {
      val result = controller.selfEmploymentIncomeSupportScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Coronavirus (COVID-19): Self-employment Income Support Scheme"
    }

  }
}
