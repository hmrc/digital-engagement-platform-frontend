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

package views.html.pages.helpers

import play.twirl.api.HtmlFormat

trait ChatViewBehaviours extends ViewSpecBase {

  def normalPage(view: () => HtmlFormat.Appendable,
                 bannerTitle: String,
                 messageKeyPrefix: String,
                 messageHeading: String,
                 urlLinkText: String,
                 returnUrlLink: String,
                 openingTimes: Seq[String],
                 chatIds: Seq[String] = Seq("HMRC_Fixed_1")): Unit = {

    "behave like a normal page" when {
      "rendered" must {
        "have the correct banner title" in {
          val doc = asDocument(view())
          val nav = doc.getElementById("proposition-menu")
          val span = nav.children.first
          span.text mustBe messages(s"$bannerTitle")
        }

        "display the correct browser title" in {
          val doc = asDocument(view())
          assertEqualsMessage(doc, "title", s"$messageKeyPrefix")
        }

        "display the correct page title" in {
          val doc = asDocument(view())
          doc.getElementsByTag("h1")
          assertPageTitleEqualsMessage(doc, s"$messageHeading")
        }

        "display the correct link text" in {
          val doc = asDocument(view())
          assertContainsText(doc, s"$urlLinkText")
        }

        "confirm the correct return link back to the correct gov.uk page" in {
          val doc = asDocument(view())
          val a = doc.getElementById("return-link")
          if (a != null) {
            val href = a.attr("href")
            href mustBe returnUrlLink
          }
        }

        "display the opening times text" in {
          val doc = asDocument(view())
          for (key <- openingTimes) assertContainsText(doc, messages(s"$key"))
        }

        "insert the Nuance container tag(s)" in {
          val doc = asDocument(view())
          for (chatId <- chatIds) doc.getElementById(chatId) must not be null
        }

        "insert the Nuance required tag" in {
          val doc = asDocument(view())
          doc.getElementById("WEBCHAT_TEST_RequiredElements") must not be null
        }
      }
    }
  }

  def generalContent(view: () => HtmlFormat.Appendable,
                     messageHeading: String,
                     betaBannerText: String,
                     getHelpWithPageText: String
                    ): Unit = {
    "adds to a all pages" when {
      "display the correct page title" in {
        val doc = asDocument(view())
        doc.getElementsByTag("h1")
        assertPageTitleEqualsMessage(doc, s"$messageHeading")
      }

      "display the beta banner" in {
        val doc = asDocument(view())
        doc.getElementById("beta-banner")
        assertContainsText(doc, betaBannerText)
      }

      "display the 'Get help with this page' text" in {
        val doc = asDocument(view())
        doc.getElementById("get-help-action")
        assertContainsText(doc, getHelpWithPageText)
      }
    }
  }

  def generalContentUCI(view: () => HtmlFormat.Appendable,
                     messageHeading: String,
                     betaBannerText: String,
                     getHelpWithPageText: String,
                     sidebarText: String
                    ): Unit = {
    "adds to a all pages" when {
      "display the correct page title" in {
        val doc = asDocument(view())
        doc.getElementsByTag("h1")
        assertPageTitleEqualsMessage(doc, s"$messageHeading")
      }

      "display the beta banner" in {
        val doc = asDocument(view())
        doc.getElementById("beta-banner")
        assertContainsText(doc, betaBannerText)
      }

      "display the 'Get help with this page' text" in {
        val doc = asDocument(view())
        doc.getElementById("get-help-action")
        assertContainsText(doc, getHelpWithPageText)
      }

      "display the sidebar text" in {
        val doc = asDocument(view())
        doc.getElementById("sidebar-header")
        assertContainsText(doc, sidebarText)
      }
    }
  }
}
