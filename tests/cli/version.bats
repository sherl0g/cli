#!/usr/bin/env bats
load test_helper

setup() {
  echo "setup"
}

teardown() {
    echo "teardown"
}

@test "--version matches the package.json version" {
  run node "$SUT" --version
  [ "$status" -eq 0 ]
  [ "$output" = "$PACKAGE_VERSION" ]
}

@test "-v option matches the package.json version" {
  run node "$SUT" -v
  [ "$status" -eq 0 ]
  [ "$output" = "$PACKAGE_VERSION" ]
}



