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

package controllers.CuiController

import config.AppConfig
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.CUIViews._
import views.html.webchat.ServiceUnavailableView
import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class CuiController @Inject()(appConfig: AppConfig,
                              mcc: MessagesControllerComponents,
                              selfAssessmentCUIView: SelfAssessmentCUIView,
                              jobRetentionSchemeHelpView: JobRetentionSchemeHelpView,
                              onlineServicesHelpdeskCUIView: OnlineServicesHelpdeskCUIView,
                              employerEnquiriesCUIView: EmployerEnquiriesCUIView,
                              constructionIndustrySchemeCUIView: ConstructionIndustrySchemeCUIView,
                              childBenefitCUIView: ChildBenefitCUIView,
                              serviceUnavailableView: ServiceUnavailableView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

    def jobRetentionSchemeHelp: Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(jobRetentionSchemeHelpView()))
  }

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    if (config.showSACUI) {
      Future.successful(Ok(selfAssessmentCUIView()))
    }
    else {
      Future.successful(NotFound)
    }
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    if(config.showOSHCUI) {
      Future.successful(Ok(onlineServicesHelpdeskCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    if(config.showEHLCUI) {
      Future.successful(Ok(employerEnquiriesCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    if(config.showDAv2CUI) {
      Future.successful(Ok(constructionIndustrySchemeCUIView()))
    } else {
      Future.successful(Ok(serviceUnavailableView()))
    }
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    if(config.showCHBCUI) {
      Future.successful(Ok(childBenefitCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }
}
