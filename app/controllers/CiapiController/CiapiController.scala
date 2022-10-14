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

import audit.AuditHelper
import config.AppConfig
import play.api.mvc.{Action, AnyContent, MessagesControllerComponents}
import uk.gov.hmrc.play.bootstrap.frontend.controller.FrontendController
import views.html.CIAPIViews._
import views.html.CUIViews._
import javax.inject.{Inject, Singleton}
import models.DAv3AuditModel

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
                                childBenefitCUIDAv2View: childBenefitCUIDAv2View,
                                childBenefitCUIView: ChildBenefitCUIView,
                                constructionIndustrySchemeCUIDAv2View: ConstructionIndustrySchemeCUIDAv2View,
                                constructionIndustrySchemeCUIView: ConstructionIndustrySchemeCUIView,
                                selfAssessmentCUIDAv2View: SelfAssessmentCUIDAv2View,
                                selfAssessmentCUIView: SelfAssessmentCUIView,
                                onlineServicesHelpdeskDav2View: OnlineServicesHelpdeskCUIDAv2View,
                                onlineServicesHelpdeskCUIView: OnlineServicesHelpdeskCUIView,
                                employerEnquiriesCUIView: EmployerEnquiriesCUIView,
                                employerEnquiriesCUIDAv2View: EmployerEnquiriesCUIDAv2View,
                                tradeTariffCUIView: TradeTariffCUIView) extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def askHmrcOnline: Action[AnyContent] = Action.async { implicit request =>
    auditHelper.audit(DAv3AuditModel("askHmrcOnline"))
    Future.successful(Ok(taxCreditsCUIView()))
  }

  def tradeTariff : Action[AnyContent] = Action.async { implicit request =>
    if(config.showTTCUI) {
      auditHelper.audit(DAv3AuditModel("tradeTariff"))
      Future.successful(Ok(tradeTariffCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def customsInternationalTrade : Action[AnyContent] = Action.async { implicit request =>
    if(config.showCITCUI) {
      auditHelper.audit(DAv3AuditModel("customsInternationalTrade"))
      Future.successful(Ok(customsInternationalTradeCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def vatOnline: Action[AnyContent] = Action.async { implicit request =>
    if(config.showVATCUI) {
      auditHelper.audit(DAv3AuditModel("vatOnline"))
      Future.successful(Ok(vatOnlineCuiView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def corporationTax: Action[AnyContent] = Action.async { implicit request =>
    if(config.showCTCUI) {
      auditHelper.audit(DAv3AuditModel("corporationTax"))
      Future.successful(Ok(corporationTaxCuiView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCHBCUI) {
      auditHelper.audit(DAv3AuditModel("childBenefit"))
      Future.successful(Ok(childBenefitCUIView()))
    } else {
      Future.successful(Ok(childBenefitCUIDAv2View()))
    }
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCISCUI) {
      auditHelper.audit(DAv3AuditModel("constructionIndustryScheme"))
      Future.successful(Ok(constructionIndustrySchemeCUIView()))
    } else {
      Future.successful(Ok(constructionIndustrySchemeCUIDAv2View()))
    }
  }

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    if (config.showSACUI) {
      auditHelper.audit(DAv3AuditModel("selfAssessment"))
      Future.successful(Ok(selfAssessmentCUIView()))
    } else {
      Future.successful(Ok(selfAssessmentCUIDAv2View()))
    }
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    if (config.showOSHCUI) {
      auditHelper.audit(DAv3AuditModel("onlineServicesHelpdesk"))
      Future.successful(Ok(onlineServicesHelpdeskCUIView()))
    } else {
      Future.successful(Ok(onlineServicesHelpdeskDav2View()))
    }
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    if (config.showEHLCUI) {
      auditHelper.audit(DAv3AuditModel("employerEnquiries"))
      Future.successful(Ok(employerEnquiriesCUIView()))
    } else {
      Future.successful(Ok(employerEnquiriesCUIDAv2View()))
    }
  }
}
