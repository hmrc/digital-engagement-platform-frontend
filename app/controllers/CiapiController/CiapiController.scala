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

package controllers.CiapiController

import config.AppConfig
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.CIAPIViews.{TaxCreditsCUIView, CustomsInternationalTradeCUIView}
import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class CiapiController @Inject()(appConfig: AppConfig,
                                mcc: MessagesControllerComponents,
                                taxCreditsCUIView: TaxCreditsCUIView,
                                customsInternationalTradeCUIView: CustomsInternationalTradeCUIView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def askHmrcOnline: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(taxCreditsCUIView()))
  }

  def customsInternationalTrade : Action[AnyContent] = Action.async { implicit request =>
    if(config.showCITCUI) {
      Future.successful(Ok(customsInternationalTradeCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }
}
