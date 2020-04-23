/*
 * Copyright 2020 HM Revenue & Customs
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

import javax.inject.{Inject, Singleton}
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import config.AppConfig
import services.NuanceEncryptionService
import views.html._
import uk.gov.hmrc.play.bootstrap.controller.FrontendController

import scala.concurrent.Future

@Singleton
class IvrController @Inject()(appConfig: AppConfig,
                              mcc: MessagesControllerComponents,
                              taxCreditsView: TaxCreditsView,
                              childBenefitView: ChildBenefitView,
                              incomeTaxEnquiriesView: IncomeTaxEnquiriesView,
                              employerEnquiriesView: EmployerEnquiriesView,
                              vatEnquiriesView: VatEnquiriesView,
                              nationalInsuranceNumbersView: NationalInsuranceNumbersView,
                              customsEnquiriesView: CustomsEnquiriesView,
                              selfAssessmentView: SelfAssessmentView,
                              nuanceEncryptionService: NuanceEncryptionService) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  val param: String = "?nuance=ivr"

  def taxCredits: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.taxCredits().url + param))
  }

  def childBenefit: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.childBenefit().url + param))
  }

  def incomeTaxEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.incomeTaxEnquiries().url + param))
  }

  def employerEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.employerEnquiries().url + param))
  }

  def vatEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.vatEnquiries().url + param))
  }

  def nationalInsuranceNumbers: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.nationalInsuranceNumbers().url + param))
  }

  def customsEnquiries: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.customsEnquiries().url + param))
  }

  def selfAssessment: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.selfAssessment().url + param))
  }

  def jobRetentionScheme: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.jobRetentionScheme().url + param))
  }

  def selfEmploymentIncomeSupportScheme: Action[AnyContent] = Action.async {
    Future.successful(Redirect(controllers.routes.WebchatController.selfEmploymentIncomeSupportScheme().url + param))
  }

}
