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
import views.html.CIAPIViews._
import views.html.CUIViews._

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future

@Singleton
class CiapiController @Inject()(appConfig: AppConfig,
                                mcc: MessagesControllerComponents,
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
                                employerEnquiriesCUIView: EmployerEnquiriesCUIView,
                                employerEnquiriesCUIDAv2View: EmployerEnquiriesCUIDAv2View,
                                onlineServicesHelpdeskDAv2View: OnlineServicesHelpdeskCUIDAv2View,
                                onlineServicesHelpdeskCUIView: OnlineServicesHelpdeskCUIView) extends FrontendController(mcc) {

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

	def vatOnline: Action[AnyContent] = Action.async { implicit request =>
		if(config.showVATCUI) {
			Future.successful(Ok(vatOnlineCuiView()))
		} else {
			Future.successful(NotFound)
		}
	}

  def corporationTax: Action[AnyContent] = Action.async { implicit request =>
    if(config.showCTCUI) {
      Future.successful(Ok(corporationTaxCuiView()))
    } else {
      Future.successful(NotFound)
    }
  }

  def childBenefit: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCHBCUI) {
      Future.successful(Ok(childBenefitCUIView()))
    } else {
      Future.successful(Ok(childBenefitCUIDAv2View()))
    }
  }

  def constructionIndustryScheme: Action[AnyContent] = Action.async { implicit request =>
    if (config.showCISCUI) {
      Future.successful(Ok(constructionIndustrySchemeCUIView()))
    } else {
      Future.successful(Ok(constructionIndustrySchemeCUIDAv2View()))
    }
  }

  def selfAssessment: Action[AnyContent] = Action.async { implicit request =>
    if (config.showSACUI) {
      Future.successful(Ok(selfAssessmentCUIView()))
    } else {
      Future.successful(Ok(selfAssessmentCUIDAv2View()))
    }
  }

  def employerEnquiries: Action[AnyContent] = Action.async { implicit request =>
    if (config.showEHLCUI) {
      Future.successful(Ok(employerEnquiriesCUIView()))
    } else {
      Future.successful(Ok(employerEnquiriesCUIDAv2View()))
    }
  }

  def onlineServicesHelpdesk: Action[AnyContent] = Action.async { implicit request =>
    if (config.showOSHCUI) {
      Future.successful (Ok (onlineServicesHelpdeskCUIView()))
    } else {
      Future.successful (Ok (onlineServicesHelpdeskDAv2View()))
    }
  }
}
