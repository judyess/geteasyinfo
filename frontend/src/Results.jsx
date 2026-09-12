export default function Results({ data, loading }){
  if (loading) {
    return <p>Loading results...</p>;
  }

  if (!data) {
    return <p>No results yet — run a search above.</p>;
  }

  if (data.status === "ERROR") {
    return (
      <div className="results-error">
        <p>Error: {data.alert?.message || "Unknown error"}</p>
      </div>
    );
  }

  // Success responses nest the real payload under a key like
  // "masterlist", "sessionlist", "searchresult", etc.
  const payloadKey = Object.keys(data).find((key) => key !== "status");
  const payload = payloadKey ? data[payloadKey] : data;

  // payload itself might be an object keyed by id, or an array — Legiscan
  // varies this by operation, so normalize it into a list of entries
  const entries = Array.isArray(payload)
    ? payload
    : Object.values(payload);

  return (
    <div className="results-list">
      {entries.map((item, i) => (
        <pre key={i}>{JSON.stringify(item, null, 2)}</pre>
      ))}
    </div>
  );
};
