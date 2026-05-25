import React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const CustomTooltip = ({
  active,
  payload,
  label
}) => {

  if (
    !active
    || !payload?.length
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
        text-dark-200 mb-1
      ">

        {label}

      </div>

      <div className="
        text-blue-400
        font-mono
        font-bold
      ">

        ₹
        {payload[0]
          .value
          .toLocaleString()
        }

      </div>

    </div>
  )
}

export default function SpendingBarChart({
  data
}) {

  if (!data) {
    return null
  }

  // SORT WEEKS PROPERLY

  const sortedData = [...data]

    .sort((a, b) => {

      const weekA = parseInt(
        a.week.replace('Week ', '')
      )

      const weekB = parseInt(
        b.week.replace('Week ', '')
      )

      return weekA - weekB
    })

    // SHOW LAST 8 WEEKS ONLY

    .slice(-8)

  return (

    <div className="
      bg-dark-700
      border border-dark-500
      rounded-xl p-5
    ">

      {/* Header */}

      <div className="mb-4">

        <div className="
          text-sm text-dark-100
          font-medium
        ">

          Weekly Operational Trend

        </div>

        <div className="
          text-xs text-dark-300 mt-1
        ">

          Expense movement across recent weeks

        </div>

      </div>

      {/* Scrollable Chart */}

      <div className="
        overflow-x-auto
      ">

        <div style={{
          minWidth: '720px'
        }}>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart

                data={sortedData}

                margin={{
                  top: 20,
                  right: 25,
                  left: 20,
                  bottom: 10
                }}
              >

                <CartesianGrid

                  strokeDasharray="3 3"

                  stroke="#1e2d45"

                  vertical={false}
                />

                <XAxis

                  dataKey="week"

                  tick={{
                    fill: '#7c93b6',
                    fontSize: 11
                  }}

                  axisLine={false}

                  tickLine={false}

                  dy={8}
                />

                <YAxis

                  width={90}

                  tick={{
                    fill: '#7c93b6',
                    fontSize: 11
                  }}

                  axisLine={false}

                  tickLine={false}

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

                  cursor={{
                    fill:
                      'rgba(59,130,246,0.06)'
                  }}
                />

                <Bar

                  dataKey="amount"

                  fill="#3b82f6"

                  radius={[8, 8, 0, 0]}

                  fillOpacity={0.92}

                  barSize={36}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  )
}
