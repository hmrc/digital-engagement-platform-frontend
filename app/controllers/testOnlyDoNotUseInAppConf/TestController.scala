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
import uk.gov.hmrc.webchat.client.WebChatClient
import views.html.testOnly.*

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
  mixTestView: MixTestView,
  webChatClient: WebChatClient) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def idTest: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(idTestView(webChatClient.loadRequiredElements().value.get.get)))
  }
  def ciApiTestPopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoViewPopup(webChatClient.loadRequiredElements().value.get.get)))
  }
  def ciApiTestProactivePopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoViewProactivePopup(webChatClient.loadRequiredElements().value.get.get)))
  }
  def ciApiTestEmbedded: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ciApiDemoViewEmbedded(webChatClient.loadRequiredElements().value.get.get)))
  }
  def nuanceHtml: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(nuanceFile()))
  }
  def mixTest: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(mixTestView(webChatClient.loadRequiredElements().value.get.get)))
  }
  def persistChatPageOne: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(persistChatPageOneViewPopup(webChatClient.loadRequiredElements().value.get.get)))
  }
  def persistChatPageTwo: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(persistChatPageTwoViewPopup(webChatClient.loadRequiredElements().value.get.get)))
  }
  def c2cPopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(c2cViewPopup(webChatClient.loadRequiredElements().value.get.get)))
  }
  def c2cFixedPopup: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(c2cFixedViewPopup(webChatClient.loadRequiredElements().value.get.get)))
  }
}
