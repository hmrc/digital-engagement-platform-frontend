import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "uk.gov.hmrc"     %% "bootstrap-frontend-play-28"       % "6.3.0",
    "uk.gov.hmrc"     %% "play-frontend-hmrc"               % "3.22.0-play-28",
    "uk.gov.hmrc"     %% "url-builder"                      % "3.6.0-play-28",
    "uk.gov.hmrc"     %% "digital-engagement-platform-chat" % "0.29.0-play-28"
  )

  val test: Seq[ModuleID] = Seq(
    "org.scalatest"           %% "scalatest"          % "3.2.12"  % "test",
    "org.scalacheck"          %% "scalacheck"         % "1.16.0"  % "test",
    "org.jsoup"               %  "jsoup"              % "1.15.1"  % "test",
    "org.mockito"             %  "mockito-all"        % "1.10.19" % "test",
    "org.pegdown"             %  "pegdown"            % "1.6.0"   % "test",
    "org.scalatestplus.play"  %% "scalatestplus-play" % "5.1.0"   % "test",
    "com.vladsch.flexmark"    %  "flexmark-all"       % "0.62.2"  % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
