import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Badge {
  id: string;
  name: string;
  badgeNumber: string;
  accessLevelIds: string[];
  maskedFunctions?: string[];
}

interface AccessLevel {
  id: string;
  name: string;
  doors: string[];
  functions: string[];
}

interface Schedule {
  id: string;
  name: string;
  rules: Array<{ day: string; start: string; end: string }>;
}

interface Door {
  id: string;
  name: string;
  location: string;
  scheduleId?: string;
}

const api = axios.create({ baseURL: 'http://localhost:4000/api/access' });

function App() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function load() {
      try {
        const [badgeRes, levelRes, doorRes, scheduleRes] = await Promise.all([
          api.get('/badges'),
          api.get('/access-levels'),
          api.get('/doors'),
          api.get('/schedules'),
        ]);
        setBadges(badgeRes.data);
        setAccessLevels(levelRes.data);
        setDoors(doorRes.data);
        setSchedules(scheduleRes.data);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    }

    load();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Total PACS System</h1>
        <p>Badge management, access levels, schedules, doors, and AWS-backed storage.</p>
      </header>

      {status === 'loading' && <p>Loading system data...</p>}
      {status === 'error' && <p>Unable to connect to backend.</p>}

      <section>
        <div className="panel">
          <h2>Badges</h2>
          {badges.length === 0 ? <p>No badges defined.</p> : (
            <ul>
              {badges.map((badge) => (
                <li key={badge.id}>
                  <strong>{badge.name}</strong> ({badge.badgeNumber})
                  <div>Access levels: {badge.accessLevelIds.join(', ') || 'none'}</div>
                  <div>Masked functions: {badge.maskedFunctions?.join(', ') || 'none'}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <h2>Access Levels</h2>
          {accessLevels.length === 0 ? <p>No access levels configured.</p> : (
            <ul>
              {accessLevels.map((level) => (
                <li key={level.id}>
                  <strong>{level.name}</strong>
                  <div>Doors: {level.doors.join(', ') || 'none'}</div>
                  <div>Functions: {level.functions.join(', ') || 'none'}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <div className="panel">
          <h2>Doors</h2>
          {doors.length === 0 ? <p>No doors configured.</p> : (
            <ul>
              {doors.map((door) => (
                <li key={door.id}>
                  <strong>{door.name}</strong> @ {door.location}
                  <div>Schedule: {door.scheduleId || 'none'}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <h2>Schedules</h2>
          {schedules.length === 0 ? <p>No schedules defined.</p> : (
            <ul>
              {schedules.map((schedule) => (
                <li key={schedule.id}>
                  <strong>{schedule.name}</strong>
                  <div>
                    {schedule.rules.map((rule, index) => (
                      <div key={index}>{rule.day}: {rule.start} - {rule.end}</div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
