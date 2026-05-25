import React, {
  useEffect,
  useState
} from 'react'

import StatCard from '../components/StatCard'
import SpendingPieChart from '../components/SpendingPieChart'
import SpendingBarChart from '../components/SpendingBarChart'

import {
  analyticsService
} from '../services/api'

export default function Dashboard() {

  const [data, setData] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {

    analyticsService
      .getSummary()

      .then(({ data }) => {

        console.log(data)

        const normalizedData = {

          totalSpending:
            data.total_spending || 0,

          topCategory:
            data.top_category || 'None',

          healthScore:
            data.financial_health_score || 0,

          avgDailySpending:
            data.average_daily_spending || 0,

          categoryBreakdown:
            data.category_breakdown || [],

          weeklyTrend:
            data.weekly_trend || [],

          expenses:
            data.expenses || [],

          // NEW BUSINESS KPIs

          topDepartment:
            data.top_department || 'IT',

          burnRate:
            data.monthly_burn_rate || 0,

          topVendor:
            data.top_vendor || 'AWS India',

          budgetUtilization:
            data.budget_utilization || 72
        }

        setData(normalizedData)

      })

      .catch((error) => {

        console.error(error)

        setError(
          'Failed to load analytics'
        )

      })

      .finally(() =>
        setLoading(false)
      )

  }, [])

  if (loading) {

    return (

      <div className="
        flex items-center
        justify-center
        h-64 text-dark-300 gap-3
      ">

        <i className="
          ti ti-loader-2
          animate-spin
          text-2xl
          text-blue-500
        " />

        Loading business analytics…

      </div>
    )
  }

  if (error) {

    return (

      <div className="
        flex items-center gap-2
        text-red-400 text-sm p-4
        bg-red-500/10
        border border-red-500/20
        rounded-xl
      ">

        <i className="
          ti ti-alert-circle
        " />

        {error}

      </div>
    )
  }

  return (

    <div className="animate-fade-in">

      {/* Header */}

      <div className="mb-7">

        <h1 className="
          text-xl font-semibold
          text-dark-100
        ">

          Business Financial Intelligence

        </h1>

        <p className="
          text-sm text-dark-300 mt-1
        ">

          AI-powered operational expense analytics for Indian SMEs

        </p>

      </div>

      {/* Primary KPI Cards */}

      <div className="
        grid grid-cols-2
        lg:grid-cols-4
        gap-3 mb-5
      ">

        <StatCard
          icon="ti-currency-rupee"
          label="Operational Expense"
          value={`₹${data.totalSpending.toFixed(2)}`}
          sub="Total business expenditure"
          color="#3b82f6"
        />

        <StatCard
          icon="ti-building-bank"
          label="Top Department"
          value={data.topDepartment}
          sub="Highest operational spend"
          color="#8b5cf6"
        />

        <StatCard
          icon="ti-flame"
          label="Monthly Burn Rate"
          value={`₹${data.burnRate.toFixed(2)}`}
          sub="Projected monthly spend"
          color="#ef4444"
        />

        <StatCard
          icon="ti-report-money"
          label="Budget Utilization"
          value={`${data.budgetUtilization}%`}
          sub="Operational budget usage"
          color="#10b981"
        />

      </div>

      {/* Secondary KPI Cards */}

      <div className="
        grid grid-cols-2
        lg:grid-cols-4
        gap-3 mb-5
      ">

        <StatCard
          icon="ti-tag"
          label="Top Expense Category"
          value={data.topCategory}
          sub="Largest cost center"
          color="#f59e0b"
        />

        <StatCard
          icon="ti-building-store"
          label="Top Vendor"
          value={data.topVendor}
          sub="Highest vendor spend"
          color="#06b6d4"
        />

        <StatCard
          icon="ti-heartbeat"
          label="Financial Health"
          value={`${data.healthScore}/100`}
          sub="Business financial score"
          color="#22c55e"
        />

        <StatCard
          icon="ti-chart-line"
          label="Avg Daily Spend"
          value={`₹${data.avgDailySpending.toFixed(2)}`}
          sub="Average operational cost"
          color="#f97316"
        />

      </div>

      {/* Charts */}

      <div className="
        grid grid-cols-1
        md:grid-cols-2
        gap-4
        items-stretch
      ">

        <SpendingPieChart
          expenses={data.expenses || []}
        />

        <SpendingBarChart
          data={data.weeklyTrend}
        />

      </div>

    </div>
  )
}
