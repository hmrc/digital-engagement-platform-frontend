#!/bin/bash
sbt "run -Dapplication.router=testOnlyDoNotUseInAppConf.Routes -Dplay.filters.disabled+=play.filters.headers.SecurityHeadersFilter"
