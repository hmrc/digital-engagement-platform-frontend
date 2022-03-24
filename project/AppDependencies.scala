import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "org.webjars.npm" %  "hmrc-frontend"                    % "1.35.2",
    "uk.gov.hmrc"     %% "bootstrap-frontend-play-28"       % "5.21.0",
    "uk.gov.hmrc"     %% "play-frontend-hmrc"               % "3.7.0-play-28",
    "uk.gov.hmrc"     %% "url-builder"                      % "3.6.0-play-28",
    "uk.gov.hmrc"     %% "digital-engagement-platform-chat" % "0.26.0-play-28"
  )

  val test: Seq[ModuleID] = Seq(
    "org.scalatest"           %% "scalatest"          % "3.2.3"   % "test",
    "org.scalacheck"          %% "scalacheck"         % "1.15.4"  % "test",
    "org.jsoup"               %  "jsoup"              % "1.14.3"  % "test",
    "org.mockito"             %  "mockito-all"        % "1.10.19" % "test",
    "org.pegdown"             %  "pegdown"            % "1.6.0"   % "test",
    "org.scalatestplus.play"  %% "scalatestplus-play" % "5.1.0"   % "test",
    "com.vladsch.flexmark"    %  "flexmark-all"       % "0.35.10" % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
