---
paths:
  - "mobile/**"
---

# Phone app rules

- Offline first: every screen works without a network. Writes go to the local database and an
  outbox queue; the network is only touched by the sync code. Never call the API directly from a
  screen for something the user can do offline.
- Files (receipt photos, statements) stay on the phone until their upload is confirmed.
- OCR runs only when online. The user can always type the values by hand.
- The phone has no approval screens. Approvals happen in the web app.
- The environment comes from the update channel (`src/lib/config.ts`). Never switch it with an
  `EXPO_PUBLIC_*` value in an installed build.
- UI: NativeWind classes and the components in `src/components/ui` (react-native-reusables
  style). Colors only from the shared tokens. Touch targets at least 44 points high. Light and
  dark follow the system.
- Every text goes through `t()` with keys in `shared/src/i18n`, in English and Romanian.
- Add an Expo package with `pnpm exec expo install <name>` so its version matches the SDK.
- A change that needs new native code needs a new build: raise `version` in `app.json` and say so
  in the pull request. Everything else ships as an over-the-air update.
- Tests: `pnpm --filter @fareslip/mobile test` (jest-expo, files named `*.test.ts(x)` next to the
  code).
