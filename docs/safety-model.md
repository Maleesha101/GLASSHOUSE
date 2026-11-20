# Safety model

GLASSHOUSE intentionally contains vulnerable application behavior for authorized training. Vulnerable services must remain a disposable, synthetic lab.

## Non-negotiable controls

1. No production integrations, production credentials, or real personal data.
2. No public exposure by default. Local development binds to localhost.
3. No arbitrary internet access from the analyst browser.
4. No host filesystem, Docker socket, cloud metadata, or host network access from the browser worker.
5. Browser navigation and API requests are restricted to lab hostnames.
6. The challenge engine and flag validator are not exposed through the vulnerable application origin.
7. Synthetic sessions are short-lived and resettable.
8. Every stage event is scoped to a challenge/team run and is auditable.
9. A reset removes all per-run state and disposable browser contexts.
10. Production hosting requires a separate deployment review and explicit isolation validation.

## Threats considered

- Participant attempts to escape the browser container.
- Malicious bulletin content attempts to reach external destinations.
- Cross-team state leakage.
- Flag disclosure through frontend bundles, logs, or API responses.
- Accidental exposure of vulnerable services to the public internet.
- Participants forge stage-completion requests.

## Test requirements

Each milestone must add tests for its own safety boundary. M5 must include browser-enforced CORS tests. M6 must test both intentionally vulnerable behavior and a reference authorization policy. M8 must test team isolation and reset behavior.
