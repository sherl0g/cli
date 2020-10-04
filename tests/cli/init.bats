#!/usr/bin/env bats
load test_helper

setup() {
  switch_to_tmp_dir
}

@test "init command should create a ${SHERLOG_CONFIG_FILE_NAME} configuration file" {
  run node "$SUT" init
  CONFIG_CONTENT=$(get_config_content)
  GENERATED_CONFIG=$(cat ./"$SHERLOG_CONFIG_FILE_NAME")
  [ "$status" -eq 0 ]
  [ "$output" =  "creating ${SHERLOG_CONFIG_FILE_NAME}" ]
  [ "$CONFIG_CONTENT" = "$GENERATED_CONFIG" ]
}

@test "init command should prompt to pass the --force option to overwrite existing config file" {
  CONFIG_CONTENT=$(get_config_content)
  echo "$CONFIG_CONTENT" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" init
  [ "$status" -eq 1 ]
  [ "$output" =  "pass the --force option to overwrite your existing ${SHERLOG_CONFIG_FILE_NAME} config file" ]
}
