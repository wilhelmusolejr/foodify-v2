import React from "react";

export default function StatCard({ number, label }) {
  return (
    <div className="stat-card">
      <h2 className="text-2xl text-yellow-500 xl:text-3xl font-semibold tracking-wide">{number}</h2>
      <p className="tracking-wide text-lg">{label}</p>
    </div>
  );
}
