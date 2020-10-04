#!/usr/bin/env bats
load test_helper

@test "it should fail if the config file has an invalid \"file\" property value" {
  switch_to_tmp_dir
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_config_content ".nginx")
  echo "$CONFIG_CONTENT" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start "$SHERLOG_CONFIG_FILE_NAME"
  [ "$status" -eq 1 ]
  [ "$output" =  "no such file path/nginx.access.log" ]
}

@test "it should fail if the config file has an invalid \"file\" property value with --config option" {
  switch_to_tmp_dir
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_config_content ".nginx")
  echo "$CONFIG_CONTENT" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start --config "$SHERLOG_CONFIG_FILE_NAME"
  [ "$status" -eq 1 ]
  [ "$output" =  "no such file path/nginx.access.log" ]
}

@test "it should start a web server on port 8000 GET | /ready" {
  switch_to_tmp_dir
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_config_content ".nginx")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start --config "$SHERLOG_CONFIG_FILE_NAME" &
  sleep 3
  STATUS_CODE=$(curl --max-time 3 --write-out '%{http_code}' --silent --output /dev/null http://localhost:8000/ready)
  PID=$(ps aux | grep -v grep | grep 'sherlog' | awk '{print $2}')
  kill -9 "$PID"
  [ "$STATUS_CODE" -eq 200 ]
}
