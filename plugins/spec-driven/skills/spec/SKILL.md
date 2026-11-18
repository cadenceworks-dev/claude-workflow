---
name: spec
description: Write the product spec for sign-off from the interview answers, end it with numbered confirmations, and record the sign-off; also write spec deltas (ADDED / CHANGED / REMOVED) when signed-off behaviour must change. Use after an interview, when asked to write or update the spec, or when a change touches signed-off behaviour.
---

# Write the spec for sign-off

The spec is the contract. Phases, tickets and checks all point back to it, so it must be signed
off before any build work starts.

## Where it lives

- In a Claude project: a shared document (a Claude Doc or an Artifact) so the owner can read and
  comment on a phone. Put its link in project memory and in `docs/README.md` of the repository.
- Without that: `docs/spec.md` in the repository, merged by pull request.

Use the `spec.md` template, in `templates/` next to this skill or in the plugin's `templates/`
(`${CLAUDE_PLUGIN_ROOT}/templates/`). Keep sections short; use a diagram
where a flow or a structure is easier to see than to read (Mermaid in Markdown).

## Writing it

1. Start from the interview record (project memory `P1..Pn` or `docs/interview.md`) and the
   existing material. Cite where each rule came from when it is not obvious.
2. Write rules as testable statements. "Meals over 30 EUR are flagged before submit" is a rule;
   "meals are handled sensibly" is not. Each rule should later turn into `WHEN ... THEN ...`
   criteria.
3. Split the build into **phases**: phase 0 is foundations (repository, CI, environments, deploy,
   empty apps), then thin vertical slices that each give a user something they can try.
   No dates unless the owner gave one.
4. End with **"Confirm or correct"**: a numbered list of every assumption and open question,
   each with your suggested answer. The owner replies with only the numbers they disagree with.
5. List what waits on someone else (Finance, Legal, a vendor) under "Blocked": those rules stay
   out of the build until answered.

## Sign-off

- Update the spec with the owner's answers, then ask for an explicit sign-off ("signed off").
- Record it: date and link in `docs/decisions.md` under "How changes are made", and in project
  memory (`SPEC SIGNED OFF <date>: <link>`).
- From now on the spec only changes through spec deltas.

## Spec deltas

A change to signed-off behaviour (a limit, an approval rule, retention, a role's rights) is never
made quietly in code. Write it as:

```markdown
## Spec delta (<date>, <pull request>)

- ADDED: <new rule>
- CHANGED: <old rule> -> <new rule>
- REMOVED: <rule>

Reason: <why>. Owner's yes: <link or "pending">.
```

Put it in the pull request description and in `docs/decisions.md`, update the spec document, and
wait for the owner's yes before merging.
