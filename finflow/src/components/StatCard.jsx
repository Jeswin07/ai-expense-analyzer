import React from 'react'

export default function StatCard({ icon, label, value, sub, color = '#3b82f6' }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dark-500 bg-dark-700 p-5">
      <div
        className="absolute -top-3 -right-3 w-16 h-16 rounded-full opacity-10"
        style={{ background: color }}
      />
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-dark-300 uppercase tracking-wider mb-2">{label}</div>
          <div className="font-mono text-2xl font-bold text-dark-100">{value}</div>
          {sub && <div className="text-xs text-dark-300 mt-1">{sub}</div>}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}22` }}
        >
          <i className={`ti ${icon} text-xl`} style={{ color }} />
        </div>
      </div>
    </div>
  )
}
