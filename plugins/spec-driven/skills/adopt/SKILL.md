---
name: adopt
description: Set up a repository for the spec-driven way of working - CLAUDE.md "How we work", docs/decisions.md, the phase brief template, path rules, deny rules for deploys and secrets, the plugin enabled for every session, and a pull request template. Use when asked to adopt, install, set up or bootstrap this workflow in a repository.
---

# Adopt the workflow in a repository

Templates are in `templates/` next to this skill (standalone upload) or in the plugin's
`templates/` folder (`${CLAUDE_PLUGIN_ROOT}/templates/`). Examples from a real project (Expo phone
app, AWS, multi-tenant API) are in the plugin's `examples/fareslip/`, when present: use them only
as inspiration, never copy them as they are.

## 1. Read before writing

- Read the repository: languages, package manager, the checks CI runs, deploy workflows,
  existing `CLAUDE.md`, `.claude/` and `docs/`. Never overwrite: merge into what exists.
- Collect from the owner, in one numbered message with suggested answers (skip what the
  repository or project memory already answers):
  1. Owner's name (who answers questions, signs off and merges).
  2. Validation commands to run before pushing (suggest the ones CI runs).
  3. The "Stop and ask" list (suggest: production and real users' data, signed-off behaviour,
     rules waiting on a third party, new paid services or a cost jump, unresolved security
     findings).
  4. Commands Claude must never run (suggest: deploys, infrastructure apply/destroy, store
     submissions, pushes to the main branch, force pushes).
  5. Files Claude must never read (suggest: `.env*`, keys, keystores, state files with secrets).
  6. Areas that need their own rules (for example `api/`, `web/`, `infra/`).
  7. Whether the code holds data of several customers or users that must stay apart (turns on
     the `access-reviewer` agent in `/ticket`).

## 2. Write the files

| File                                           | From template                    | Notes                                                    |
| ---------------------------------------------- | -------------------------------- | -------------------------------------------------------- |
| `CLAUDE.md`                                    | `CLAUDE.md`                      | Add the "How we work" and "Validation" sections          |
| `docs/README.md`                               | `docs-README.md`                 | Link to the signed-off spec                              |
| `docs/decisions.md`                            | `decisions.md`                   | Starts with "How changes are made"                       |
| `docs/phases/TEMPLATE.md`                      | `phase-brief.md`                 |                                                          |
| `.claude/rules/<area>.md`                      | `rules/area.md`                  | One per area, with `paths:` front matter                 |
| `.claude/settings.json`                        | `settings.json`                  | Allow the validation commands, deny the rest; see below  |
| `.github/pull_request_template.md`             | `pull_request_template.md`       | Or the equivalent for the code host                      |

Replace every `<placeholder>`. Keep `CLAUDE.md` short: every line is read by every session.

### Settings

`.claude/settings.json` does three jobs:

- `permissions.allow`: the validation commands, so checks never wait for a click.
- `permissions.deny`: the commands and files from answers 4 and 5. Deny rules are the hard stop
  that does not depend on Claude remembering a rule.
- `extraKnownMarketplaces` and `enabledPlugins`: local Claude Code sessions in this repository
  (terminal, desktop Code tab) offer the plugin to every collaborator. Cloud sessions ignore these
  two keys: there the plugin comes from the claude.ai account (Customize > Plugins) or from the
  vendored copy below.

### Vendored copy (only when asked, or when the plugin cannot be installed)

When the owner's organization blocks plugins, or a project must work without any install, copy
the plugin into the repository instead: `skills/*` to `.claude/skills/`, `agents/*` to
`.claude/agents/`, and `hooks/format.mjs` to `.claude/hooks/` with a `PostToolUse` hook in
`.claude/settings.json` that runs `node "$CLAUDE_PROJECT_DIR/.claude/hooks/format.mjs"`. Replace
`${CLAUDE_PLUGIN_ROOT}/templates/` references with `docs/` paths. Note the plugin version in
`docs/decisions.md` so the copy can be refreshed later. Commands are then `/brief`, `/ticket` and
`/verify`, without the `spec-driven:` prefix.

## 3. Check and hand over

- Check that `.claude/settings.json` is valid JSON and run the repository's own checks.
- Open one pull request ("Adopt the spec-driven workflow"). In its description, list the stop
  and ask cases and the deny rules so the owner can veto them.
- Then: no spec yet, offer `interview`; a spec but no brief, offer `brief` for phase 0.
