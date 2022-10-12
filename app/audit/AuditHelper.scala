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

package audit

import config.AppConfig
import javax.inject.{Inject, Singleton}
import models.AuditModel
import play.api.mvc.Request
import uk.gov.hmrc.http.HeaderCarrier
import uk.gov.hmrc.play.audit.AuditExtensions
import uk.gov.hmrc.play.audit.http.connector.AuditConnector
import uk.gov.hmrc.play.audit.model.DataEvent

import scala.concurrent.ExecutionContext

@Singleton
class AuditHelper @Inject()(appConfig: AppConfig, auditConnector: AuditConnector) {

  def audit(auditModel: AuditModel, path: Option[String] = None)(implicit hc: HeaderCarrier, request: Request[_], ec: ExecutionContext): Unit = {
    val dataEvent = toDataEvent(appConfig.serviceIdentifier, auditModel, path.fold(request.path)(x => x))
    auditConnector.sendEvent(dataEvent)
  }

  def toDataEvent(appName: String, auditModel: AuditModel, path: String)(implicit hc: HeaderCarrier): DataEvent =
    DataEvent(
      auditSource = appName,
      auditType = auditModel.auditType,
      tags = AuditExtensions.auditHeaderCarrier(hc).toAuditTags(auditModel.transactionName, path),
      detail = AuditExtensions.auditHeaderCarrier(hc).toAuditDetails(auditModel.detail: _*)
    )
}
