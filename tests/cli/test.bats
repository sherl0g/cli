#!/usr/bin/env bats
load test_helper

teardown() {
    remove_config
}

@test "it should prompt the user to initialize the project if config file is missing" {
  switch_to_tmp_dir
  run node "$SUT" test
  [ "$status" -eq 1 ]
  [ "$output" =  "${SHERLOG_CONFIG_FILE_NAME} not found. run the init command to initialize the current working directory" ]
}

@test "it should warn about invalid config file path" {
  NON_EXISTENT_FILE='random/path/unknown.json'
  run node "$SUT" test --config $NON_EXISTENT_FILE
  [ "$status" -eq 1 ]
  [ "$output" =  "invalid config file path ${NON_EXISTENT_FILE}" ]
}

@test "invalid JSON syntax" {
  switch_to_tmp_dir
  INVALID_CONFIG="{"
  echo $INVALID_CONFIG > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" test
  [ "$status" -eq 1 ]
  [ "$output" =  "your config file has an invalid JSON syntax" ]
}

@test "invalid JSON syntax with --config option" {
  INVALID_CONFIG="{"
  echo $INVALID_CONFIG > "$BATS_TMPDIR/$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" test --config "$BATS_TMPDIR"/"$SHERLOG_CONFIG_FILE_NAME"
  [ "$status" -eq 1 ]
  [ "$output" =  "your config file has an invalid JSON syntax" ]
}


@test "valid JSON schema" {
  switch_to_tmp_dir
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_config_content ".nginx")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" test
  [ "$status" -eq 0 ]
  [ "$output" =  "your $SHERLOG_CONFIG_FILE_NAME schema is valid!" ]
}

@test "valid JSON schema with --config option" {
  switch_to_tmp_dir
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_config_content ".nginx")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" test --config "$SHERLOG_CONFIG_FILE_NAME"
  [ "$status" -eq 0 ]
  [ "$output" =  "your $SHERLOG_CONFIG_FILE_NAME schema is valid!" ]
}
