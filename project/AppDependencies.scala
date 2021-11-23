import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "org.webjars.npm" %  "hmrc-frontend"                    % "1.35.2",
    "uk.gov.hmrc"     %% "bootstrap-frontend-play-28"       % "5.16.0",
    "uk.gov.hmrc"     %% "play-frontend-hmrc"               % "0.94.0-play-28",
    "uk.gov.hmrc"     %% "url-builder"                      % "3.5.0-play-28",
    "uk.gov.hmrc"     %% "digital-engagement-platform-chat" % "0.23.0-play-28"
  )

  val test: Seq[ModuleID] = Seq(
    "org.scalatest"           %% "scalatest"          % "3.0.9"   % "test",
    "org.scalacheck"          %% "scalacheck"         % "1.15.4"  % "test",
    "org.jsoup"               %  "jsoup"              % "1.14.3"  % "test",
    "org.mockito"             %  "mockito-all"        % "1.10.19" % "test",
    "org.pegdown"             %  "pegdown"            % "1.6.0"   % "test",
    "org.scalatestplus.play"  %% "scalatestplus-play" % "5.0.0"   % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
