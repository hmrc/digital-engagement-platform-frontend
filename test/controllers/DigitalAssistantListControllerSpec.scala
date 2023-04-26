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

package controllers

import config.AppConfig
import controllers.DigitalAssistantListController
import mocks.MockAuditService
import models.DAv3AuditModel
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.mvc.MessagesControllerComponents
import play.api.test.Helpers._
import views.html.pageList.DigitalAssistantListView
import views.html.pages.helpers.AppBuilderSpecBase

class DigitalAssistantListControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike with MockAuditService {

  lazy val controller = new DigitalAssistantListController(
    app.injector.instanceOf[AppConfig],
    app.injector.instanceOf[MessagesControllerComponents],
    app.injector.instanceOf[DigitalAssistantListView])

  def asDocument(html: String): Document = Jsoup.parse(html)

  "DigitalAssistantListController Test Controller" should {
    "render the digital assistant list page" in {
      val result = controller.digitalAssistantList(fakeRequest)
      status(result) mustBe OK
    }

  }
}