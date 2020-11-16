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
import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents, RequestHeader}
import uk.gov.hmrc.play.bootstrap.controller.FrontendController
import views.html._

import scala.concurrent.Future

@Singleton
class WebchatController @Inject()(appConfig: AppConfig,
                                  mcc: MessagesControllerComponents,
                                  selfAssessmentView: SelfAssessmentView,
                                  taxCreditsView: TaxCreditsView,
                                  childBenefitView: ChildBenefitView,
                                  customsEnquiriesView: CustomsEnquiriesView,
                                  exciseEnquiriesView: ExciseEnquiriesView,
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
                                  selfEmploymentIncomeSupportSchemeView: SelfEmploymentIncomeSupportView,
                                  c19EmployerEnquiriesView: C19EmployerEnquiriesView,
                                  probateView: ProbateView,
                                  inheritanceTaxView: InheritanceTaxView,
                                  additionalNeedsHelpView: AdditionalNeedsHelpView,
                                  eatOutToHelpOutView: EatOutToHelpOutView,
                                  personalTransportUnitEnquiriesView: PersonalTransportUnitEnquiriesView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  private def isIvrRedirect()(implicit request: RequestHeader): Boolean = {
    request.getQueryString("nuance").contains("ivr")
  }

  private def isEntertainersRedirect()(implicit request: RequestHeader): Boolean = {
    request.getQueryString("redirect").contains("entertainers")
  }

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(selfAssessmentView(isIvrRedirect())))
  }

  def taxCredits: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(taxCreditsView(isIvrRedirect())))
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(childBenefitView(isIvrRedirect())))
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(employerEnquiriesView(isIvrRedirect())))
  }

  def vatEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(vatEnquiriesView(isIvrRedirect())))
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(onlineServiceHelpdeskView()))
  }

  def vatOnlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(vatOnlineServiceHelpdeskView()))
  }

  def nationalInsuranceNumbers: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nationalInsuranceNumbersView(isIvrRedirect())))
  }

  def customsEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(customsEnquiriesView(isIvrRedirect())))
  }

  def exciseEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(exciseEnquiriesView(isIvrRedirect())))
  }

  def incomeTaxEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(incomeTaxEnquiriesView(isIvrRedirect())))
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
    Future.successful(Ok(nonUkResidentLandlordsView(isEntertainersRedirect())))
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
    Future.successful(Ok(jobRetentionSchemeView(isIvrRedirect())))
  }

  def selfEmploymentIncomeSupportScheme: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(selfEmploymentIncomeSupportSchemeView(isIvrRedirect())))
  }

  def c19EmployerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(c19EmployerEnquiriesView(isIvrRedirect())))
  }

  def probate: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(probateView()))
  }

  def inheritanceTax: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(inheritanceTaxView()))
  }

  def additionalNeedsHelp: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(additionalNeedsHelpView()))
  }

  def eatOutToHelpOut: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(eatOutToHelpOutView(isIvrRedirect())))
  }

  def personalTransportUnitEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(personalTransportUnitEnquiriesView()))
  }
}
