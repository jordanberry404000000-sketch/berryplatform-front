export default function SubsystemCard({ data }) {
  const {
    subsystem,
    status,
    last_update_utc,
    integrity_fingerprint,
    diagnostics
  } = data;

  const statusColor =
    status === "operational"
      ? "text-green-400"
      : status === "initializing"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="w-full bg-[#0B0B0C] rounded-xl p-6 border border-[#1A1A1C] shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">{subsystem}</h2>
        <span className={`text-sm font-medium ${statusColor}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <p className="text-gray-500">Last Update</p>
          <p>{new Date(last_update_utc).toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-500">Fingerprint</p>
          <p className="break-all">{integrity_fingerprint || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-500">Block Height</p>
          <p>{diagnostics.last_parsed_height ?? "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-500">Block Delay</p>
          <p>{diagnostics.block_delay_seconds ?? "N/A"} sec</p>
        </div>

        <div>
          <p className="text-gray-500">Heartbeat Count</p>
          <p>{diagnostics.heartbeat_count ?? "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-500">API Latency</p>
          <p>{diagnostics.api_latency_ms ?? "N/A"} ms</p>
        </div>
      </div>
    </div>
  );
}
