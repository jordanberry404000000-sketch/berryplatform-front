export async function fetchLedgerStatus() {
  try {
    const res = await fetch('/api/ledger-parser-status', {
      method: 'GET',
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    return {
      subsystem: "Ledger Parser",
      status: "offline",
      last_update_utc: new Date().toISOString(),
      diagnostics: {
        supported_networks: ["btc"],
        parsed_ledger_count_24h: 0,
        last_parsed_height: null,
        api_latency_ms: null,
        last_error: err.message,
        heartbeat_count: null,
        uptime_seconds: null,
        block_delay_seconds: null
      },
      integrity_fingerprint: null
    };
  }
}
