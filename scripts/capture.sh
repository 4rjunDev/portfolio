#!/usr/bin/env bash
# Capture iOS Simulator screens for an app while you tap through it.
#   scripts/capture.sh <slug> [device]   e.g. scripts/capture.sh tennis-trivia "iPhone 17 Pro"
# Press Enter to save a screenshot of that simulator; type q + Enter to stop.
# Device defaults to "iPhone 17 Pro" (needed when more than one simulator is booted).
# Files land in public/apps/<slug>/NN.png — then ask Claude to convert & wire them in.
set -euo pipefail
slug="${1:?usage: scripts/capture.sh <slug> [device]}"
device="${2:-iPhone 17 Pro}"
dir="$(cd "$(dirname "$0")/.." && pwd)/public/apps/$slug"
mkdir -p "$dir"
n=$(ls "$dir"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "Saving to $dir from \"$device\" — navigate in the Simulator, press Enter to capture, q to quit."
while IFS= read -r -p "> " line; do
  [[ "$line" == "q" ]] && break
  n=$((n + 1))
  out="$dir/$(printf '%02d' "$n").png"
  xcrun simctl io "$device" screenshot "$out" >/dev/null 2>&1 && echo "  saved $(basename "$out")"
done
echo "Done — $n screenshot(s) in $dir"
