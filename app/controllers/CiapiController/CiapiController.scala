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
import views.html.webchat.dav4.DAv4DebtManagementView

import scala.concurrent.Future
import scala.concurrent.ExecutionContext

@Singleton
class CiapiController @Inject()(appConfig: AppConfig,
                                mcc: MessagesControllerComponents,
                                auditHelper: AuditHelper,
                                askHMRCOnlineCIAPIView: AskHMRCOnlineCIAPIView,
                                nationalMinimumWageCUIView: NationalMinimumWageCUIView,
                                tradeTariffCUIView: TradeTariffCUIView,
                                debtManagementCUIView: DebtManagementCUIView,
                                dav4DebtManagementView: DAv4DebtManagementView
                                )(implicit ec: ExecutionContext)
  extends FrontendController(mcc) {

  implicit val config: AppConfig = appConfig

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCHBCUI) {
      auditHelper.audit(DAv3AuditModel("childBenefit"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def customsInternationalTrade : Action[AnyContent] = Action.async { implicit request =>
    if (config.showCITCUI) {
      auditHelper.audit(DAv3AuditModel("customsInternationalTrade"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def vatOnline: Action[AnyContent] = Action.async { implicit request =>
    if (config.showVATCUI) {
      auditHelper.audit(DAv3AuditModel("vatOnline"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def corporationTax: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCTCUI) {
      auditHelper.audit(DAv3AuditModel("corporationTax"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCISCUI) {
      auditHelper.audit(DAv3AuditModel("constructionIndustryScheme"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    if (config.showSACUI) {
      auditHelper.audit(DAv3AuditModel("selfAssessment"))
      Future.successful(Ok(askHMRCOnlineCIAPIView(displayBannerSA = true)))
    } else {
      Future.successful(NotFound)
    }
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    if (config.showOSHCUI) {
      auditHelper.audit(DAv3AuditModel("onlineServicesHelpdesk"))
      Future.successful(Ok(askHMRCOnlineCIAPIView(displayBannerOSH = true)))
    } else {
      Future.successful(NotFound)
    }
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    if (config.showEHLCUI) {
      auditHelper.audit(DAv3AuditModel("employerEnquiries"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def tradeTariff : Action[AnyContent] = Action.async { implicit request =>
    if (config.showTTCUI) {
      auditHelper.audit(DAv3AuditModel("tradeTariff"))
      Future.successful(Ok(tradeTariffCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def askHmrcOnline: Action[AnyContent] = Action.async { implicit request =>
    if (config.showTCCUI) {
      auditHelper.audit(DAv3AuditModel("askHmrcOnline"))
      Future.successful(Ok(askHMRCOnlineCIAPIView(displayBannerTC = false)))
    } else {
      Future.successful(NotFound)
    }
  }

  def debtManagement: Action[AnyContent] = Action.async { implicit request =>
    if (config.showDMCUI) {
      auditHelper.audit(DAv3AuditModel("debtManagement"))
      val webchatOnly = request.uri.contains("payment-plan-chat")
      if(webchatOnly && config.showDAv4DM) {
        Future.successful(Ok(dav4DebtManagementView()))
      } else {
        Future.successful(Ok(debtManagementCUIView(webchatOnly)))
      }
    } else {
      Future.successful(NotFound)
    }
  }

  def nationalInsurance: Action[AnyContent] = Action.async { implicit request =>
    if (config.showNICUI) {
      auditHelper.audit(DAv3AuditModel("nationalInsurance"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def nationalMinimumWage : Action[AnyContent] = Action.async { implicit request =>
    if (config.showNMWCUI) {
      auditHelper.audit(DAv3AuditModel("nationalMinimumWage"))
      Future.successful(Ok(nationalMinimumWageCUIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def paye : Action[AnyContent] = Action.async { implicit request =>
    if (config.showPAYECUI) {
      auditHelper.audit(DAv3AuditModel("paye"))
      Future.successful(Ok(askHMRCOnlineCIAPIView(displayBannerPAYE = true)))
    } else {
      Future.successful(NotFound)
    }
  }

  def inheritanceTax: Action[AnyContent] = Action.async { implicit request =>
    if (config.showIHTCUI) {
      auditHelper.audit(DAv3AuditModel("inheritanceTax"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def antiMoneyLaunderingServices: Action[AnyContent] = Action.async { implicit request =>
    if (config.showAMLSCUI) {
      auditHelper.audit(DAv3AuditModel("antiMoneyLaunderingServices"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def helpToSave: Action[AnyContent] = Action.async { implicit request =>
    if (config.showH2SCUI) {
      auditHelper.audit(DAv3AuditModel("helpToSave"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def agentDedicatedLine: Action[AnyContent] = Action.async { implicit request =>
    if (config.showADLCUI) {
      auditHelper.audit(DAv3AuditModel("agentDedicatedLine"))
      Future.successful(Ok(askHMRCOnlineCIAPIView(displayBannerADL = true)))
    } else {
      Future.successful(NotFound)
    }
  }

  def trusts: Action[AnyContent] = Action.async { implicit request =>
    if (config.showTrusts) {
      auditHelper.audit(DAv3AuditModel("trusts"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def childcareService: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCSCUI) {
      auditHelper.audit(DAv3AuditModel("childcareService"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def additionalIncome: Action[AnyContent] = Action.async { implicit request =>
    if (config.showAddIncCUI) {
      auditHelper.audit(DAv3AuditModel("additionalIncome"))
      Future.successful(Ok(askHMRCOnlineCIAPIView()))
    } else {
      Future.successful(NotFound)
    }
  }
}
