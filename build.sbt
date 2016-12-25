name := """play-java"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.11.8"

libraryDependencies += javaJdbc
libraryDependencies += cache
libraryDependencies += javaWs
libraryDependencies += "org.postgresql" % "postgresql" % "9.4-1206-jdbc42"
libraryDependencies +=  "org.xerial" % "sqlite-jdbc" % "3.8.0-SNAPSHOT"

resolvers += "SQLite-JDBC Repository" at "https://oss.sonatype.org/content/repositories/snapshots"
