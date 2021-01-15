import play.core.PlayVersion.current
import play.sbt.PlayImport._
import sbt.Keys.libraryDependencies
import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "uk.gov.hmrc" %% "govuk-template" % "5.61.0-play-27",
    "uk.gov.hmrc" %% "play-ui" % "8.20.0-play-27",
    "uk.gov.hmrc" %% "bootstrap-frontend-play-27" % "3.3.0",
    "uk.gov.hmrc" %% "url-builder" % "3.4.0-play-27",
    "uk.gov.hmrc" %% "http-verbs-play-27" % "12.3.0",
    "uk.gov.hmrc" %% "digital-engagement-platform-chat" % "0.14.0-play-27"
  )

  val test: Seq[ModuleID] = Seq(
    "uk.gov.hmrc" %% "bootstrap-frontend-play-27" % "3.3.0" % "test",
    "org.scalatest" %% "scalatest" % "3.0.8" % "test",
    "org.scalacheck" %% "scalacheck" % "1.13.4" % "test",
    "org.jsoup" % "jsoup" % "1.10.2" % "test",
    "org.mockito" % "mockito-all" % "1.10.19" % "test",
    "org.pegdown" % "pegdown" % "1.6.0" % "test",
    "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
