#!/usr/bin/env bash

SHERLOG_CONFIG_FILE_NAME='.sherlog';

# shellcheck disable=SC2021
# shellcheck disable=SC2155
export PACKAGE_VERSION=$(grep 'version' package.json | cut -d '"' -f4 | tr -d '[[:space:]]')
# shellcheck disable=SC2155
export SUT=$(which slg)


generate_tmp_dir() {
  mktemp -d -t sherlog-XXXXXXXXXX145
}

switch_to_tmp_dir() {
  DIR=$(generate_tmp_dir)
  cd "$DIR" || exit
}

remove_config(){
  rm -f "$BATS_TMPDIR"/$SHERLOG_CONFIG_FILE_NAME
}

copy_file () {
  echo "$(<"$BATS_TEST_DIRNAME"/fixtures/"$1")" > "$1"
}

get_config_content() {
  if [ "$1" ]; then
    FILE=$1
  else
    FILE=".default"
  fi
  CONFIG_STUB=$(<"$BATS_TEST_DIRNAME"/fixtures/"$FILE".sherlog)
  echo "${CONFIG_STUB//\"hostname\":\ \"\"/\"hostname\": \"$(hostname)\"}"
}
