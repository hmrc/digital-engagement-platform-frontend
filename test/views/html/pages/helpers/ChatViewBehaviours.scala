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

package views.html.pages.helpers

import play.twirl.api.HtmlFormat

trait ChatViewBehaviours extends ViewSpecBase {


  def generalContent(view: () => HtmlFormat.Appendable,
                     messageHeading: String,
                     hasGetHelpWithPageText: Boolean = true,
                     betaBannerText: String = "This is a new service"
                    ): Unit = {
    "the view" must {

      "display the correct page title" in {
        val doc = asDocument(view())
        assertPageTitleEqualsMessage(doc, messageHeading)
      }

      "display the beta banner" in {
        val doc = asDocument(view())
        assertContainsText(doc, betaBannerText)
      }

      "display the 'Get help with this page' text" in {
        val doc = asDocument(view())
        val helpTextExists = doc.getElementById("get-help-action") != null
        helpTextExists mustBe hasGetHelpWithPageText
      }
    }
  }

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

        behave like generalContent(view, messageHeading)

        "have the correct banner title" in {
          val doc = asDocument(view())
          val nav = doc.getElementById("proposition-menu")
          val span = nav.children.first
          span.text mustBe bannerTitle
        }

        "display the correct browser title" in {
          val doc = asDocument(view())
          assertEqualsMessage(doc, "title", messageKeyPrefix)
        }

        "display the correct link text" in {
          val doc = asDocument(view())
          assertContainsText(doc, urlLinkText)
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
          for (key <- openingTimes) assertContainsText(doc, messages(key))
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

  def generalContentCUI(view: () => HtmlFormat.Appendable,
                     messageHeading: String,
                     sidebarText: String
                    ): Unit = {
    "the view" must {
      behave like generalContent(view, messageHeading)

      "display the sidebar text" in {
        val doc = asDocument(view())
        doc.getElementById("sidebar-header")
        assertContainsText(doc, sidebarText)
      }
    }
  }
  def normalCuiPage(view: () => HtmlFormat.Appendable,
                    bannerTitle: String,
                    title: String,
                    messageHeading: String,
                    chatIds: Seq[String] = Seq("nuanMessagingFrame")): Unit = {

    "behave like a normal CUI page" when {
      "rendered" must {

        behave like generalContent(view, messageHeading)

        "have the correct banner title" in {
          val doc = asDocument(view())
          val nav = doc.getElementById("proposition-menu")
          val span = nav.children.first
          span.text mustBe bannerTitle
        }

        "display the correct browser title" in {
          val doc = asDocument(view())
          assertEqualsMessage(doc, "title", title)
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


}
