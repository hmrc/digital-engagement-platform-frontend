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
import javax.inject.Inject
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController

import scala.concurrent.Future

class FeatureSwitchController @Inject()(mcc: MessagesControllerComponents,
                                         appConfig: AppConfig) extends FrontendController(mcc) {

	//This controller receives a request from a javascript user to determine if they are allowed to access a feature within an environment
  def getFeatureSwitch(switchName: String): Action[AnyContent] = Action.async { implicit request =>
    val result = switchName match {
      case "test" => appConfig.testSwitch
      case _ => false
    }

    if (result) {
      Future.successful(NoContent)
    } else {
      Future.successful(Forbidden)
    }
  }
}
