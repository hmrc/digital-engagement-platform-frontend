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

package utils

import org.scalatest.{Matchers, WordSpec}

class StringHelpersSpec extends WordSpec with Matchers {

  "StringHelperSpec" should {
    "tidyUpString shor replace any // and %2F with /" in {
     val stringToTidyUp: String = "www.tax.service.gov.uk//ask-hmrc%2Fwebchat%2Feat-out-to-help-out-scheme"
      StringHelpers.tidyUpString(stringToTidyUp) shouldBe "www.tax.service.gov.uk/ask-hmrc/webchat/eat-out-to-help-out-scheme"
    }
  }
}
