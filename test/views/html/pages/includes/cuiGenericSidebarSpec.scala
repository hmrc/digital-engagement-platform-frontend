/*
 * Copyright 2021 HM Revenue & Customs
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

import play.twirl.api.HtmlFormat
import views.html.CUIViews.AskHmrcOnlineCUIView
import views.html.pages.helpers.ViewSpecBase

class cuiGenericSidebarSpec extends ViewSpecBase {

  private val viewWithTemplate = app.injector.instanceOf[AskHmrcOnlineCUIView]

  private def createView: () => HtmlFormat.Appendable = () => viewWithTemplate()(fakeRequest, messages)

  "behave like an include" when {
    "show the sidebar header" in {
      val doc = asDocument(createView())
      assertEqualsValue(
        doc,
        "#cui-subsection-title",
        "HMRC’s digital assistant is available at any time to answer your questions.")
    }

    "show the sidebar chatbot cannot paragraph" in {
      val doc = asDocument(createView())
      assertEqualsValue(
        doc,
        "#chatbot-cannot",
        "If it cannot help you, you can ask to transfer to an HMRC adviser by typing ‘adviser’.")
    }

    "show advisor availablility header" in {
      val doc = asDocument(createView())
      assertEqualsValue(doc, "#opening-times-title", "Advisers are available:")
    }

    "Show opening times Monday to Friday" in {
      val doc = asDocument(createView())
      assertContainsValue(doc, "#opening-times-weekdays", "Monday to Friday, 8am to 7:30pm")
    }

    "Show opening times Saturday" in {
      val doc = asDocument(createView())
      assertContainsValue(doc, "#opening-times-saturday", "Saturday, 8am to 4pm")
    }

    "Show not open Sunday paragraph" in {
      val doc = asDocument(createView())
      assertEqualsValue(doc, "#closed-sundays", "Advisers are not available on Sundays or Bank holidays.")
    }
  }
}