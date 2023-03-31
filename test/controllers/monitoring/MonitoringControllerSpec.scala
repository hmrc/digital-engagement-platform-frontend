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

package controllers.monitoring

import akka.stream.Materializer
import config.AppConfig
import play.api.test.Helpers.{defaultAwaitTimeout, running, status}
import play.api.libs.json.Json
import play.api.mvc.MessagesControllerComponents
import views.html.pages.helpers.AppBuilderSpecBase

class MonitoringControllerSpec extends AppBuilderSpecBase {

  lazy val testController: MonitoringController = new MonitoringController(
    app.injector.instanceOf[MessagesControllerComponents],
    app.injector.instanceOf[AppConfig]
  )
  implicit val mat: Materializer = app.injector.instanceOf[Materializer]

  "The nuance status action" should {

    "return a status matching a payload status" when {

      "all validation passes with a status of 200" in {
        val result = testController.monitorNuanceStatus(fakeRequest.withJsonBody(
          Json.parse(
            """{
              |	"key": "localkey",
              |	"status": 200
              |}""".stripMargin)
        ))

        status(result) mustBe 200
      }

      "all validation passes with a status of 500" in {
        val result = testController.monitorNuanceStatus(fakeRequest.withJsonBody(
          Json.parse(
            """{
              |	"key": "localkey",
              |	"status": 500
              |}""".stripMargin)
        ))

        status(result) mustBe 500
      }
    }

    "return a status of 400" when {

      "json validation fails" in {
        val result = testController.monitorNuanceStatus(fakeRequest.withJsonBody(
          Json.parse(
            """{
              |	"key": "localkey",
              |	"status": "invalidcode"
              |}""".stripMargin)
        ))

        status(result) mustBe 400
      }

      "no body is provided" in {
        val result = testController.monitorNuanceStatus(fakeRequest)

        status(result) mustBe 400
      }
    }

    "return a status of 403" when {

      "json validation passes with an invalid key" in {
        val result = testController.monitorNuanceStatus(fakeRequest.withJsonBody(
          Json.parse(
            """{
              |	"key": "invalidKey",
              |	"status": 200
              |}""".stripMargin)
        ))

        status(result) mustBe 403
      }
    }

    "return a status of 404" when {

      "all monitoring is disabled" in {
        val application = builder.configure("features.monitoring.all" -> "false").build()

        val testController: MonitoringController = new MonitoringController(
          application.injector.instanceOf[MessagesControllerComponents],
          application.injector.instanceOf[AppConfig]
        )

        running(application) {
          val result = testController.monitorNuanceStatus(fakeRequest)

          status(result) mustBe 404
        }
      }

      "the nuance status feature is disabled" in {
        val application = builder.configure("features.monitoring.nuanceStatus" -> "false").build()

        val testController: MonitoringController = new MonitoringController(
          application.injector.instanceOf[MessagesControllerComponents],
          application.injector.instanceOf[AppConfig]
        )

        running(application) {
          val result = testController.monitorNuanceStatus(fakeRequest)

          status(result) mustBe 404
        }
      }
    }
  }
}
