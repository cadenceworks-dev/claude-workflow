---
name: brief
description: Plan one build phase before any code - tickets, WHEN/THEN acceptance criteria, dependencies and every open question in one round. Use when starting a phase or asked to plan, break down or brief the next part of the build.
---

# Brief one phase

Output: `docs/phases/<phase>.md`, following `docs/phases/TEMPLATE.md` (or
`${CLAUDE_PLUGIN_ROOT}/templates/phase-brief.md`), in a pull request of its own. The brief is the
only planning file: there are no separate ticket files.

1. **Read** the spec sections for the phase, `docs/decisions.md`, earlier briefs and the code that
   exists. Do not assume something is missing: search first.
2. **Tickets.** Split the phase into tickets that each fit one pull request small enough to review
   on a phone. Describe each in two or three sentences; if that is not enough, split it. Order
   them by dependency (shared types and texts, then back end and infrastructure, then user
   interfaces). Mark tickets that wait on someone else as blocked and leave them out of the run.
3. **Criteria.** Give each ticket 2 to 8 criteria as `WHEN <situation> THEN <result>`, each one
   something a test or a command can prove. Add the standing criteria from `CLAUDE.md` and
   `.claude/rules/` that apply (for example: a caller without the right is refused; texts exist
   in every language; the app works offline).
4. **Questions.** Collect every point the spec and `docs/decisions.md` leave open and that falls
   under "Stop and ask" in `CLAUDE.md`, or that would change what a ticket delivers. Number them,
   give a suggested answer for each, and keep the list short: choices that can be undone are not
   questions, they are decided during the build (default-and-record).
5. **Hand over.** Open the pull request and send the owner the numbered questions, once. When they
   answer, write the answers to `docs/decisions.md` and update the brief in the same pull request.
   Tickets start only after it is merged.
