import { useState } from 'react';
import './App.css';

type Tab = 'summary' | 'sites-doors' | 'badges' | 'schedules';

const NAV: { id: Tab; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'sites-doors', label: 'Sites & Doors' },
  { id: 'badges', label: 'Badges' },
  { id: 'schedules', label: 'Schedules' },
];

export default function App() {
  const [active, setActive] = useState<Tab>('summary');

  return (
    <div className="shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Total PACS System</p>
          <h1>Enterprise access infrastructure management</h1>
          <p className="tagline">Portfolio-style client with AWS serverless control APIs.</p>
        </div>
      </header>

      <div className="body">
        <aside className="sidebar">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`nav-btn${active === item.id ? ' active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <span className="nav-dot" />
              {item.label}
            </button>
          ))}
        </aside>

        <main className="content">
          {active === 'summary' && (
            <section className="page">
              <h2>Product Summary</h2>
              <p className="lead">
                Manage multi-site PACS entities including facilities, readers, badges, and access schedules.
              </p>
              <div className="card-grid">
                <article className="card"><h3>Site Topology</h3><p>Define buildings, floors, doors, and controller assignments.</p></article>
                <article className="card"><h3>Badge Lifecycle</h3><p>Issue, suspend, and revoke badges with role binding.</p></article>
                <article className="card"><h3>Schedules</h3><p>Apply time windows and holiday exceptions to doors.</p></article>
                <article className="card"><h3>Audit Stream</h3><p>Capture access outcomes with immutable timestamps.</p></article>
              </div>
            </section>
          )}

          {active === 'sites-doors' && (
            <section className="page">
              <h2>Sites and Doors MVP</h2>
              <div className="list-card">
                <code>GET /api/sites</code>
                <code>POST /api/sites</code>
                <code>GET /api/doors</code>
                <code>POST /api/doors</code>
              </div>
            </section>
          )}

          {active === 'badges' && (
            <section className="page">
              <h2>Badges MVP</h2>
              <div className="list-card">
                <code>GET /api/badges</code>
                <code>POST /api/badges</code>
                <code>PATCH /api/badges/:id/status</code>
              </div>
            </section>
          )}

          {active === 'schedules' && (
            <section className="page">
              <h2>Schedules MVP</h2>
              <div className="list-card">
                <code>GET /api/schedules</code>
                <code>POST /api/schedules</code>
                <p>Schedule assignments tie roles and doors by time window.</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
