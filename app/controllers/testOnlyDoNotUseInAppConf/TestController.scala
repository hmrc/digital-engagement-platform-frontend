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

package controllers.testOnlyDoNotUseInAppConf

import config.AppConfig

import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.testOnly._

import scala.concurrent.Future

@Singleton
class TestController @Inject()(
  appConfig: AppConfig,
  mcc: MessagesControllerComponents,
  idTestView: IdTestView,
  ciApiDemoViewPopup: CiApiDemoViewPopup,
  ciApiDemoViewProactivePopup: CiApiDemoViewProactivePopup,
  ciApiDemoViewEmbedded: CiApiDemoViewEmbedded,
  persistChatPageOneViewPopup: PersistChatPageOneViewPopup,
  persistChatPageTwoViewPopup: PersistChatPageTwoViewPopup,
  c2cViewPopup: C2cViewPopup,
  c2cFixedViewPopup: C2cFixedViewPopup,
  nuanceFile: NuanceFile,
  mixTestView: MixTestView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def idTest: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(idTestView()))
  }
  def ciApiTestPopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoViewPopup()))
  }
  def ciApiTestProactivePopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoViewProactivePopup()))
  }
  def ciApiTestEmbedded: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoViewEmbedded()))
  }
  def nuanceHtml: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nuanceFile()))
  }
  def mixTest: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(mixTestView()))
  }
  def persistChatPageOne: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(persistChatPageOneViewPopup()))
  }
  def persistChatPageTwo: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(persistChatPageTwoViewPopup()))
  }
  def c2cPopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(c2cViewPopup()))
  }
  def c2cFixedPopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(c2cFixedViewPopup()))
  }
  def keepAlive: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(""))
  }
}
