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

package controllers.IvrController

import config.AppConfig
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.IVR.SelfAssessmentIVRView
import views.html.IVR.NationalInsuranceIVRView
import views.html.IVR.DebtManagementIVRView
import views.html.IVR.EmployerHelplineIVRView
import views.html.IVR.ConstructionIndustrySchemeIVRView
import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class IvrController @Inject()(appConfig: AppConfig,
                              mcc: MessagesControllerComponents,
                              selfAssessmentIVRView: SelfAssessmentIVRView,
                              debtManagementIVRView: DebtManagementIVRView,
                              nationalInsuranceIVRView: NationalInsuranceIVRView,
                              employerHelplineIVRView: EmployerHelplineIVRView,
                              constructionIndustrySchemeIVRView: ConstructionIndustrySchemeIVRView
                             ) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    if (config.showIVRWebchatSA) {
      Future.successful(Ok(selfAssessmentIVRView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def nationalInsurance: Action[AnyContent] = Action.async { implicit request =>
    if (config.showIVRWebchatNI) {
      Future.successful(Ok(nationalInsuranceIVRView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def employerHelpline: Action[AnyContent] = Action.async { implicit request =>
    if (config.showIVRWebchatEHL) {
      Future.successful(Ok(employerHelplineIVRView()))
    } else {
        Future.successful(NotFound)
      }
    }
  
  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    if (config.showIVRWebchatCIS) {
      Future.successful(Ok(constructionIndustrySchemeIVRView()))
    } else {
      Future.successful(NotFound)
    }
  }
  
  def debtManagement: Action[AnyContent] = Action.async { implicit request =>
    if (config.showIVRWebchatDM) {
      Future.successful(Ok(debtManagementIVRView()))
    } else {
      Future.successful(NotFound)
    }
  }
}
