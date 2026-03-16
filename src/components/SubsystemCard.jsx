import React from 'react';

export default function SubsystemCard({ title, status, fingerprint, lastUpdate, diagnostics }) {
  const statusColor = {
    operational: '#2ecc71',
    degraded: '#f1c40f',
    offline: '#e74c3c',
    initializing: '#3498db'
  }[status] || '#7f8c8d';

  return (
    <div style={{ ...styles.card, borderColor: statusColor }}>
      <h2 style={styles.title}>{title}</h2>

      <div style={styles.row}>
        <span style={styles.label}>Status:</span>
        <span style={{ ...styles.status, color: statusColor }}>{status || '—'}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Fingerprint:</span>
        <span style={styles.value}>{fingerprint || '—'}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Last Update:</span>
        <span style={styles.value}>{lastUpdate || '—'}</span>
      </div>

      {diagnostics && (
        <div style={styles.diagnostics}>
          <h3 style={styles.subheading}>Diagnostics</h3>

          <div style={styles.row}>
            <span style={styles.label}>Networks:</span>
            <span style={styles.value}>{diagnostics.supported_networks.join(', ')}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Parsed (24h):</span>
            <span style={styles.value}>{diagnostics.parsed_ledger_count_24h}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Last Height:</span>
            <span style={styles.value}>{diagnostics.last_parsed_height ?? '—'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: '24px',
    borderRadius: '12px',
    border: '2px solid #333',
    background: '#141416',
    transition: 'border-color 0.3s ease'
  },
  title: {
    fontSize: '22px',
    marginBottom: '16px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  label: {
    opacity: 0.7
  },
  value: {
    fontFamily: 'monospace'
  },
  status: {
    fontWeight: 600
  },
  diagnostics: {
    marginTop: '20px',
    paddingTop: '10px',
    borderTop: '1px solid #333'
  },
  subheading: {
    fontSize: '16px',
    marginBottom: '10px',
    opacity: 0.8
  }
};
