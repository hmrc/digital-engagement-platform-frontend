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

package controllers.monitoring

import config.AppConfig
import javax.inject.Inject
import models.monitoring.NuanceStatusModel
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController

import scala.concurrent.Future

//The methods in this controller are designed to simulate normally out of the box monitoring. All requests will be received from a users javascript client.
class MonitoringController @Inject()(mcc: MessagesControllerComponents,
                                     appConfig: AppConfig) extends FrontendController(mcc) {

  def monitorNuanceStatus: Action[AnyContent] = Action.async { implicit request =>
    if (appConfig.monitoringFeature && appConfig.nuanceStatusFeature) {
      request.body.asJson match {
        case Some(jsBody) =>
          jsBody.validate[NuanceStatusModel].fold(
            _ => Future.successful(BadRequest),
            success => {
              if (success.key == appConfig.monitoringKey) {
                Future.successful(Status(success.status))
              } else {
                Future.successful(Forbidden)
              }
            }
          )
        case None => Future.successful(BadRequest)
      }
    } else {
      Future.successful(NotFound)
    }
  }
}
