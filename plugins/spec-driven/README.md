# spec-driven

Spec-driven way of working for Claude: interview, signed-off spec, one brief per phase with
WHEN/THEN acceptance criteria, tickets built in fresh-session tries and judged by an independent
checker.

Install from the marketplace (on claude.ai: Customize > Plugins > Add > Add marketplace,
`cadenceworks-dev/claude-workflow`), or upload the release zip where marketplaces are blocked.
In Claude Code:

```
/plugin install spec-driven --marketplace cadenceworks-dev/claude-workflow
```

Setup for Claude accounts and projects, and the full picture: see the [repository README](../../README.md).

| Folder                 | Contents                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| `skills/`              | `interview`, `spec`, `adopt`, `brief`, `ticket`, `verify`               |
| `agents/`              | `checker`, `access-reviewer`                                            |
| `hooks/`               | Format-on-edit with the project's own formatter (`SPEC_DRIVEN_FORMAT=off` turns it off) |
| `templates/`           | Files `adopt` copies into a repository, and the project instructions    |
| `examples/fareslip/`   | Optional: real rules from an Expo + AWS + multi-tenant project          |

Project-agnostic on purpose: anything about a stack, a cloud or a data model belongs in the
project's own `.claude/rules/`, written during `adopt` and grown by `/ticket`.
