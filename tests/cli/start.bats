#!/usr/bin/env bats
load test_helper

setup() {
  switch_to_tmp_dir
}

@test "start command should fail if the config files.file property has an invalid \"file\" path" {
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_fixture ".nginx")
  echo "$CONFIG_CONTENT" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start
  [ "$status" -eq 1 ]
  [ "$output" =  "no such file path/nginx.access.log" ]
}

@test "start command should fail if the config files.file property has an invalid \"file\" path (--config option)" {
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_fixture ".nginx")
  echo "$CONFIG_CONTENT" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start --config "$SHERLOG_CONFIG_FILE_NAME"
  [ "$status" -eq 1 ]
  [ "$output" =  "no such file path/nginx.access.log" ]
}

@test "start command should fail if the config files.file property value is not readable" {
  copy_file "unreadable.log"
  CONFIG_CONTENT=$(get_fixture ".unreadable")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  chmod 0000 unreadable.log
  if [ "$(whoami)" = "root" ]; then
    adduser --disabled-password --gecos "" anonymous
    groupadd common
    chgrp common "$PWD"
    chmod 770 "$PWD"
    chmod +s "$PWD"
    usermod -a -G common anonymous
    run su anonymous bash -c "$SUT start"
    deluser anonymous common
    userdel -r anonymous
    groupdel common
  else
     run "$SUT" start
  fi
  [ "$status" -eq 1 ]
  [ "$output" =  "permission denied $PWD/unreadable.log" ]
}

@test "start command should fail if the config files.file property value is not readable (--config option)" {
  copy_file "unreadable.log"
  CONFIG_CONTENT=$(get_fixture ".unreadable")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  chmod 0000 unreadable.log
  if [ "$(whoami)" = "root" ]; then
    adduser --disabled-password --gecos "" anonymous
    groupadd common
    chgrp common "$PWD"
    chmod 770 "$PWD"
    chmod +s "$PWD"
    usermod -a -G common anonymous
    run su anonymous bash -c "$SUT start --config $SHERLOG_CONFIG_FILE_NAME"
    deluser anonymous common
    userdel -r anonymous
    groupdel common
  else
      run "$SUT" start --config "$SHERLOG_CONFIG_FILE_NAME"
  fi
  [ "$status" -eq 1 ]
  [ "$output" =  "permission denied $PWD/unreadable.log" ]
}

@test "start command should start a web server on port 8000 GET" {
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_fixture ".nginx")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start &
  sleep 3
  STATUS_CODE=$(curl --max-time 3 --write-out '%{http_code}' --silent --output /dev/null http://localhost:8000/ready)
  PID=$(ps aux | grep -v grep | grep 'slg' | awk '{print $2}')
  kill -9 "$PID"
  [ "$STATUS_CODE" -eq 200 ]
}

@test "start command should start a web server on port 8000 GET | /ready (--config option)" {
  copy_file "nginx.access.log"
  CONFIG_CONTENT=$(get_fixture ".nginx")
  echo "${CONFIG_CONTENT//"path"/"$PWD"}" > "$SHERLOG_CONFIG_FILE_NAME"
  run node "$SUT" start --config "$SHERLOG_CONFIG_FILE_NAME" &
  sleep 3
  STATUS_CODE=$(curl --max-time 3 --write-out '%{http_code}' --silent --output /dev/null http://localhost:8000/ready)
  PID=$(ps aux | grep -v grep | grep 'slg' | awk '{print $2}')
  kill -9 "$PID"
  [ "$STATUS_CODE" -eq 200 ]
}
