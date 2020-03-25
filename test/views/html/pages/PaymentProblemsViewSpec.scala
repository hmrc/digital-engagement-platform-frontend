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

import play.api.mvc.Cookie
import play.api.test.FakeRequest
import play.twirl.api.HtmlFormat
import views.html.PaymentProblemsView

class PaymentProblemsViewSpec extends ChatViewBehaviours {

  implicit override val fakeRequest = FakeRequest("GET", "/").withCookies(Cookie("mdtp", "12345"))

  val view = app.injector.instanceOf[PaymentProblemsView]

  def createView: () => HtmlFormat.Appendable = () => view()(fakeRequest, messages)

  "Payment Problems view" must {

    val expectedGuidanceKeys: List[String] = List("payment.problems.p1",
        "payment.problems.p2",
        "payment.problems.h2",
        "payment.problems.indent.1",
        "payment.problems.indent.2",
        "payment.problems.indent.3",
        "payment.problems.h4.1",
        "payment.problems.h4.2",
        "payment.problems.h4.3",
        "payment.problems.h4.4",
        "payment.problems.h4.5",
        "payment.problems.p3",
        "payment.problems.p4",
        "payment.problems.p5",
        "payment.problems.p6"
    )


    "behave like a normal page" when {

      "rendered" must {

        "have the correct banner title" in {
          val doc = asDocument(createView())
          val nav = doc.getElementById("proposition-menu")
          val span = nav.children.first
          span.text mustBe messages("global.nav.title")
        }

        "display the correct browser title" in {
          val doc = asDocument(createView())
          assertEqualsMessage(doc, "title", "Ask HMRC - Webchat")
        }

        "display the correct page title" in {
          val doc = asDocument(createView())
          doc.getElementsByTag("h1")
          assertPageTitleEqualsMessage(doc, "Support for paying tax")
        }

        "display the correct guidance" in {
          val doc = asDocument(createView())
          for (key <- expectedGuidanceKeys) assertContainsText(doc, messages(s"$key"))
        }

      }

    }

  }
}