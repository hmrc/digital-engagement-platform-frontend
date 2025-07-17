import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "uk.gov.hmrc" %% "play-frontend-hmrc-play-30" % "12.3.0",
    "uk.gov.hmrc" %% "bootstrap-frontend-play-30" % "9.13.0",
    "uk.gov.hmrc" %% "digital-engagement-platform-chat-30" % "1.7.0"
  )

  val test: Seq[ModuleID] = Seq(
    "org.scalatest" %% "scalatest" % "3.2.12" % "test",
    "org.scalacheck" %% "scalacheck" % "1.16.0" % "test",
    "org.jsoup" % "jsoup" % "1.15.1" % "test",
    "org.mockito" % "mockito-core" % "2.28.2" % "test",
    "org.pegdown" % "pegdown" % "1.6.0" % "test",
    "org.scalatestplus.play" %% "scalatestplus-play" % "6.0.0" % "test",
    "com.vladsch.flexmark" % "flexmark-all" % "0.62.2" % "test",
    "org.scalatestplus" %% "mockito-4-6" % "3.2.14.0" % "test",
    "uk.gov.hmrc" %% "bootstrap-test-play-30" %  "9.13.0" % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
