# Test Execution Limitations

## CI-001 — Smoke tests against external SUT

**Status:** Tests run locally, skipped in CI pipeline
**Type:** Infrastructure limitation

### Description
Smoke tests target `practicesoftwaretesting.com`, a publicly hosted
SUT outside our control. GitHub Actions runners experience variable
network latency to this server, causing intermittent timeouts even
with 30000ms configured.

### Evidence
- Local execution: 2/2 scenarios pass consistently (~13s)
- CI execution: timeouts at `waitForSelector('[data-test="email"]')`
  after 30000ms due to network latency from GitHub Actions runners

### Impact
- Pipeline does not fail on test timeouts (`continue-on-error: true`)
- Tests are validated locally before every merge
- No test coverage gap — same scenarios pass in local environment

### Proposed solution
Self-host PST via Docker in CI to eliminate external network dependency.
Tracked as future improvement for Phase 2 of this project.

### References
- [Practice Software Testing Docker image](https://github.com/testsmith-io/practice-software-testing)
- Similar pattern documented in parabank-qa-portfolio: `docs/not-automated.md`