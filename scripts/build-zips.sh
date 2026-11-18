#!/usr/bin/env bash
# Builds the files to upload on claude.ai (Customize > Plugins or Customize > Skills):
#   dist/spec-driven-plugin-<version>.zip   the whole plugin (skills, agents, hook, templates)
#   dist/skills/<skill>-<version>.zip      each skill on its own, with the templates and agent
#                                           instructions it needs, for accounts that only allow skills
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
plugin="$root/plugins/spec-driven"
version="$(jq -r .version "$plugin/.claude-plugin/plugin.json")"
dist="$root/dist"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

rm -rf "$dist"
mkdir -p "$dist/skills"

# Whole plugin: the zip holds the folder spec-driven/ with .claude-plugin/plugin.json inside.
(cd "$root/plugins" && zip -qrX "$dist/spec-driven-plugin-$version.zip" spec-driven)

# What each standalone skill needs besides its SKILL.md.
declare -A templates=(
  [adopt]="CLAUDE.md decisions.md docs-README.md phase-brief.md project-instructions.md pull_request_template.md settings.json rules"
  [spec]="spec.md"
  [brief]="phase-brief.md"
)
declare -A agents=(
  [ticket]="checker.md access-reviewer.md"
  [verify]="checker.md"
)

for dir in "$plugin"/skills/*/; do
  name="$(basename "$dir")"
  out="$work/$name"
  cp -R "$dir" "$out"
  for t in ${templates[$name]:-}; do
    mkdir -p "$out/templates"
    cp -R "$plugin/templates/$t" "$out/templates/"
  done
  for a in ${agents[$name]:-}; do
    mkdir -p "$out/agents"
    cp "$plugin/agents/$a" "$out/agents/"
  done
  (cd "$work" && zip -qrX "$dist/skills/$name-$version.zip" "$name")
done

ls -1 "$dist" "$dist/skills"
