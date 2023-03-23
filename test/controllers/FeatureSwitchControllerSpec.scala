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

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.api.mvc.Result
import play.api.test.Helpers._
import views.html.pages.helpers.AppBuilderSpecBase

import scala.concurrent.Future

class FeatureSwitchControllerSpec
	extends AppBuilderSpecBase with Matchers with AnyWordSpecLike {

	private val controller = app.injector.instanceOf[FeatureSwitchController]

	"Calling a feature switch" should {

		"return a 204 when set to true" in {
			val result: Future[Result] = controller.getFeatureSwitch("DMCUI")(fakeRequest)
			status(result) mustBe NO_CONTENT
		}

		"return a 403 when set to false" in {
			val result: Future[Result] = controller.getFeatureSwitch("shutter")(fakeRequest)
			status(result) mustBe FORBIDDEN
		}

		"return a 403 when it does not exist" in {
			val result: Future[Result] = controller.getFeatureSwitch("fake")(fakeRequest)
			status(result) mustBe FORBIDDEN
		}
	}
}
