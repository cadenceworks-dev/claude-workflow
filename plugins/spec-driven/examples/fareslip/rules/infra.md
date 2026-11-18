---
paths:
  - "infra/**"
  - ".github/workflows/**"
---

# Infrastructure and workflow rules

- Never run `terraform apply` or `terraform destroy` from a session. Dev is deployed by merging
  to `main`, prod only by the "Release to prod" workflow started by Franck.
- Never add a workflow or job that uses the `prod` environment.
- A change goes into a module under `infra/modules` and is used by both `envs/dev` and
  `envs/prod`. The two environments differ only by variables.
- Region is `eu-north-1`. CloudFront certificates are the only `us-east-1` resources.
- No WAF and no Lambda@Edge: they are unavailable on the current AWS plan.
- A new checkov skip needs a one-line reason in `infra/.checkov.yaml`.
- Secrets never enter the Terraform state: use write-only arguments or create the value outside
  Terraform.
- GitHub Actions are pinned to commit hashes with the version in a comment. Downloaded binaries
  are checked against a checksum.
- Before pushing: `terraform fmt -recursive infra`, `terraform validate` in both environments,
  and checkov.
