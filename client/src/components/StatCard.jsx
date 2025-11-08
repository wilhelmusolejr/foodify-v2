import React from "react";

export default function StatCard({ number, label }) {
  return (
    <div className="stat-card">
      <h2 className="text-2xl text-yellow-500">{number}</h2>
      <p>{label}</p>
    </div>
  );
}
