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

package controllers

import controllers.CiapiController.{routes => ciapiRoutes}
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.scalatest.MustMatchers.convertToAnyMustWrapper
import org.scalatest.{Matchers, WordSpecLike}
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

class VirtualAssistantControllerSpec
  extends AppBuilderSpecBase with Matchers with WordSpecLike {

  private val controller = app.injector.instanceOf[VirtualAssistantController]

  def asDocument(html: String): Document = Jsoup.parse(html)

  "fixed VA URLs" should {

    "render customs and international trade" in {
      val result = controller.customsInternationalTrade(fakeRequest)

      status(result) mustBe SEE_OTHER
      redirectLocation(result) mustBe Some(ciapiRoutes.CiapiController.customsInternationalTrade.url)
    }
  }
}
