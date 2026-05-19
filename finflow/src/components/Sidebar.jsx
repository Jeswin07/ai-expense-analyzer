import React from 'react'

const NAV = [
  { id: 'dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard' },
  { id: 'expenses',  icon: 'ti-receipt',           label: 'Expenses'  },
  { id: 'ai',        icon: 'ti-sparkles',          label: 'AI Insights' },
]

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="flex flex-col w-56 min-w-56 bg-dark-800 border-r border-dark-500">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-dark-500">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
            <i className="ti ti-chart-arrows-vertical text-white text-lg" />
          </div>
          <div>
            <div className="font-mono font-bold text-base text-dark-100 tracking-tight">FinFlow</div>
            <div className="text-xs text-dark-300 tracking-widest uppercase">AI Platform</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${active === n.id
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-dark-200 hover:bg-dark-600 hover:text-dark-100'}`}
          >
            <i className={`ti ${n.icon} text-lg`} />
            {n.label}
            {active === n.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-5 py-4 border-t border-dark-500">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-blue-400"
               style={{ background: 'linear-gradient(135deg,#1e3a5f,#2d5a87)' }}>
            JD
          </div>
          <div>
            <div className="text-sm text-dark-100">Jane Doe</div>
            <div className="text-xs text-dark-300">Pro Plan</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
