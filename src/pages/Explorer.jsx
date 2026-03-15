import React, { useEffect, useState } from 'react';
import SubsystemCard from '../components/SubsystemCard';

export default function Explorer() {
  const [ledgerParserStatus, setLedgerParserStatus] = useState(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        const res = await fetch('https://berry-platform-backend.vercel.app/api/ledger-parser-status');
        const data = await res.json();
        setLedgerParserStatus(data);
      } catch (err) {
        console.error('Failed to fetch subsystem status:', err);
      }
    }

    loadStatus();
    const interval = setInterval(loadStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Berry Platform — Subsystem Explorer</h1>

      <div style={styles.grid}>
        <SubsystemCard
          title="Ledger Parser"
          status={ledgerParserStatus?.status}
          fingerprint={ledgerParserStatus?.integrity_fingerprint}
          lastUpdate={ledgerParserStatus?.last_update_utc}
          diagnostics={ledgerParserStatus?.diagnostics}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    background: '#0d0d0f',
    minHeight: '100vh',
    color: '#fff',
    fontFamily: 'Inter, sans-serif'
  },
  title: {
    fontSize: '32px',
    marginBottom: '30px',
    fontWeight: 600
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px'
  }
};
