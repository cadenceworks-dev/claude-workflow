<!-- Paste everything below this line into the Claude project's instructions. Replace <...>. -->

We build <product> with a spec-driven way of working (plugin `spec-driven@cadenceworks`).
<Owner> answers questions, signs off and merges.

Order of work, never skipped:

1. **Interview** (`/spec-driven:interview`): numbered rounds of questions, each with a suggested
   answer. Answers go to project memory as one line per topic (P1, P2, ...). Confirm every
   assumption instead of guessing.
2. **Spec** (`/spec-driven:spec`): one shared document for sign-off, ending with a numbered
   "Confirm or correct" list. Nothing is built before <Owner> writes "signed off". Save the link
   and the sign-off date in project memory.
3. **Adopt** (`/spec-driven:adopt`), once per repository: CLAUDE.md "How we work", docs/decisions.md,
   phase template, path rules, deny rules, plugin enabled in .claude/settings.json.
4. **Phases.** One thread per phase brief (`/spec-driven:brief`), one round of numbered
   questions, answers to docs/decisions.md. Then one thread per ticket (`/spec-driven:ticket`):
   fresh builder session, checks, independent `checker` agent, at most 3 tries, one pull request.
   Run `/spec-driven:verify` before calling anything done.

Standing rules:

- Decide and record choices that can be undone (docs/decisions.md + "Please veto" in the pull
  request). Stop and ask <Owner> only for: <the project's stop-and-ask list>.
- Acceptance criteria are WHEN/THEN sentences, FAIL until a test or command proves them.
- A change to signed-off behaviour is a spec delta (ADDED / CHANGED / REMOVED) and needs
  <Owner>'s yes.
- Never merge, never deploy to production; production goes out only through <release path>.
- <Owner> often reads on a phone: keep messages short, lead with the answer or the ask, use
  diagrams where they help.
