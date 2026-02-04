/*
 * Copyright 2023 HM Revenue & Customs
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
import controllers.CiapiController.routes as ciapiRoutes
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import uk.gov.hmrc.webchat.client.WebChatClient
import views.html.webchat.*
import views.html.webchat.dav4.DAv4NationalClearanceHubView
import views.html.webchat.dav4.DAv4AdditionalNeedsHelpView
import views.html.webchat.dav4.DAv4PAYESAResolutionsView
import views.html.webchat.dav4.DAv4BereavementView

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class WebchatController @Inject()(appConfig: AppConfig,
                                  mcc: MessagesControllerComponents,
                                  dav4NationalClearanceHubView: DAv4NationalClearanceHubView,
                                  dav4AdditionalNeedsHelpView: DAv4AdditionalNeedsHelpView,
                                  dav4PAYESAResolutionsView: DAv4PAYESAResolutionsView,
                                  dav4BereavementView: DAv4BereavementView,
                                  serviceUnavailableView: ServiceUnavailableView,
                                  webChatClient: WebChatClient) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def serviceUnavailableRedirect: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def nationalClearanceHub: Action[AnyContent] = Action.async { implicit request =>
    if (config.showDAv4NCH){
      Future.successful(Ok(dav4NationalClearanceHubView(webChatClient.loadRequiredElements().value.get.get)))
    } else {
      Future.successful(NotFound)
    }
  }

  def additionalNeedsHelp: Action[AnyContent] = Action.async { implicit request =>
    if (config.showDAv4ANH){
      Future.successful(Ok(dav4AdditionalNeedsHelpView(webChatClient.loadRequiredElements().value.get.get)))
    } else {
      Future.successful(NotFound)
    }
  }

  def payeandSelfAssessmentResolutions: Action[AnyContent] = Action.async { implicit request =>
    if (config.showDAv4PAYESAR){
      Future.successful(Ok(dav4PAYESAResolutionsView(webChatClient.loadRequiredElements().value.get.get)))
    } else {
      Future.successful(NotFound)
    }
  }

  def bereavement: Action[AnyContent] = Action.async { implicit request =>
    if (config.showDAv4Bereavement) {
      Future.successful(Ok(dav4BereavementView(webChatClient.loadRequiredElements().value.get.get)))
    } else {
      Future.successful(NotFound)
    }
  }

  def serviceUnavailable: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(serviceUnavailableView(webChatClient.loadRequiredElements().value.get.get)))
  }
}
