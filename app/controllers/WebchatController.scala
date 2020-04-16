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

import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import config.AppConfig
import services.NuanceEncryptionService
import views.html._
import uk.gov.hmrc.play.bootstrap.controller.FrontendController

import scala.concurrent.Future

@Singleton
class WebchatController @Inject()(appConfig: AppConfig,
                                  mcc: MessagesControllerComponents,
                                  selfAssessmentView: SelfAssessmentView,
                                  taxCreditsView: TaxCreditsView,
                                  childBenefitView: ChildBenefitView,
                                  customsEnquiriesView: CustomsEnquiriesView,
                                  employerEnquiriesView: EmployerEnquiriesView,
                                  incomeTaxEnquiriesView: IncomeTaxEnquiriesView,
                                  nationalInsuranceNumbersView: NationalInsuranceNumbersView,
                                  onlineServiceHelpdeskView: OnlineServiceHelpdeskView,
                                  vatEnquiriesView: VatEnquiriesView,
                                  vatOnlineServiceHelpdeskView: VatOnlineServicesHelpdeskView,
                                  charitiesCommunitySportsView: CharitiesCommunityAmateurSportsView,
                                  employingExpatriateEmployeesView: EmployingExpatriateEmployeesView,
                                  employmentRelatedSecuritiesView: EmploymentRelatedSecuritiesView,
                                  nonUkResidentEmployeesView: NonUkResidentEmployeesView,
                                  nonUkResidentLandlordsView: NonUkResidentLandlordsView,
                                  corporationTaxEnquiriesView: CorporationTaxEnquiriesView,
                                  constructionIndustrySchemeView: ConstructionIndustrySchemeView,
                                  vatRegistrationView: VatRegistrationView,
                                  nationalClearanceHubView: NationalClearanceHubView,
                                  jobRetentionSchemeView: JobRetentionSchemeView,
                                  nuanceEncryptionService: NuanceEncryptionService) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(selfAssessmentView()))
  }

  def taxCredits: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(taxCreditsView()))
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(childBenefitView()))
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(employerEnquiriesView()))
  }

  def vatEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(vatEnquiriesView()))
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(onlineServiceHelpdeskView()))
  }

  def vatOnlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(vatOnlineServiceHelpdeskView()))
  }

  def nationalInsuranceNumbers: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nationalInsuranceNumbersView()))
  }

  def customsEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(customsEnquiriesView()))
  }

  def incomeTaxEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(incomeTaxEnquiriesView()))
  }

  def charitiesCommunitySports: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(charitiesCommunitySportsView()))
  }

  def employingExpatriateEmployees: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(employingExpatriateEmployeesView()))
  }

  def employmentRelatedSecurities: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(employmentRelatedSecuritiesView()))
  }

  def nonUkResidentEmployees: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nonUkResidentEmployeesView()))
  }

  def nonUkResidentLandlords: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nonUkResidentLandlordsView()))
  }

  def corporationTaxEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(corporationTaxEnquiriesView()))
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(constructionIndustrySchemeView()))
  }

  def vatRegistration: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(vatRegistrationView()))
  }

  def nationalClearanceHub: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nationalClearanceHubView()))
  }

  def jobRetentionScheme: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(jobRetentionSchemeView()))
  }

}
