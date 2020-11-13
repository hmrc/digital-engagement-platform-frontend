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

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatestplus.scalacheck.ScalaCheckPropertyChecks
import play.api.test.Helpers._
import views.html.pages.AppBuilderSpecBase

class PaymentProblemsControllerSpec
    extends AppBuilderSpecBase with ScalaCheckPropertyChecks {

  private val controller = app.injector.instanceOf[PaymentProblemsController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "fixed URLs" should {
    "render payment problems page" in {
      val result = controller.paymentProblem(fakeRequest)
      val doc = asDocument(contentAsString(result))

      status(result) mustBe OK
      doc.select("h1").text() mustBe "Coronavirus (COVID-19): tax support for businesses and self-employed"
    }
  }
}
