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

import config.AppConfig
import controllers.CuiController.{routes => cuiRoutes}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents, RequestHeader}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.webchat._

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class WebchatController @Inject()(appConfig: AppConfig,
                                  mcc: MessagesControllerComponents,
                                  customsEnquiriesView: CustomsEnquiriesView,
                                  nationalClearanceHubView: NationalClearanceHubView,
                                  additionalNeedsHelpView: AdditionalNeedsHelpView,
                                  personalTransportUnitEnquiriesView: PersonalTransportUnitEnquiriesView,
                                  ir35EnquiriesView: Ir35EnquiriesView,
                                  serviceUnavailableView: ServiceUnavailableView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  private def isIvrRedirect()(implicit request: RequestHeader): Boolean = {
    request.getQueryString("nuance").contains("ivr")
  }

  def serviceUnavailableRedirect: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def vatEnquiries: Action[AnyContent] = serviceUnavailableRedirect

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async {
      Future.successful(Redirect(cuiRoutes.CuiController.onlineServicesHelpdesk))
  }

  def vatOnlineServicesHelpdesk: Action[AnyContent] = serviceUnavailableRedirect

  def nationalInsuranceNumbers: Action[AnyContent] = serviceUnavailableRedirect

  def customsEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(customsEnquiriesView()))
  }

  def exciseEnquiries: Action[AnyContent] = serviceUnavailableRedirect

  def incomeTaxEnquiries: Action[AnyContent] = serviceUnavailableRedirect

  def charitiesCommunitySports: Action[AnyContent] = serviceUnavailableRedirect

  def employingExpatriateEmployees: Action[AnyContent] = serviceUnavailableRedirect

  def employmentRelatedSecurities: Action[AnyContent] = serviceUnavailableRedirect

  def nonUkResidentEmployees: Action[AnyContent] = serviceUnavailableRedirect

  def nonUkResidentLandlords: Action[AnyContent] = serviceUnavailableRedirect

  def corporationTaxEnquiries: Action[AnyContent] = serviceUnavailableRedirect

  def constructionIndustryScheme: Action[AnyContent] = Action.async {
      Future.successful(Redirect(cuiRoutes.CuiController.constructionIndustryScheme))
  }

  def vatRegistration: Action[AnyContent] = serviceUnavailableRedirect

  def nationalClearanceHub: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nationalClearanceHubView()))
  }

  def jobRetentionScheme: Action[AnyContent] = serviceUnavailableRedirect

  def selfEmploymentIncomeSupportScheme: Action[AnyContent] = serviceUnavailableRedirect

  def c19EmployerEnquiries: Action[AnyContent] = serviceUnavailableRedirect

  def probate: Action[AnyContent] = serviceUnavailableRedirect

  def inheritanceTax: Action[AnyContent] = serviceUnavailableRedirect

  def additionalNeedsHelp: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(additionalNeedsHelpView()))
  }

  def personalTransportUnitEnquiries: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(personalTransportUnitEnquiriesView()))
  }

  def ir35Enquiries: Action[AnyContent] = Action.async { implicit request =>
    if (config.shutter) {
      Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
    } else {
      Future.successful(Ok(ir35EnquiriesView()))
    }
  }

  def serviceUnavailable: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(serviceUnavailableView()))
  }
}
