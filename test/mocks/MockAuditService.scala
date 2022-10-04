package mocks

import models.AuditModel
import org.mockito.Mockito._
import org.mockito.{AdditionalMatchers, ArgumentMatchers}
import org.scalatest.{BeforeAndAfterEach, WordSpecLike}
import play.api.mvc.Request
import uk.gov.hmrc.http.HeaderCarrier
import audit.AuditHelper
import org.scalatestplus.mockito.MockitoSugar
import views.html.pages.helpers.AppBuilderSpecBase

import scala.concurrent.ExecutionContext

trait MockAuditService extends AppBuilderSpecBase with WordSpecLike with BeforeAndAfterEach with MockitoSugar {

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
