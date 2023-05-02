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
import mocks.MockAuditService
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.mvc.MessagesControllerComponents
import play.api.test.FakeRequest
import play.api.test.Helpers._
import views.html.pageList.DigitalAssistantListView
import views.html.pages.helpers.AppBuilderSpecBase

class DigitalAssistantListControllerSpec
  extends AppBuilderSpecBase with Matchers with AnyWordSpecLike with MockAuditService {

  lazy val controller = new DigitalAssistantListController(
    app.injector.instanceOf[AppConfig],
    app.injector.instanceOf[MessagesControllerComponents],
    app.injector.instanceOf[DigitalAssistantListView])

  "DigitalAssistantListController Test Controller" should {
    "render the digital assistant list page" in {
      val result = controller.digitalAssistantList(fakeRequest)
      status(result) mustBe OK
    }

    "return not found when showDigitalAssistantListPage flag is set to false" in {
      val application = builder.configure("features.showDigitalAssistantListPage" -> "false").build()
      running(application) {
        val request = FakeRequest(GET, routes.DigitalAssistantListController.digitalAssistantList.url)
        val result = route(application, request).get
        status(result) mustBe NOT_FOUND
      }
    }
  }

}