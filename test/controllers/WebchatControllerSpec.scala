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

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.test.Helpers._
import views.html.pages.AppBuilderSpecBase

class WebchatControllerSpec
    extends AppBuilderSpecBase
    with ScalaCheckPropertyChecks {

  private val controller = app.injector.instanceOf[WebchatController]
  def asDocument(html: String): Document = Jsoup.parse(html)

  "fixed URLs" should {
    "render self-assessment page" in {
      val result = controller.selfAssessment(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Self Assessment: webchat"
    }

    "render tax-credits page" in {
      val result = controller.taxCredits(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Tax credits: webchat"
    }

    "render child benefit page" in {
      val result = controller.childBenefit(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Child Benefit: webchat"
    }

    "render employer enquiries page" in {
      val result = controller.employerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Employers: webchat"
    }

    "render vat enquiries page" in {
      val result = controller.vatEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "VAT: webchat"
    }

    "render vat online helpdesk page" in {
      val result = controller.vatOnlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "VAT online services helpdesk: webchat"
    }

    "render online services helpdesk page" in {
      val result = controller.onlineServicesHelpdesk(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Online services helpdesk: webchat"
    }

    "render national insurance page" in {
      val result = controller.nationalInsuranceNumbers(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "National Insurance: webchat"
    }

    "render customs page" in {
      val result = controller.customsEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Imports and exports: webchat"
    }

    "render excise page" in {
      val result = controller.exciseEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Excise: webchat"
    }

    "render income tax enquiries page" in {
      val result = controller.incomeTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Income tax for individuals, pensioners and employees: webchat"
    }

    "render charities community sports page" in {
      val result = controller.charitiesCommunitySports(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Charities and Community Amateur Sports Clubs: webchat"
    }

    "render employing expatriate employees page" in {
      val result = controller.employingExpatriateEmployees(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Employing expatriate employees: webchat"
    }

    "render employment related securities page" in {
      val result = controller.employmentRelatedSecurities(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Employment related securities: webchat"
    }

    "Non-UK resident employees page" in {
      val result = controller.nonUkResidentEmployees(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Non-UK resident employees: webchat"
    }

    "Non-UK resident landlords page" in {
      val result = controller.nonUkResidentLandlords(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Non-UK resident landlords: webchat"
    }

    "Corporation tax enquiries page" in {
      val result = controller.corporationTaxEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Corporation Tax: webchat"
    }

    "Construction industry scheme page" in {
      val result = controller.constructionIndustryScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Construction Industry Scheme: webchat"
    }

    "VAT registration page" in {
      val result = controller.vatRegistration(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "VAT registration: webchat"
    }

    "National clearance hub page" in {
      val result = controller.nationalClearanceHub(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "National Clearance Hub: webchat"
    }

    "Job Retention Scheme page" in {
      val result = controller.jobRetentionScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus (COVID-19): Job Retention Scheme"
    }

    "Self Employment Income Support Scheme page" in {
      val result = controller.selfEmploymentIncomeSupportScheme(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus (COVID-19): Self-Employment Income Support Scheme"
    }

    "C19 Employer Enquiries page" in {
      val result = controller.c19EmployerEnquiries(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus (COVID-19): Statutory Sick Pay rebate scheme"
    }

    "Probate page" in {
      val result = controller.probate(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus (COVID-19): Probate"
    }

    "Inheritance page" in {
      val result = controller.inheritanceTax(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus (COVID-19): Inheritance Tax"
    }

    "Additional Needs page" in {
      val result = controller.additionalNeedsHelp(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "HMRC’s Extra Support team: webchat"
    }

    "Eat Out To Help Out page" in {
      val result = controller.eatOutToHelpOut(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Eat Out to Help Out scheme: webchat"
    }

    "Personal Transport Unit Enquiries page" in {
      val result = controller.personalTransportUnitEnquiries (fakeRequest)
      val doc = asDocument (contentAsString (result) )

      status (result) mustBe OK
      doc.select ("h1").text () mustBe "Personal Transport Unit: webchat"
    }
  }
}
