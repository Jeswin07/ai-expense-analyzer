import React, {
  useEffect,
  useState
} from 'react'

import StatCard from '../components/StatCard'
import NLPPanel from '../components/NLPPanel'

import {
  aiService
} from '../services/api'


function AISummaryCard({

  summary
}) {

  // Split sections

  const sections = summary

    .split('##')

    .filter(Boolean)

  return (

    <div className="
      bg-dark-700
      border border-dark-500
      rounded-2xl
      p-6
    ">

      {/* Header */}

      <div className="
        flex items-center
        gap-4 mb-6
      ">

        <div className="
          w-11 h-11
          rounded-xl
          bg-violet-500/15
          flex items-center
          justify-center
          flex-shrink-0
        ">

          <i className="
            ti ti-brain
            text-violet-400
            text-xl
          " />

        </div>

        <div>

          <div className="
            text-base font-semibold
            text-dark-100
          ">

            Executive Business Intelligence

          </div>

          <div className="
            text-xs text-dark-300
            mt-1
          ">

            AI-generated operational analytics and strategic recommendations

          </div>

        </div>

      </div>

      {/* Sections */}

      <div className="
        space-y-6
      ">

        {sections.map(

          (section, index) => {

            const lines = section
              .trim()
              .split('\n')

            const title =
              lines[0]

            const content =
              lines
                .slice(1)
                .join('\n')
                .trim()

            const bulletPoints =
              content
                .split('\n')
                .filter(Boolean)

            return (

              <div

                key={index}

                className="
                  bg-dark-800
                  border border-dark-500
                  rounded-xl
                  p-5
                "
              >

                {/* Section Title */}

                <div className="
                  flex items-center
                  gap-2 mb-4
                ">

                  <div className="
                    w-2 h-2 rounded-full
                    bg-blue-400
                  " />

                  <div className="
                    text-sm font-semibold
                    text-dark-100
                  ">

                    {title}

                  </div>

                </div>

                {/* Content */}

                <div className="
                  space-y-3
                ">

                  {bulletPoints.map(

                    (point, pointIndex) => (

                      <div

                        key={pointIndex}

                        className="
                          flex gap-3
                          items-start
                          text-sm
                          text-dark-200
                          leading-relaxed
                        "
                      >

                        <span className="
                          text-blue-400
                          mt-0.5
                          flex-shrink-0
                        ">

                          ›

                        </span>

                        <span>

                          {point
                            .replace(/\*\*/g, '')
                            .replace(/^- /, '')
                            .trim()
                          }

                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>
            )
          }
        )}

      </div>

    </div>
  )
}


export default function AIInsights() {

  const [summary, setSummary] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {

    aiService
      .getSummary()

      .then(({ data }) => {

        setSummary(
          data.ai_summary || ''
        )
      })

      .catch((error) => {

        console.error(error)

        setError(
          'Failed to generate AI business insights.'
        )
      })

      .finally(() => {

        setLoading(false)
      })

  }, [])

  return (

    <div className="
      animate-fade-in
    ">

      {/* Header */}

      <div className="mb-7">

        <h1 className="
          text-2xl
          font-semibold
          text-dark-100
        ">

          AI Business Intelligence

        </h1>

        <p className="
          text-sm
          text-dark-300
          mt-1
        ">

          AI-generated operational analytics, forecasting insights, and strategic business recommendations

        </p>

      </div>

      {/* Executive Metrics */}

      <div className="
        grid grid-cols-1
        md:grid-cols-3
        gap-3 mb-5
      ">

        <StatCard

          icon="ti-building-bank"

          label="Operational Efficiency"

          value="87/100"

          sub="Business performance"

          color="#10b981"
        />

        <StatCard

          icon="ti-alert-triangle"

          label="Risk Exposure"

          value="Moderate"

          sub="Vendor concentration"

          color="#f59e0b"
        />

        <StatCard

          icon="ti-trending-up"

          label="Forecast Trend"

          value="Growth"

          sub="Projected expansion"

          color="#3b82f6"
        />

      </div>

      {/* AI Summary */}

      {loading ? (

        <div className="
          flex items-center
          justify-center
          py-16
          text-dark-300
          gap-3
          text-sm
          bg-dark-700
          border border-dark-500
          rounded-2xl
          mb-5
        ">

          <i className="
            ti ti-loader-2
            animate-spin
            text-violet-400
            text-xl
          " />

          Generating executive business intelligence...

        </div>

      ) : error ? (

        <div className="
          text-red-300
          text-sm
          p-5
          bg-red-500/10
          border border-red-500/20
          rounded-2xl
          mb-5
        ">

          <i className="
            ti ti-alert-circle
            mr-2
          " />

          {error}

        </div>

      ) : (

        <div className="mb-5">

          <AISummaryCard
            summary={summary}
          />

        </div>

      )}

      {/* NLP Panel */}

      <div className="
        bg-dark-700
        border border-dark-500
        rounded-2xl
        p-6
      ">

        <div className="
          flex items-center
          gap-3 mb-5
        ">

          <div className="
            w-10 h-10
            rounded-xl
            bg-blue-500/10
            flex items-center
            justify-center
            text-blue-400
          ">

            <i className="
              ti ti-message-dots
              text-xl
            " />

          </div>

          <div>

            <div className="
              text-sm font-semibold
              text-dark-100
            ">

              AI Operational Expense Extraction

            </div>

            <div className="
              text-xs text-dark-300
              mt-1
            ">

              Convert natural language business transactions into structured operational expense records

            </div>

          </div>

        </div>

        <NLPPanel />

      </div>

    </div>
  )
}
