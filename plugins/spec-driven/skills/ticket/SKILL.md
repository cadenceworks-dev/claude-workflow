---
name: ticket
description: Build one ticket from an approved phase brief, start to pull request, in fresh-session tries until an independent checker passes it (at most 3 tries). Use when asked to build, implement or start a ticket, a feature slice or a numbered item from a phase brief.
---

# Build one ticket

Input: a ticket from an approved brief in `docs/phases/`. A ticket without `WHEN ... THEN ...`
criteria is not ready: write them into the brief and ask the owner once, with the other questions.

You coordinate. The building and the checking each happen in a fresh session (a subagent), so no
session grades its own work. With this plugin installed the agents are named
`spec-driven:checker` and `spec-driven:access-reviewer`; a project may also define its own
`checker` in `.claude/agents/`, which then wins.

```
start -> try 1 (builder) -> checks + checker -> PASS -> pull request
                 ^                    |
                 +---- findings ------+  NEEDS WORK (max 3 tries, then draft PR + report)
```

1. **Start.** Create the branch from the main branch. List the spec sections and
   `docs/decisions.md` entries that apply. Open questions that fall under "Stop and ask" in
   `CLAUDE.md` go to the owner now, in one message; everything else is decided during the build.
2. **Try (fresh builder).** Start a `general-purpose` subagent with: the ticket and its criteria,
   the branch name, `CLAUDE.md` and the `.claude/rules/` files that apply, and, from try 2 on, the
   checker's findings. Its job:
   - Plan the files per area; shared types and texts first.
   - Write the test first when the change has logic (rules, money, dates, sync, authorization).
     Every new endpoint gets a test for a caller without the right (and, with several customers
     in one system, a caller from another customer).
   - Build the smallest change that meets the criteria. No stubs, no placeholders.
   - Decide open choices that can be undone, write each to `docs/decisions.md`, and list them for
     the "Please veto" section.
   - Run the validation commands for the areas touched; fix what fails; never skip or weaken a
     test. Commit to the branch.
3. **Check.** Run the validation commands yourself and keep the output. Then start the `checker`
   agent on the branch with the ticket and criteria. When the change touches authorization or data
   access, also run `access-reviewer`.
4. **Loop.** `NEEDS WORK`, a failed command or an access finding starts the next try (step 2) with
   the findings. A finding marked `ASK OWNER` stops the loop and goes to the owner. After 3 tries
   that do not pass, stop: open a draft pull request and tell the owner what still fails and why.
5. **Learn.** If a try failed for a reason that will come back (a gotcha, a pattern), add one line
   to the matching `.claude/rules/` file in the same pull request.
6. **Pull request.** One ticket, one pull request, never merged by you. The description has:
   - what changed;
   - a table of each criterion, its proof (test name or command) and PASS;
   - "Please veto": the defaults chosen, each with a link to its `docs/decisions.md` line;
   - "Spec delta" when signed-off behaviour changed: ADDED / CHANGED / REMOVED (needs the owner's
     yes);
   - what could not be verified here (cloud accounts, external services, real devices);
   - the number of tries.
