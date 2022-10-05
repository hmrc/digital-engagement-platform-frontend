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

package views.html.pages.helpers

import com.codahale.metrics.MetricRegistry
import com.kenshoo.play.metrics.Metrics
import config.AppConfig
import org.scalatest.{Matchers, WordSpecLike}
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import play.api.Application
import play.api.i18n.{Messages, MessagesApi}
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.inject.{Injector, bind}
import play.api.mvc.{AnyContentAsEmpty, BodyParsers}
import play.api.test.FakeRequest
import uk.gov.hmrc.webchat.client.WebChatClient
import uk.gov.hmrc.webchat.testhelpers.WebChatClientStub

class FakeMetrics extends Metrics {
  override val defaultRegistry: MetricRegistry = new MetricRegistry
  override val toJson: String = "{}"
}

trait SpecBase extends WordSpecLike with GuiceOneAppPerSuite with Matchers {

  def injector: Injector = app.injector

  def frontendAppConfig: AppConfig = injector.instanceOf[AppConfig]

  def messagesApi: MessagesApi = injector.instanceOf[MessagesApi]

  def fakeRequest: FakeRequest[AnyContentAsEmpty.type] = FakeRequest("", "")

  def messages: Messages = messagesApi.preferred(fakeRequest)

  val bodyParser:BodyParsers.Default = app.injector.instanceOf[BodyParsers.Default]

}

trait AppBuilderSpecBase extends SpecBase {

  lazy val builder: GuiceApplicationBuilder = new GuiceApplicationBuilder()
    .overrides(
      bind[WebChatClient].toInstance(new WebChatClientStub),
      bind[Metrics].toInstance(new FakeMetrics)
    )

  override lazy val app: Application = builder.build()
}
