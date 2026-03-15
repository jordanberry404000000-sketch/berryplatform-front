useEffect(() => {
  async function loadStatus() {
    const res = await fetch('https://berry-platform-backend.vercel.app/api/ledger-parser-status');
    const data = await res.json();
    setLedgerParserStatus(data);
  }

  loadStatus();

  const interval = setInterval(loadStatus, 15000);
  return () => clearInterval(interval);
}, []);
