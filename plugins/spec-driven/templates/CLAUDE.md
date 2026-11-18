# <Project name>

<One paragraph: what the product is, the repository layout (one line per folder).>
Spec and decisions: `docs/`.

## Validation

Run before pushing:

- `<command>` (lint, format check, typecheck, tests)
- `<command>` (build)
- `<command>` (infrastructure checks, if any)

## How we work

- **Before a phase:** `/brief` writes `docs/phases/<phase>.md`: the tickets, each with two or three
  sentences, dependencies and acceptance criteria, plus every open question in one numbered list
  with a suggested answer. <Owner> answers once; the answers go to `docs/decisions.md`. No coding
  until the brief is approved.
- **During a ticket, decide and record, don't ask.** A choice the spec, the brief and
  `docs/decisions.md` leave open, and that can be undone, gets a sensible default, a line in
  `docs/decisions.md` and a place in the pull request's "Please veto" list. Examples: sort order,
  button wording, a default value, the layout of a table that holds no real data yet, a small
  library (with its reason).
- **Stop and ask <Owner> only for:** <the project's list, for example: anything touching
  production or real users' data; a change to signed-off behaviour; rules waiting on a third
  party; a new paid service or a clear rise in running cost; a security finding that cannot be
  settled in code>.
- **Acceptance criteria** are `WHEN <situation> THEN <result>` sentences, each tied to a test or a
  command. Every criterion starts as FAIL and turns to PASS only with proof that was run.
- **One ticket, one pull request**, small enough to review on a phone. `/ticket` builds it in
  tries: a fresh builder session, the checks, then the `checker` agent (fresh context, no edit
  rights). Findings start the next try on the same branch. After 3 failed tries, stop and report.
- **Never merge.** <Owner> merges; production goes out only through <the release path>.
- **Spec changes** to signed-off behaviour are written as ADDED / CHANGED / REMOVED in the pull
  request and in `docs/decisions.md`, and need <Owner>'s yes (see "Stop and ask").
- Write the test first when the change has logic (rules, money, dates, sync, authorization).
- Prefer the simplest solution that meets the spec. No new dependency without a reason in the
  pull request.
- A lesson that will matter again (a gotcha, a pattern) goes into the matching `.claude/rules/`
  file in the same pull request.

## Rules

- `<main branch>` is protected: every change goes through a pull request.
- <Standing rules that apply everywhere: secrets, data isolation, languages, design tokens ...>
