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

package config

import javax.inject.{Inject, Singleton}
import play.api.Configuration
import services.NuanceEncryptionService
import uk.gov.hmrc.play.bootstrap.config.ServicesConfig

@Singleton
class AppConfig @Inject()(config: Configuration,
                          servicesConfig: ServicesConfig,
                          val nuanceEncryptionService: NuanceEncryptionService) {

  private val contactHost = config.get[String]("contact-frontend.host")

  private val assetsUrl = config.get[String]("assets.url")
  private val serviceIdentifier = "digital-engagement-platform-frontend"

  val assetsPrefix: String = assetsUrl + config.get[String]("assets.version")
  val analyticsToken: String = config.get[String](s"google-analytics.token")
  val analyticsHost: String = config.get[String](s"google-analytics.host")

  val performanceTest: Boolean = config.get[Boolean](s"performance-test.mode")
  val preProdMode: Boolean = config.get[Boolean](s"pre-prod.mode")

  val reportAProblemPartialUrl: String = s"$contactHost/contact/problem_reports_ajax?service=$serviceIdentifier"
  val reportAProblemNonJSUrl: String = s"$contactHost/contact/problem_reports_nonjs?service=$serviceIdentifier"

  val nuanceUrl: String =
    "https://hmrc-uk.digital.nuance.com/chatskins/launch/inqChatLaunch10006719.js"
  val nuancePreProdUrl: String =
    "https://hmrc-uk-preprod.digital.nuance.com/chatskins/launch/inqChatLaunch10006719.js"

  val contactUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact"

  val selfAssessmentReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/self-assessment"
  val taxCreditsEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/tax-credits-enquiries"
  val childBenefitReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/child-benefit"
  val incomeTaxEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/income-tax-enquiries-for-individuals-pensioners-and-employees"
  val employerEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/employer-enquiries"
  val vatEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/vat-enquiries"
  val vatOnlineServicesHelpdeskReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/vat-online-services-helpdesk"
  val onlineServicesHelpdeskReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/online-services-helpdesk"
  val nationalInsuranceReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-insurance-numbers"
  val customsEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/customs-international-trade-and-excise-enquiries"
  val charitiesCommunityAmateurSportsUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/charities-and-community-amateur-sports-clubs-cascs"
  val employingExpatriateEmployeesUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/enquiries-from-employers-with-expatriate-employees"
  val employmentRelatedSecuritiesUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/share-schemes-for-employees"
  val nonUkResidentEmployeesUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/non-uk-expatriate-employees-expats"
  val nonUkResidentLandlordsUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/non-resident-landlords"
  val paymentProblemsCoronavirusHelplineReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/coronavirus-covid-19-helpline"
  val paymentProblemsBusinessSupportReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/business-payment-support-service"
  val corporationTaxEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/corporation-tax-enquiries"
  val constructionIndustrySchemeReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/construction-industry-scheme"
  val vatRegistrationReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/vat-registration-applications-exceptions-and-changes"
  val nationalClearanceHubReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-clearance-hub"
  val coronavirusGeneralInfoUrl: String = "https://www.gov.uk/coronavirus"
  val selfEmploymentIncomeSupportReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-with-the-self-employment-income-support-scheme"
  val jobRetentionSchemeReturnUrl: String =
  "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-with-the-coronavirus-job-retention-scheme"
  val probateReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/probate-general-enquiries"
  val inheritanceTaxReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/probate-and-inheritance-tax-enquiries"
  val additionalNeedsReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-from-hmrc-s-extra-support-team"
  val nonUkResidentEntertainersUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/non-uk-resident-entertainers"
}

