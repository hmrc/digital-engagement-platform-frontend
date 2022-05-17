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

package config

import play.api.Configuration

import java.net.URLEncoder
import javax.inject.{Inject, Singleton}

@Singleton
class AppConfig @Inject()(config: Configuration) {

  private val contactHost = config.get[String]("contact-frontend.host")

  private def encodeUrl(url: String): String = URLEncoder.encode(url, "UTF-8")

  val serviceIdentifier: String = "digital-engagement-platform-frontend"

  val performanceTest: Boolean = config.get[Boolean]("performance-test.mode")

  // Feature Toggles
  val showSACUI: Boolean = config.getOptional[Boolean]("features.showSACUI").getOrElse(false)
  val showCJRSSidebar: Boolean = config.getOptional[Boolean]("features.showCJRSSidebar").getOrElse(false)
  val useDAv3: Boolean = config.getOptional[Boolean]("features.useDAv3").getOrElse(false)
  var featureNoChatExperiment: Boolean = config.getOptional[Boolean]("features.noChatExperiment").getOrElse(false)
  val showOSHCUI: Boolean = config.getOptional[Boolean]("features.showOSHCUI").getOrElse(false)
  val shutter: Boolean = config.getOptional[Boolean]("features.shutter").getOrElse(false)
  val showEHLCUI: Boolean = config.getOptional[Boolean]("features.showEHLCUI").getOrElse(false)

  // Used in wrapper
  val analyticsToken: String = config.get[String]("google-analytics.token")
  val analyticsHost: String = config.get[String]("google-analytics.host")
  val reportAProblemPartialUrl: String = s"$contactHost/contact/problem_reports_ajax?service=$serviceIdentifier"
  val reportAProblemNonJSUrl: String = s"$contactHost/contact/problem_reports_nonjs?service=$serviceIdentifier"
  val betaFeedbackUnauthenticatedUrl = s"$contactHost/contact/beta-feedback-unauthenticated?service=$serviceIdentifier"


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
  val nationalInsuranceApplyUrl: String =
    "https://www.gov.uk/apply-national-insurance-number"
  val customsEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/customs-international-trade-and-excise-enquiries"
  val exciseEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/excise-enquiries"
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
  val reportFraudulentActivityUrl: String = "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/report-fraud-to-hmrc"
  val checkCoveredByCoronavirusJRSUrl: String = "https://www.gov.uk/guidance/check-if-you-could-be-covered-by-the-coronavirus-job-retention-scheme"
  val probateReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/probate-general-enquiries"
  val c19EmployerEnquiriesReturnRul: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-with-the-statutory-sick-pay-rebate-scheme"
  val inheritanceTaxReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/probate-and-inheritance-tax-enquiries"
  val additionalNeedsReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-from-hmrc-s-extra-support-team"
  val nonUkResidentEntertainersUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/non-uk-resident-entertainers"
  val manageYourTaxCreditsUrl: String = "https://www.gov.uk/manage-your-tax-credits"
  val personalTransportUnitEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/personal-transport-unit-enquiries"
  val ir35EnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/ir35-enquiries"
  val customsInternationTradeEoriUrl: String = "https://www.gov.uk/eori"
  val customsInternationTradeImportLink: String = "https://www.gov.uk/guidance/transfer-of-residence-to-great-britain"
  val customsInternationTradeTariffLink: String = "https://www.gov.uk/trade-tariff"
  val customsInternationTradeWithNILink: String = "https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland"

  val stampDutyLAndTaxReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/stamp-duty-land-tax"
  val stampDutyReserveTaxReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/stamp-duty-reserve-tax"
  val stampDutySharesAndLAndReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/stamp-duty-enquiries-shares-and-land"
  val AnnualTaxOnEnvelopedDwellingsReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/annual-tax-on-enveloped-dwellings-ated"
  val contactHMRC: String = "https://www.gov.uk/contact-hmrc"

  private def accessibilityHost = config.get[String]("accessibility-statement-frontend.host")

  private def accessibilityPath = config.get[String]("accessibility-statement-frontend.path")

  private val accessibilityStatementFrontendUrl: String = s"$accessibilityHost$accessibilityPath/$serviceIdentifier"

  def accessibilityStatementUrl(referrerUrl: String): String = {
    s"$accessibilityStatementFrontendUrl?referrerUrl=${encodeUrl(referrerUrl)}"
  }

  def accessibilityStatementLink(pageUri: String): String = {
    controllers.routes.AccessibilityStatementController.accessibility(Some(pageUri)).url
  }
}
