/*
 * Copyright 2021 HM Revenue & Customs
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
import uk.gov.hmrc.play.bootstrap.controller.FrontendController
import views.html.AccessibilityStatementView

import scala.concurrent.Future

@Singleton
class AccessibilityStatementController @Inject()(appConfig: AppConfig,
                                                 mcc: MessagesControllerComponents,
                                                 accessibilityStatementView: AccessibilityStatementView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def accessibility(pageUri: String): Action[AnyContent] = Action.async { implicit request =>
    val uri = appConfig.accessibilityReportUrl(pageUri)
    val deckproIdentifier: String = "-nuance"
    Future.successful(Ok(accessibilityStatementView(uri + deckproIdentifier)))
  }

  def accessibilityNuance: Action[AnyContent] = Action.async { implicit request =>
    val pageUri: String = "nuance"
    val uri = appConfig.accessibilityReportUrl(pageUri)
    Future.successful(Ok(accessibilityStatementView(uri)))
  }

}