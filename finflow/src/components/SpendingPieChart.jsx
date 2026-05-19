import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = {
  Food:          '#3b82f6',
  Entertainment: '#8b5cf6',
  Utilities:     '#10b981',
  Health:        '#f59e0b',
  Transport:     '#ef4444',
  Shopping:      '#06b6d4',
  Travel:        '#f97316',
  Other:         '#6b7280',
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 text-xs">
      <div className="text-dark-100 font-medium">{name}</div>
      <div className="text-blue-400 font-mono">₹{value.toFixed(2)}</div>
    </div>
  )
}

export default function SpendingPieChart({ data }) {
  if (!data) return null

  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))
  const total = chartData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="bg-dark-700 border border-dark-500 rounded-xl p-5">
      <div className="text-sm text-dark-200 mb-4">Spending by Category</div>
      <div className="relative h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#6b7280'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="font-mono text-lg font-bold text-dark-100">₹{total.toFixed(0)}</div>
          <div className="text-xs text-dark-300">Total</div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3">
        {chartData.map((d) => (
          <span key={d.name} className="flex items-center gap-1.5 text-xs text-dark-200">
            <span
              className="w-2 h-2 rounded-sm flex-shrink-0"
              style={{ background: COLORS[d.name] || '#6b7280' }}
            />
            {d.name} {((d.value / total) * 100).toFixed(0)}%
          </span>
        ))}
      </div>
    </div>
  )
}
