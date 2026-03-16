import { useEffect, useState } from 'react';
import { fetchLedgerStatus } from '../lib/fetchLedgerStatus';
import SubsystemCard from '../components/SubsystemCard';

export default function Explorer() {
  const [ledgerStatus, setLedgerStatus] = useState(null);

  useEffect(() => {
    fetchLedgerStatus().then(setLedgerStatus);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Subsystem Explorer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ledgerStatus && <SubsystemCard data={ledgerStatus} />}
      </div>
    </div>
  );
}
