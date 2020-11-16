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

package views.html.pages

import play.twirl.api.HtmlFormat
import views.html.InheritanceTaxView

class InheritanceTaxViewSpec extends ChatViewBehaviours {

  private val view = app.injector.instanceOf[InheritanceTaxView]

  private def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Probate view" must {
    val returnUrl: String =
      "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/probate-and-inheritance-tax-enquiries"

    behave like normalPage(
      createView,
      "Coronavirus (COVID-19): Inheritance Tax",
      "Coronavirus (COVID-19): Inheritance Tax",
      "Return to Contact HMRC",
      returnUrl,
      Seq(
        "Opening times:",
        "Monday to Friday, 9am to 5pm",
        "Closed weekends and bank holidays."
      )
    )
  }
}