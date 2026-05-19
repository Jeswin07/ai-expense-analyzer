import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 text-xs">
      <div className="text-dark-200 mb-1">{label}</div>
      <div className="text-blue-400 font-mono font-bold">${payload[0].value.toFixed(2)}</div>
    </div>
  )
}

export default function SpendingBarChart({ data }) {
  if (!data) return null

  return (
    <div className="bg-dark-700 border border-dark-500 rounded-xl p-5">
      <div className="text-sm text-dark-200 mb-4">Weekly Spending Trend</div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: '#4a6080', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#4a6080', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
            <Bar
              dataKey="amount"
              fill="#3b82f6"
              radius={[5, 5, 0, 0]}
              fillOpacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
