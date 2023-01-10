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

package mocks

import models.AuditModel
import org.mockito.Mockito._
import org.mockito.{AdditionalMatchers, ArgumentMatchers}
import org.scalatest.BeforeAndAfterEach
import play.api.mvc.Request
import uk.gov.hmrc.http.HeaderCarrier
import audit.AuditHelper
import org.scalatest.wordspec.AnyWordSpecLike
import org.scalatestplus.mockito.MockitoSugar
import views.html.pages.helpers.AppBuilderSpecBase

import scala.concurrent.ExecutionContext

trait MockAuditService extends AppBuilderSpecBase with AnyWordSpecLike with BeforeAndAfterEach with MockitoSugar {

  override def beforeEach(): Unit = {
    super.beforeEach()
    reset(mockAuditingService)
  }

  val mockAuditingService: AuditHelper = mock[AuditHelper]

  def verifyAudit(model: AuditModel, path: Option[String] = None): Unit = {
    verify(mockAuditingService).audit(
      ArgumentMatchers.eq(model),
      AdditionalMatchers.or(ArgumentMatchers.eq(path), ArgumentMatchers.isNull)
    )(
      ArgumentMatchers.any[HeaderCarrier],
      ArgumentMatchers.any[Request[_]],
      ArgumentMatchers.any[ExecutionContext]
    )
  }
}
