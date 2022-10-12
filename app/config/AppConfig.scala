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
  val shutter: Boolean = config.getOptional[Boolean]("features.shutter").getOrElse(false)
  val showCHBCUI: Boolean = config.getOptional[Boolean]("features.showCHBCUI").getOrElse(false)
  val showCITCUI: Boolean = config.getOptional[Boolean]("features.showCITCUI").getOrElse(false)
  val showVATCUI: Boolean = config.getOptional[Boolean]("features.showVATCUI").getOrElse(false)
  val showCTCUI: Boolean = config.getOptional[Boolean]("features.showCTCUI").getOrElse(false)
  val showCISCUI: Boolean = config.getOptional[Boolean]("features.showCISCUI").getOrElse(false)
  val showSACUI: Boolean = config.getOptional[Boolean]("features.showSACUI").getOrElse(false)
  val showOSHCUI: Boolean = config.getOptional[Boolean]("features.showOSHCUI").getOrElse(false)
  val showEHLCUI: Boolean = config.getOptional[Boolean]("features.showEHLCUI").getOrElse(false)
  val showTTCUI: Boolean = config.getOptional[Boolean]("features.showTTCUI").getOrElse(false)

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
  val employerEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/employer-enquiries"
  val onlineServicesHelpdeskReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/online-services-helpdesk"
  val nationalInsuranceApplyUrl: String =
    "https://www.gov.uk/apply-national-insurance-number"
  val paymentProblemsCoronavirusHelplineReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/coronavirus-covid-19-helpline"
  val paymentProblemsBusinessSupportReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/business-payment-support-service"
  val corporationTaxEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/corporation-tax-enquiries"
  val constructionIndustrySchemeReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/construction-industry-scheme"
  val nationalClearanceHubReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-clearance-hub"
  val reportFraudulentActivityUrl: String = "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/report-fraud-to-hmrc"
  val additionalNeedsReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/get-help-from-hmrc-s-extra-support-team"
  val manageYourTaxCreditsUrl: String = "https://www.gov.uk/manage-your-tax-credits"
  val personalTransportUnitEnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/personal-transport-unit-enquiries"
  val ir35EnquiriesReturnUrl: String =
    "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/ir35-enquiries"

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
