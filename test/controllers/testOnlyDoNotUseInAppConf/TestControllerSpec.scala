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

package controllers.testOnlyDoNotUseInAppConf

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class TestControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike {

  private val controller = app.injector.instanceOf[TestController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "Nuance Full Page CUI Test Controller" should {

    "render idTest page" in {
      val result = controller.idTest(fakeRequest)

      status(result) mustBe OK
    }

    "render ciApiTest popup page" in {
      val result = controller.ciApiTestPopup(fakeRequest)

      status(result) mustBe OK
    }

    "render ciApiTest embedded page" in {
      val result = controller.ciApiTestEmbedded(fakeRequest)

      status(result) mustBe OK
    }

    "render nuanceHtml page" in {
      val result = controller.nuanceHtml(fakeRequest)

      status(result) mustBe OK
    }

    "render mixTest page" in {
      val result = controller.mixTest(fakeRequest)

      status(result) mustBe OK
    }

    "render proactivePopup page" in {
      val result = controller.ciApiTestProactivePopup(fakeRequest)

      status(result) mustBe OK
    }

    "render persistChatPageOne page" in {
      val result = controller.persistChatPageOne(fakeRequest)

      status(result) mustBe OK
    }

    "render persistChatPageTwo page" in {
      val result = controller.persistChatPageTwo(fakeRequest)

      status(result) mustBe OK
    }
  }
}
