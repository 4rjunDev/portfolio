#!/usr/bin/env bash
# Capture iOS Simulator screens for an app while you tap through it.
#   scripts/capture.sh <slug>          e.g. scripts/capture.sh tennis-trivia
# Press Enter to save a screenshot of the booted simulator; type q + Enter to stop.
# Files land in public/apps/<slug>/NN.png — then ask Claude to convert & wire them in.
set -euo pipefail
slug="${1:?usage: scripts/capture.sh <slug>}"
dir="$(cd "$(dirname "$0")/.." && pwd)/public/apps/$slug"
mkdir -p "$dir"
n=$(ls "$dir"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "Saving to $dir — navigate in the Simulator, press Enter to capture, q to quit."
while IFS= read -r -p "> " line; do
  [[ "$line" == "q" ]] && break
  n=$((n + 1))
  out="$dir/$(printf '%02d' "$n").png"
  xcrun simctl io booted screenshot "$out" >/dev/null 2>&1 && echo "  saved $(basename "$out")"
done
echo "Done — $n screenshot(s) in $dir"
