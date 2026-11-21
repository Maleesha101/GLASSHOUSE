import { useEffect, useState } from "react";

const portals = {
  "vendors.glasshouse.test": {
    eyebrow: "EXTERNAL PARTNER NETWORK",
    title: "Vendor Workspace",
    description: "Contractor communications and service bulletins will be available here in a later milestone.",
  },
  "vault.glasshouse.test": {
    eyebrow: "DIGITAL EVIDENCE SERVICES",
    title: "Evidence Vault",
    description: "The isolated evidence service will be introduced after the core application foundation is verified.",
  },
};

function StatusIndicator({ state }) {
  const label = state === "online" ? "All systems operational" : state === "offline" ? "API unavailable" : "Checking services";
  return (
    <span className={`status status--${state}`}>
      <span className="status__dot" />
      {label}
    </span>
  );
}

export default function App() {
  const [apiState, setApiState] = useState("checking");
  const [databaseState, setDatabaseState] = useState("checking");
  const host = window.location.hostname;
  const portal = portals[host];

  async function checkHealth() {
    setApiState("checking");
    setDatabaseState("checking");
    try {
      const response = await fetch("/api/v1/health/ready", { headers: { Accept: "application/json" } });
      const payload = await response.json();
      if (!response.ok) throw new Error("API is not ready");
      setApiState("online");
      setDatabaseState(payload.dependencies?.database === "ok" ? "online" : "offline");
    } catch {
      setApiState("offline");
      setDatabaseState("offline");
    }
  }

  useEffect(() => {
    checkHealth();
  }, []);

  const portalTitle = portal?.title ?? "Operations Console";

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand__mark">G</span>
          <span>GLASSHOUSE<span className="brand__sub">URBAN SYSTEMS</span></span>
        </a>
        <div className="topbar__right">
          <span className="environment">LOCAL TRAINING ENVIRONMENT</span>
          <StatusIndicator state={apiState} />
        </div>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">{portal?.eyebrow ?? "CITY INFRASTRUCTURE · INCIDENT RESPONSE"}</p>
          <h1>{portalTitle}</h1>
          <p className="hero__description">
            {portal?.description ?? "A unified operational view for monitoring district infrastructure, service health, and incident response."}
          </p>
        </div>
        <div className="hero__ornament" aria-hidden="true">
          <div className="orbit orbit--one" />
          <div className="orbit orbit--two" />
          <div className="orbit orbit--three" />
          <span className="orbit__core">GH</span>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">SYSTEM OVERVIEW</p>
          <h2>Platform services</h2>
        </div>
        <button className="refresh" onClick={checkHealth} type="button">↻ Refresh status</button>
      </section>

      <section className="service-grid" aria-label="Platform service health">
        <article className="service-card">
          <div className="service-card__top"><span className="service-icon">UI</span><span className="service-card__tag">WEB</span></div>
          <h3>Participant interface</h3>
          <p>Challenge console and portal routing</p>
          <span className="service-state service-state--online">● Running</span>
        </article>
        <article className="service-card">
          <div className="service-card__top"><span className="service-icon">API</span><span className="service-card__tag">NODE.JS</span></div>
          <h3>Operations API</h3>
          <p>Health and application endpoints</p>
          <span className={`service-state service-state--${apiState}`}>● {apiState === "online" ? "Healthy" : apiState === "offline" ? "Unavailable" : "Checking"}</span>
        </article>
        <article className="service-card">
          <div className="service-card__top"><span className="service-icon">DB</span><span className="service-card__tag">POSTGRESQL</span></div>
          <h3>Operational database</h3>
          <p>Private persistent data store</p>
          <span className={`service-state service-state--${databaseState}`}>● {databaseState === "online" ? "Connected" : databaseState === "offline" ? "Unavailable" : "Checking"}</span>
        </article>
        <article className="service-card">
          <div className="service-card__top"><span className="service-icon">GW</span><span className="service-card__tag">NGINX</span></div>
          <h3>Gateway</h3>
          <p>Local virtual-host routing</p>
          <span className="service-state service-state--online">● Serving this page</span>
        </article>
      </section>

      {!portal && (
        <section className="portal-panel">
          <div>
            <p className="eyebrow">CONNECTED WORKSPACES</p>
            <h2>Operational portals</h2>
            <p className="portal-panel__description">These local-only portals are reserved for upcoming challenge milestones.</p>
          </div>
          <div className="portal-links">
            <a href="http://vendors.glasshouse.test:8080/">Vendor Workspace <span>↗</span></a>
            <a href="http://vault.glasshouse.test:8080/">Evidence Vault <span>↗</span></a>
            <a href="http://api.glasshouse.test:8080/api/v1">Operations API <span>↗</span></a>
          </div>
        </section>
      )}

      <footer className="footer">
        <span>GLASSHOUSE // OPERATION GLASSHOUSE</span>
        <span>AUTHORIZED TRAINING LAB · SYNTHETIC DATA ONLY</span>
      </footer>
    </main>
  );
}
