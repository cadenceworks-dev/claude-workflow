# Example: FareSlip (optional)

Real files from the project this workflow came from: a pnpm monorepo with an Expo phone app, a
Vite web app, a TypeScript API on AWS Lambda, Terraform infrastructure and data of several
companies (tenants) in one system. **Use them as inspiration only.** Copy a rule only when it is
true for your project.

| File                 | Shows                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `rules/api.md`       | Path rules for an API holding several tenants' data (authorization, tenant from session) |
| `rules/mobile.md`    | Path rules for an offline-first Expo app (versions, texts in two languages, builds)      |
| `rules/infra.md`     | Path rules for Terraform and GitHub Actions (pinned actions, no new prod workflow)       |
| `settings.json`      | Allow list for checks; deny list for Terraform apply, EAS builds, pushes to main, keys   |
| `tenant-reviewer.md` | The project-specific version of `access-reviewer`, written for tenants                   |
| `ci.yml`             | CI checks: lint, format, types, tests, builds, Expo version check, gitleaks, checkov     |
| `stop-and-ask.md`    | FareSlip's "Stop and ask" list                                                           |

The project's own skills (`brief`, `ticket`, `verify`) are the source of this plugin's versions.
