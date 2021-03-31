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

package controllers.testOnlyDoNotUseInAppConf

import config.AppConfig
import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.CUIViews.{JobRetentionSchemeHelpView, NuanceFullPageCUIView}
import views.html.IdTestView
import views.html.ci_api.CiApiDemoView
import views.html.testOnly.NuanceFile

import scala.concurrent.Future

@Singleton
class NuanceTestController @Inject()(
  appConfig: AppConfig,
  mcc: MessagesControllerComponents,
  nuanceFullPageCUIView: NuanceFullPageCUIView,
  idTestView: IdTestView,
  ciApiDemoView: CiApiDemoView,
  jobRetentionSchemeHelpView: JobRetentionSchemeHelpView,
  nuanceFile: NuanceFile) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def nuanceFullPageCUI: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nuanceFullPageCUIView()))
  }
  def idTest: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(idTestView()))
  }
  def ciApiTest: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoView()))
  }
  def nuanceHtml: Action[AnyContent] = Action.async {
    Future.successful(Ok(nuanceFile()))
  }
}
