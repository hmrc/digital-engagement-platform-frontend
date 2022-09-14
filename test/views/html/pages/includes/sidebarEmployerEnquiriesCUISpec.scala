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

package views.html.pages.includes

import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AnyWordSpecLike
import play.twirl.api.HtmlFormat
import views.html.CUIViews.EmployerEnquiriesCUIDAv2View
import views.html.pages.helpers.ViewSpecBase

class sidebarEmployerEnquiriesCUISpec extends ViewSpecBase with Matchers with AnyWordSpecLike {

  private val viewWithTemplate = app.injector.instanceOf[EmployerEnquiriesCUIDAv2View]

  private def createView: () => HtmlFormat.Appendable = () => viewWithTemplate()(fakeRequest, messages)


  "behave like an include" when {
    "show the sidebar header" in {
      val doc = asDocument(createView())
      assertEqualsValue(doc, "#cui-subsection-title", "Employers enquiries: chat")
    }

    "show the sidebar chatbot can paragraph" in {
      val doc = asDocument(createView())
      assertEqualsValue(doc, "#chatbot-can", "The HMRC digital assistant is available " +
        "at any time to answer your questions about employers enquiries.")
    }

    "show the sidebar chatbot cannot paragraph" in {
      val doc = asDocument(createView())
      assertEqualsValue(doc, "#chatbot-cannot", "If it cannot help you, you can ask to " +
        "transfer to an HMRC adviser by typing ‘adviser’. Advisers work 8am to 6pm, Monday to Friday and do " +
        "not work weekends or bank holidays.")
    }
  }
}