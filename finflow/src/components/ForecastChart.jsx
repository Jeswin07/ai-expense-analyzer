import React from 'react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from 'recharts'


const CustomTooltip = ({
  active,
  payload,
  label
}) => {

  if (
    !active ||
    !payload?.length
  ) {
    return null
  }

  return (

    <div className="
      bg-dark-700
      border border-dark-500
      rounded-lg
      px-3 py-2
      text-xs
    ">

      <div className="
        text-dark-200
        mb-2
      ">

        {label}

      </div>

      {payload.map((entry) => (

        <div

          key={entry.dataKey}

          className="
            flex justify-between
            gap-4
            mb-1
          "
        >

          <span
            style={{
              color: entry.color
            }}
          >

            {entry.name}

          </span>

          <span className="
            font-mono
          ">

            ₹
            {Number(
              entry.value
            ).toLocaleString()}

          </span>

        </div>
      ))}

    </div>
  )
}


export default function ForecastChart({

  historicalData = [],

  forecastData = []
}) {

  // ─────────────────────────────
  // CONNECT HISTORICAL + FORECAST
  // ─────────────────────────────

  const lastHistorical =

    historicalData[
      historicalData.length - 1
    ]


  const combinedData = [

    // Historical

    ...historicalData.map((item) => ({

      date: item.date,

      actual: item.expense,

      forecast: null,

      upper: null,

      lower: null
    })),

    // Bridge Point

    {
      date: lastHistorical?.date,

      actual: lastHistorical?.expense,

      forecast: lastHistorical?.expense,

      upper: lastHistorical?.expense,

      lower: lastHistorical?.expense
    },

    // Forecast

    ...forecastData.map((item) => ({

      date: item.date,

      actual: null,

      forecast:
        item.predicted_expense,

      upper:
        item.upper_bound,

      lower:
        item.lower_bound
    }))
  ]


  return (

    <div className="
      h-full
      bg-dark-700
      border border-dark-500
      rounded-xl
      p-5
    ">

      {/* Header */}

      <div className="mb-5">

        <div className="
          text-sm
          text-dark-100
          font-medium
        ">

          Predictive Expense Forecasting

        </div>

        <div className="
          text-xs
          text-dark-300
          mt-1
        ">

          Historical operational spending
          with AI-based future projections

        </div>

      </div>

      {/* Chart */}

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart

            data={combinedData}

            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10
            }}
          >

            <CartesianGrid

              strokeDasharray="3 3"

              stroke="#1e2d45"

              vertical={false}
            />

            <XAxis

              dataKey="date"

              tick={{
                fill: '#7c93b6',
                fontSize: 11
              }}

              axisLine={false}

              tickLine={false}
            />

            <YAxis

              tick={{
                fill: '#7c93b6',
                fontSize: 11
              }}

              axisLine={false}

              tickLine={false}

              width={90}

              tickFormatter={(value) => {

                if (value >= 100000) {

                  return `₹${(
                    value / 100000
                  ).toFixed(1)}L`
                }

                if (value >= 1000) {

                  return `₹${(
                    value / 1000
                  ).toFixed(0)}k`
                }

                return `₹${value}`
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
            />

            <Legend />

            {/* Confidence Area */}

            <Area

              type="monotone"

              dataKey="upper"

              stroke="none"

              fill="#3b82f6"

              fillOpacity={0.08}
            />

            {/* Historical */}

            <Line

              type="monotone"

              dataKey="actual"

              stroke="#10b981"

              strokeWidth={3}

              dot={false}

              name="Historical Expense"
            />

            {/* Forecast */}

            <Line

              type="monotone"

              dataKey="forecast"

              stroke="#3b82f6"

              strokeWidth={3}

              strokeDasharray="6 6"

              dot={false}

              name="Forecasted Expense"
            />

            {/* Upper Bound */}

            <Line

              type="monotone"

              dataKey="upper"

              stroke="#60a5fa"

              strokeDasharray="3 3"

              strokeWidth={1.5}

              dot={false}

              name="Upper Bound"
            />

            {/* Lower Bound */}

            <Line

              type="monotone"

              dataKey="lower"

              stroke="#60a5fa"

              strokeDasharray="3 3"

              strokeWidth={1.5}

              dot={false}

              name="Lower Bound"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}
