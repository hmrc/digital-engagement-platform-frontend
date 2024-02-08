import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "uk.gov.hmrc" %% "bootstrap-frontend-play-28" % "8.4.0",
    "uk.gov.hmrc" %% "play-frontend-hmrc" % "7.29.0-play-28",
    "uk.gov.hmrc" %% "digital-engagement-platform-chat" % "0.33.0-play-28"
  )

  val test: Seq[ModuleID] = Seq(
    "org.scalacheck" %% "scalacheck" % "1.16.0" % "test",
    "org.jsoup" % "jsoup" % "1.15.1" % "test",
    "org.mockito" % "mockito-core" % "2.28.2" % "test",
    "org.scalatestplus" %% "mockito-4-6" % "3.2.14.0" % "test",
    "uk.gov.hmrc" %% "bootstrap-test-play-28" %  "8.4.0" % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
