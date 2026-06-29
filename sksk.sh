#!/bin/bash

COMMAND=$1
shift

case "$COMMAND" in
  build)
    python ai.py "build $@"
    ;;
  scaffold)
    python ai.py "scaffold $@"
    ;;
  diagnose)
    python ai.py "diagnose $@"
    ;;
  *)
    echo "Unknown command: $COMMAND"
    ;;
esac
