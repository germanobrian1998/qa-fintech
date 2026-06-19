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

## B-001 — Account lockout affects shared test credentials

**Severity:** Medium
**Type:** Test Environment / Data Management

### Description
PST locks user accounts after multiple failed login attempts.
Running negative auth tests (wrong password scenarios) against
the same account used for positive tests causes account lockout,
breaking subsequent positive test scenarios.

### Evidence
- Status 423 returned by POST /users/login after failed attempts
- UI shows: "Account locked, too many failed attempts."

### Impact
- Smoke suite partially broken when run multiple times
- customer@practicesoftwaretesting.com locked after negative tests

### Solution applied
Separated test credentials by scenario type:
- Positive tests: customer@practicesoftwaretesting.com
- Negative tests: admin@practicesoftwaretesting.com

### Fintech relevance
In production fintech systems, account lockout is a critical
security control (PCI-DSS Req. 8.3.4). Test environments must
use isolated credentials per test type to avoid cross-contamination.
Maps to OWASP API Security: API2 - Broken Authentication.