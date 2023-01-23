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

package controllers.CiapiController

import audit.AuditHelper
import config.AppConfig
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.CIAPIViews._
import javax.inject.{Inject, Singleton}
import models.DAv3AuditModel
import play.api.mvc.Cookie

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class CiapiController @Inject()(appConfig: AppConfig,
                                mcc: MessagesControllerComponents,
                                auditHelper: AuditHelper,
                                taxCreditsCUIView: TaxCreditsCUIView,
                                customsInternationalTradeCUIView: CustomsInternationalTradeCUIView,
                                vatOnlineCuiView: VatOnlineCuiView,
                                corporationTaxCuiView: CorporationTaxCuiView,
                                childBenefitCUIView: ChildBenefitCUIView,
                                constructionIndustrySchemeCUIView: ConstructionIndustrySchemeCUIView,
                                selfAssessmentCUIView: SelfAssessmentCUIView,
                                onlineServicesHelpdeskCUIView: OnlineServicesHelpdeskCUIView,
                                employerEnquiriesCUIView: EmployerEnquiriesCUIView,
                                tradeTariffCUIView: TradeTariffCUIView,
                                debtManagementCUIView: DebtManagementCUIView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def askHmrcOnline: Action[AnyContent] = Action.async { implicit request =>
    auditHelper.audit(DAv3AuditModel("askHmrcOnline"))
		Future.successful(Ok(taxCreditsCUIView()).withCookies(Cookie("test", "value")))
  }

  def tradeTariff : Action[AnyContent] = Action.async { implicit request =>
    auditHelper.audit(DAv3AuditModel("tradeTariff"))
    Future.successful(Ok(tradeTariffCUIView()))
  }

  def customsInternationalTrade : Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("customsInternationalTrade"))
      Future.successful(Ok(customsInternationalTradeCUIView()))
  }

  def vatOnline: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("vatOnline"))
      Future.successful(Ok(vatOnlineCuiView()))
  }

  def corporationTax: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("corporationTax"))
      Future.successful(Ok(corporationTaxCuiView()))
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("childBenefit"))
      Future.successful(Ok(childBenefitCUIView()))
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("constructionIndustryScheme"))
      Future.successful(Ok(constructionIndustrySchemeCUIView()))
  }

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("selfAssessment"))
      Future.successful(Ok(selfAssessmentCUIView()))
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("onlineServicesHelpdesk"))
      Future.successful(Ok(onlineServicesHelpdeskCUIView()))
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
      auditHelper.audit(DAv3AuditModel("employerEnquiries"))
      Future.successful(Ok(employerEnquiriesCUIView()))
  }

  def debtManagement: Action[AnyContent] = Action.async { implicit request =>
    if (config.showDMCUI) {
      Future.successful(Ok(debtManagementCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }
}
