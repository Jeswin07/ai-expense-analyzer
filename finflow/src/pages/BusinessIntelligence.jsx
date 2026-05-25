import React, {
  useEffect,
  useMemo,
  useState
} from 'react'

import ForecastChart from '../components/ForecastChart'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function BusinessIntelligence() {

  const [forecast, setForecast] =
    useState({})

  const [vendors, setVendors] =
    useState([])

  const [anomalies, setAnomalies] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function loadData() {

      try {

        const [

          forecastRes,

          vendorRes,

          anomalyRes

        ] = await Promise.all([

          fetch(
            'http://127.0.0.1:8000/forecasting/'
          ),

          fetch(
            'http://127.0.0.1:8000/vendor-segmentation/'
          ),

          fetch(
            'http://127.0.0.1:8000/anomaly-detection/'
          )
        ])

        const forecastData =
          await forecastRes.json()

        const vendorData =
          await vendorRes.json()

        const anomalyData =
          await anomalyRes.json()

        setForecast(forecastData)

        setVendors(vendorData || [])

        setAnomalies(anomalyData || [])

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)
      }
    }

    loadData()

  }, [])

  // TOP VENDORS

  const topVendors = useMemo(() => {

    return [...vendors]

      .sort(
        (a, b) =>

          b.total_spend
          - a.total_spend
      )

      .slice(0, 6)

  }, [vendors])

  // EXECUTIVE SUMMARY

  const executiveSummary =
    useMemo(() => {

      if (
        !forecast?.forecast?.length
      ) {

        return (
          'Insufficient forecasting data available.'
        )
      }

      const avgForecast =

        forecast.forecast.reduce(

          (sum, item) =>

            sum
            + item.predicted_expense,

          0

        ) / forecast.forecast.length

      return (
        `Projected operational expenses average ₹${avgForecast.toLocaleString(
          undefined,
          {
            maximumFractionDigits: 0
          }
        )} over the next forecast cycle. Strategic vendors and infrastructure spending remain dominant operational cost drivers.`
      )

    }, [forecast])

  if (loading) {

    return (

      <div className="
        flex items-center
        justify-center
        h-64
        text-dark-300 gap-3
      ">

        <i className="
          ti ti-loader-2
          animate-spin
          text-blue-500 text-2xl
        " />

        Loading business intelligence…

      </div>
    )
  }

  return (

    <div className="
      animate-fade-in
      space-y-5
    ">

      {/* HEADER */}

      <div>

        <h1 className="
          text-2xl font-semibold
          text-dark-100
        ">

          Business Intelligence

        </h1>

        <p className="
          text-sm text-dark-300
          mt-1
        ">

          Predictive analytics, vendor intelligence, and operational risk monitoring

        </p>

      </div>

      {/* EXECUTIVE AI SUMMARY */}

      <div className="
        bg-gradient-to-r
        from-blue-500/10
        to-violet-500/10
        border border-blue-500/20
        rounded-2xl
        p-5
      ">

        <div className="
          flex items-start gap-4
        ">

          <div className="
            w-12 h-12 rounded-xl
            flex items-center
            justify-center
            bg-blue-500/10
            text-blue-400
            flex-shrink-0
          ">

            <i className="
              ti ti-brain
              text-2xl
            " />

          </div>

          <div>

            <div className="
              text-sm font-medium
              text-dark-100 mb-2
            ">

              Executive AI Summary

            </div>

            <div className="
              text-sm text-dark-200
              leading-6
            ">

              {executiveSummary}

            </div>

          </div>

        </div>

      </div>

      {/* FORECASTING */}

      <ForecastChart

        historicalData={
          forecast.historical_data || []
        }

        forecastData={
          forecast.forecast || []
        }
      />

      {/* GRID */}

      <div className="
        grid grid-cols-1
        lg:grid-cols-2
        gap-5
      ">

        {/* VENDOR ANALYTICS */}

        <div className="
          h-full
          bg-dark-700
          border border-dark-500
          rounded-xl p-5
        ">

          <div className="mb-5">

            <div className="
              text-sm text-dark-100
              font-medium
            ">

              Vendor Intelligence

            </div>

            <div className="
              text-xs text-dark-300
              mt-1
            ">

              Top operational vendors by spend

            </div>

          </div>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart

                data={topVendors}

                layout="vertical"

                margin={{
                  top: 10,
                  right: 20,
                  left: 20,
                  bottom: 0
                }}
              >

                <CartesianGrid

                  strokeDasharray="3 3"

                  stroke="#1e2d45"

                  horizontal={false}
                />

                <XAxis

                  type="number"

                  tick={{
                    fill: '#7c93b6',
                    fontSize: 11
                  }}

                  axisLine={false}

                  tickLine={false}

                  tickFormatter={(value) =>

                    `₹${(
                      value / 1000
                    ).toFixed(0)}k`
                  }
                />

                <YAxis

                  type="category"

                  dataKey="vendor"

                  tick={{
                    fill: '#7c93b6',
                    fontSize: 11
                  }}

                  axisLine={false}

                  tickLine={false}

                  width={110}
                />

                <Tooltip />

                <Bar

                  dataKey="total_spend"

                  fill="#8b5cf6"

                  radius={[0, 8, 8, 0]}

                  barSize={22}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ANOMALY CENTER */}

        <div className="
          h-full
          bg-dark-700
          border border-dark-500
          rounded-xl p-5
        ">

          <div className="mb-5">

            <div className="
              text-sm text-dark-100
              font-medium
            ">

              Operational Risk Center

            </div>

            <div className="
              text-xs text-dark-300
              mt-1
            ">

              Detected abnormal expense behavior

            </div>

          </div>

          {anomalies.length === 0 ? (

            <div className="
              text-dark-300 text-sm
            ">

              No operational anomalies detected.

            </div>

          ) : (

            <div className="
              space-y-3
              max-h-[420px]
              overflow-y-auto
              pr-1
            ">

              {anomalies.map((item, index) => {

                const severity =

                  Math.abs(item.z_score) > 3

                    ? 'HIGH'

                    : 'MEDIUM'

                return (

                  <div

                    key={index}

                    className="
                      bg-red-500/10
                      border border-red-500/20
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="
                      flex justify-between
                      items-start mb-3
                    ">

                      <div>

                        <div className="
                          text-sm text-red-300
                          font-medium
                        ">

                          {item.title}

                        </div>

                        <div className="
                          text-xs text-dark-300
                          mt-1
                        ">

                          {item.vendor}
                          •
                          {item.department}

                        </div>

                      </div>

                      <div className={`
                        text-[10px]
                        px-2 py-1
                        rounded-md
                        font-semibold

                        ${
                          severity === 'HIGH'

                            ? 'bg-red-500/20 text-red-300'

                            : 'bg-orange-500/20 text-orange-300'
                        }
                      `}>

                        {severity}

                      </div>

                    </div>

                    <div className="
                      flex justify-between
                      text-xs
                    ">

                      <div className="
                        text-dark-300
                      ">

                        Z-score:
                        {' '}
                        {item.z_score}

                      </div>

                      <div className="
                        text-red-300
                        font-semibold
                      ">

                        ₹
                        {Number(
                          item.amount
                        ).toLocaleString()}

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}
