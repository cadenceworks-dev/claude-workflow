---
name: interview
description: Interview the owner about a new product or a big change before any spec is written - goals, users, rules, platforms, constraints - in short numbered rounds with a suggested answer for each question. Use when starting a new project, rebooting one, or when asked to define, scope or discover what to build.
---

# Interview before the spec

Goal: enough confirmed answers to write a spec the owner can sign off without surprises. Nothing
is built during the interview.

## How to ask

- **Read first.** Read what already exists: project memory, project files, old apps, repositories,
  documents the owner shared. Never ask what a file already answers; say where you found it.
- **Rounds, not walls.** Ask one topic per round, 3 to 7 numbered questions. Number topics
  `P1, P2, ...` and questions `P1.1, P1.2, ...` so the owner can answer "P2.3: no".
- **Suggest an answer for every question.** The owner should be able to reply "all as suggested
  except 4". Mark the one or two questions where your suggestion is a real guess.
- **Confirm assumptions.** Anything you would otherwise assume goes in the round as a question.
- **Stop when it stops changing the spec.** Leave detail that can be decided during the build
  (wording, sort orders, colors) for default-and-record later.

## Topics to cover (skip what does not apply)

| #   | Topic                    | What you need to know                                                    |
| --- | ------------------------ | ------------------------------------------------------------------------ |
| P1  | Problem and users        | Who uses it, what they do today, what hurts, what success looks like     |
| P2  | Roles and rules          | Roles, permissions, approvals, business rules, limits, edge cases        |
| P3  | Data                     | What is stored, who owns it, retention, privacy, imports and exports     |
| P4  | Platforms and UX         | Web, phone, desktop; offline; languages; accessibility; brand            |
| P5  | Integrations             | Email, identity, payment, OCR, other systems, what is already paid for   |
| P6  | Hosting and environments | Cloud accounts, dev and prod, domains, deploy path, who releases to prod |
| P7  | Security                 | Sign-in, authorization, secrets, audits, compliance                      |
| P8  | Repo and tooling         | Repository, languages, CI, the checks that must pass                     |
| P9  | Scope and phases         | First release, what waits, pilot users, dates if any                     |
| P10 | Way of working           | Who signs off, who merges, what must always stop and ask (see below)     |

P10 must produce the project's **"Stop and ask" list**: the cases where Claude never decides
alone (typical: production and real users' data, signed-off behaviour, rules waiting on a third
party, new paid services or cost jumps, unresolved security findings).

## Record

After each round, write the answers down where the next session will find them:

- in a Claude project: one line per topic in project memory (`P1: ...`), plus open points;
- in a repository: `docs/interview.md`, one section per topic, answers and open points.

Keep every "waiting on someone" item (for example a rule waiting on Finance or Legal) in a list of
its own: it becomes the "Blocked" part of later phase briefs.

## Hand over

When every topic is answered or explicitly parked, say so and offer to write the spec with the
`spec` skill.
