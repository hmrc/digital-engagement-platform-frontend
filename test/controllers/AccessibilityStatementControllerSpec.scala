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

import config.AppConfig
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.{Matchers, WordSpec}
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.mvc.{Cookie, MessagesControllerComponents}
import play.api.test.FakeRequest
import play.api.test.Helpers._
import services.NuanceEncryptionService
import views.html.AccessibilityStatementView

class AccessibilityStatementControllerSpec
  extends WordSpec
    with Matchers
    with GuiceOneAppPerSuite
    with ScalaCheckPropertyChecks{

  implicit private val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  implicit val appConfig = app.injector.instanceOf[AppConfig]
  val messagesCC = app.injector.instanceOf[MessagesControllerComponents]
  val accessibilityStatementView =app.injector.instanceOf[AccessibilityStatementView]
  val nuanceEncryptionService = app.injector.instanceOf[NuanceEncryptionService]

  private val controller = new AccessibilityStatementController(
    appConfig,
    messagesCC,
    accessibilityStatementView,
    nuanceEncryptionService
  )

  def asDocument(html: String): Document = Jsoup.parse(html)

  "fixed URLs" should {
    "render accessibility statement page" in {
      val result = controller.accessibility(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) shouldBe OK
      doc.select("h1").text() shouldBe "Accessibility statement for webchat and digital assistant"
    }
  }
}