---
name: verify
description: Check a change against its WHEN/THEN acceptance criteria and the spec before calling it done - every criterion is FAIL until its proof has been run. Use before opening or merging a pull request, or when asked whether something is really finished.
---

# Verify before done

Never report "done" from reading the code alone. Each claim needs something that was run. Every
criterion counts as FAIL until its proof has been run in this session.

1. Collect the `WHEN ... THEN ...` criteria from the brief in `docs/phases/`, the pull request or
   the spec section. If there are none, stop and ask for them.
2. Run the validation commands in `CLAUDE.md` for the areas touched and keep the output.
3. For each criterion, find the proof: a test that covers it, or a command or screen that shows
   it. A criterion without proof gets a new test, or stays FAIL and is reported as not verified.
4. Check the standing rules for the change: the ones in `CLAUDE.md` and in the `.claude/rules/`
   files whose paths match, plus:
   - defaults chosen are in `docs/decisions.md` and in the "Please veto" list;
   - signed-off behaviour changed only with a "Spec delta" section and the owner's yes;
   - nothing touches production outside the release path the owner controls.
5. For a ticket, run the `checker` agent as well: the builder's own check is not enough.
6. Report a table: criterion, proof, result (PASS, FAIL, not verified). List what could not be
   run here (cloud accounts, external services, real devices) so the owner knows what to check by
   hand.
