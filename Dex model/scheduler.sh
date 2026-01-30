#!/bin/bash

LOCKFILE="/tmp/dx_terminal_metrics.lock"

# If lock exists, exit
if [ -f "$LOCKFILE" ]; then
  echo "[DX] Previous run still active. Exiting."
  exit 0
fi

# Create lock
echo $$ > "$LOCKFILE"

# Run wrapper
/usr/bin/node /path/to/dx_wrapper.js

# Remove lock
rm -f "$LOCKFILE"