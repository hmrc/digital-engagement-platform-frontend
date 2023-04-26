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

package views.html.pages.includes

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.pages.helpers.ViewSpecBase
import views.html.CIAPIViews.NationalMinimumWageCUIView

class nmwSidebarSpec extends ViewSpecBase with Matchers with AnyWordSpecLike {

  private val viewWithTemplate = app.injector.instanceOf[NationalMinimumWageCUIView]

  private def createView: () => HtmlFormat.Appendable = () => viewWithTemplate()(fakeRequest, messages)

  val gangmastersUrl: String = "https://www.gla.gov.uk/"

  "confirm the correct link to the Gangmasters & Labour Abuse Authority homepage" in {
    val doc = asDocument(createView())
    val element = doc.getElementsByAttributeValue("href", "https://www.gla.gov.uk/")

    element.text mustBe "Gangmasters & Labour Abuse Authority"
  }

  "confirm the correct link to the Employment Agency Standards homepage" in {
    val doc = asDocument(createView())
    val element = doc.getElementsByAttributeValue("href", "https://www.gov.uk/employment-agencies-and-businesses")

    element.text mustBe "Employment Agency Standards"
  }

  "confirm the correct link to the Health & Safety Executive" in {
    val doc = asDocument(createView())
    val element = doc.getElementsByAttributeValue("href", "https://www.hse.gov.uk/")

    element.text mustBe "Health & Safety Executive"
  }

}