import React, {
  useEffect,
  useState
} from 'react'

import StatCard from '../components/StatCard'
import SpendingPieChart from '../components/SpendingPieChart'
import SpendingBarChart from '../components/SpendingBarChart'

import { analyticsService } from '../services/api'

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
            data.weekly_trend || []
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

        Loading analytics…

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

      <div className="mb-7">

        <h1 className="
          text-xl font-semibold
          text-dark-100
        ">
          Financial Overview
        </h1>

        <p className="
          text-sm text-dark-300 mt-1
        ">
          AI-powered financial intelligence
        </p>

      </div>

      {/* Stat Cards */}

      <div className="
        grid grid-cols-2
        lg:grid-cols-4
        gap-3 mb-5
      ">

        <StatCard
          icon="ti-credit-card"
          label="Total Spending"
          value={`₹${data.totalSpending.toFixed(2)}`}
          sub="All expenses"
          color="#3b82f6"
        />

        <StatCard
          icon="ti-tag"
          label="Top Category"
          value={data.topCategory}
          sub="Largest spending area"
          color="#8b5cf6"
        />

        <StatCard
          icon="ti-heartbeat"
          label="Health Score"
          value={`${data.healthScore}/100`}
          sub="Financial wellness"
          color="#10b981"
        />

        <StatCard
          icon="ti-trending-up"
          label="Avg Daily"
          value={`₹${data.avgDailySpending.toFixed(2)}`}
          sub="Average daily spend"
          color="#f59e0b"
        />

      </div>

      {/* Charts */}

      <div className="
        grid grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        <SpendingPieChart
          data={data.categoryBreakdown}
        />

        <SpendingBarChart
          data={data.weeklyTrend}
        />

      </div>

    </div>
  )
}