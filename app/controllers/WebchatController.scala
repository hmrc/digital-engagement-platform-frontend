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
import controllers.CiapiController.{routes => ciapiRoutes}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.webchat._

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class WebchatController @Inject()(appConfig: AppConfig,
                                  mcc: MessagesControllerComponents,
                                  nationalClearanceHubView: NationalClearanceHubView,
                                  additionalNeedsHelpView: AdditionalNeedsHelpView,
                                  personalTransportUnitEnquiriesView: PersonalTransportUnitEnquiriesView,
                                  ir35EnquiriesView: Ir35EnquiriesView,
                                  serviceUnavailableView: ServiceUnavailableView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def serviceUnavailableRedirect: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async {
      Future.successful(Redirect(ciapiRoutes.CiapiController.onlineServicesHelpdesk))
  }

  def nationalInsuranceNumbers: Action[AnyContent] = serviceUnavailableRedirect

  def customsEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(ciapiRoutes.CiapiController.customsInternationalTrade))
  }

  def incomeTaxEnquiries: Action[AnyContent] = serviceUnavailableRedirect

  def constructionIndustryScheme: Action[AnyContent] = Action.async {
      Future.successful(Redirect(ciapiRoutes.CiapiController.constructionIndustryScheme))
  }

  def nationalClearanceHub: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nationalClearanceHubView()))
  }

  def c19EmployerEnquiries: Action[AnyContent] = serviceUnavailableRedirect

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
