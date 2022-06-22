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
import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import scala.concurrent.Future

@Singleton
class IvrController @Inject()(appConfig: AppConfig,
                              mcc: MessagesControllerComponents) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  val param: String = "?nuance=ivr"

  def incomeTaxEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def employerEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def vatEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def nationalInsuranceNumbers: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def exciseEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def jobRetentionScheme: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def selfEmploymentIncomeSupportScheme: Action[AnyContent] = Action.async {
    Future.successful(Redirect(routes.WebchatController.serviceUnavailable))
  }

  def c19EmployerEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.c19EmployerEnquiries + param))
  }
}
