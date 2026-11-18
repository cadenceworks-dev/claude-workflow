---
paths:
  - "api/**"
---

# API rules

- Authorization on every call: own data, own team (approver), people only (HR). Decide it on the
  server from the session, never from a field in the request.
- The tenant id comes from the session. Every table key and every S3 path starts with it. A
  request that names another tenant is an error, not a filter.
- Nobody approves their own report or advance, including through a delegation.
- Receipts and statements are private: clients get short-lived signed links, never public URLs.
- Users are disabled, never deleted. Changes to people, roles and approvals go to the audit log.
- Never log receipt contents, bank statement lines, tokens or login codes.
- Secrets come from Secrets Manager at run time, never from environment variables in the code
  or the Terraform state.
- Every new endpoint gets tests for: the happy path, a caller without the right, and a caller
  from another tenant.
- Request and response types live in `shared/` and are used by web and phone.
