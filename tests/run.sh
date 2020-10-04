#!/usr/bin/env bash

set -euxo pipefail
npm run lint
npm run integration:test
npm run cli:test

