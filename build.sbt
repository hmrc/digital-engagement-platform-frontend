import JavaScriptBuild._
import scoverage.ScoverageKeys
import uk.gov.hmrc.DefaultBuildSettings._
import uk.gov.hmrc.sbtdistributables.SbtDistributablesPlugin.publishingSettings

val appName = "digital-engagement-platform-frontend"

lazy val scoverageSettings = {
  Seq(
    ScoverageKeys.coverageExcludedPackages :="""uk\.gov\.hmrc\.BuildInfo;.*\.Routes;.*\.RoutesPrefix;.*\.ErrorTemplate;.*\.ErrorHandler;.*\.TestOnlyTemplate;.*\.TestOnlyView;.*\.Reverse[^.]*""",
    ScoverageKeys.coverageMinimumStmtTotal := 88,
    ScoverageKeys.coverageFailOnMinimum := false,
    ScoverageKeys.coverageHighlighting := true
  )
}

lazy val microservice = Project(appName, file("."))
  .enablePlugins(play.sbt.PlayScala, SbtDistributablesPlugin, ScoverageSbtPlugin)
  .disablePlugins(JUnitXmlReportPlugin)
  .configs(IntegrationTest)
  .settings(integrationTestSettings(): _*)
  .settings(
    majorVersion                     := 0,
    libraryDependencies ++= AppDependencies.all,
    publishingSettings,
    javaScriptBundler,
    javaScriptTestRunnerHook,
    defaultSettings(),
    scalaVersion := "3.3.5",
    // only required for frontends
    scalacOptions += "-Wconf:msg=unused import&src=html/.*:s",
    // for all services
    scalacOptions += "-Wconf:cat=unused-imports&src=routes/.*:s",
    scalacOptions += "-Wconf:msg=Flag.*repeatedly:s",
    PlayKeys.playDefaultPort := 9956,
    Concat.groups := Seq(
      "javascripts/bundle.js" -> group(Seq("javascripts/bundle/gtm_dl.js"))
    ),
    pipelineStages in Assets := Seq(concat),
    scoverageSettings,
  )
