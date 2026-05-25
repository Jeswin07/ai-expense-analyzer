import React, {
  useMemo,
  useState
} from 'react'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const COLORS = {

  'Cloud Infrastructure': '#3b82f6',

  Marketing: '#8b5cf6',

  Software: '#10b981',

  Operations: '#f59e0b',

  Travel: '#ef4444',

  Payroll: '#06b6d4',

  Utilities: '#f97316',

  Procurement: '#14b8a6',

  Other: '#6b7280',
}

const CustomTooltip = ({
  active,
  payload
}) => {

  if (
    !active
    || !payload?.length
  ) {
    return null
  }

  const {
    name,
    value
  } = payload[0]

  return (

    <div className="
      bg-dark-700
      border border-dark-500
      rounded-lg
      px-2 py-1.5
      text-xs
    ">

      <div className="
        text-dark-100
        font-medium
      ">

        {name}

      </div>

      <div className="
        text-blue-400
        font-mono
      ">

        ₹
        {value.toLocaleString()}

      </div>

    </div>
  )
}

export default function SpendingPieChart({
  expenses = []
}) {

  // Extract months dynamically

  const availableMonths =
    useMemo(() => {

      const months = new Set()

      expenses.forEach((expense) => {

        const date =
          new Date(
            expense.expense_date
          )

        const key =
          date.toLocaleString(
            'default',
            {
              month: 'long',
              year: 'numeric'
            }
          )

        months.add(key)
      })

      return Array
        .from(months)

        .sort((a, b) => {

          return (
            new Date(a)
            -
            new Date(b)
          )
        })

    }, [expenses])

  const [selectedMonth, setSelectedMonth] =
    useState('')

  React.useEffect(() => {

    if (
      availableMonths.length > 0
      && !selectedMonth
    ) {

      setSelectedMonth(
        availableMonths[0]
      )
    }

  }, [
    availableMonths,
    selectedMonth
  ])

  // Filter expenses by month

  const filteredExpenses =
    useMemo(() => {

      return expenses.filter(
        (expense) => {

          const date =
            new Date(
              expense.expense_date
            )

          const key =
            date.toLocaleString(
              'default',
              {
                month: 'long',
                year: 'numeric'
              }
            )

          return key === selectedMonth
        }
      )

    }, [
      expenses,
      selectedMonth
    ])

  // Aggregate categories

  const chartData =
    useMemo(() => {

      const totals = {}

      filteredExpenses.forEach(
        (expense) => {

          totals[
            expense.category
          ] = (
            totals[
              expense.category
            ] || 0
          ) + expense.amount
        }
      )

      return Object.entries(totals)
        .map(([name, value]) => ({
          name,
          value
        }))

    }, [filteredExpenses])

  const total = chartData.reduce(
    (sum, item) =>
      sum + item.value,
    0
  )

  return (

    <div className="
      bg-dark-700
      border border-dark-500
      rounded-xl p-5
    ">

      {/* Header */}

      <div className="
        flex items-center
        justify-between
        mb-5
      ">

        <div>

          <div className="
            text-sm text-dark-100
            font-medium
          ">

            Expense Distribution

          </div>

          <div className="
            text-xs text-dark-300 mt-1
          ">

            Operational spend by category

          </div>

        </div>

        {/* Month Selector */}

        <select

          value={selectedMonth}

          onChange={(event) =>

            setSelectedMonth(
              event.target.value
            )
          }

          className="
            bg-dark-800
            border border-dark-500
            rounded-lg
            px-2 py-1.5
            text-xs text-dark-100
            outline-none
          "
        >

          {availableMonths.map(
            (month) => (

              <option
                key={month}
                value={month}
              >

                {month}

              </option>
            )
          )}

        </select>

      </div>

      {/* Chart */}

      <div className="
        relative h-60
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie

              data={chartData}

              cx="50%"
              cy="50%"

              innerRadius={72}

              outerRadius={100}

              paddingAngle={3}

              dataKey="value"

              strokeWidth={0}
            >

              {chartData.map((entry) => (

                <Cell

                  key={entry.name}

                  fill={
                    COLORS[entry.name]
                    || '#6b7280'
                  }
                />
              ))}

            </Pie>

            <Tooltip
              content={<CustomTooltip />}
            />

          </PieChart>

        </ResponsiveContainer>

        {/* Center */}

        <div className="
          absolute inset-0
          flex flex-col
          items-center
          justify-center
          pointer-events-none
        ">

          <div className="
            text-2xl
            font-bold
            text-dark-100
            font-mono
          ">

            ₹
            {(
              total / 1000
            ).toFixed(0)}k

          </div>

          <div className="
            text-xs text-dark-300
          ">

            Total Spend

          </div>

        </div>

      </div>

      {/* Legend */}

      <div className="
        grid grid-cols-2
        gap-1.5 mt-3
      ">

        {chartData.map((item) => (

          <div

            key={item.name}

            className="
              flex items-center
              justify-between
              bg-dark-800
              rounded-lg
              px-2 py-1.5
              text-xs
            "
          >

            <div className="
              flex items-center gap-2
              text-dark-200
            ">

              <span

                className="
                  w-2.5 h-2.5
                  rounded-sm
                "

                style={{
                  background:
                    COLORS[item.name]
                }}
              />

              {item.name}

            </div>

            <div className="
              text-dark-300
            ">

              {(
                item.value / total
                * 100
              ).toFixed(0)}%

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
