import React, { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import NLPPanel from '../components/NLPPanel'
import { aiService } from '../services/api'

function AISummaryCard({ summary }) {
  const paragraphs = summary.split('\n\n').filter(Boolean)

  const renderParagraph = (p, i) => {
    const hasBullets = p.includes('\n-')
    if (hasBullets) {
      const [header, ...lines] = p.split('\n')
      return (
        <div key={i} className="mb-5">
          {header && (
            <div className="text-sm font-semibold text-dark-100 mb-2">
              {header.replace(/\*\*/g, '')}
            </div>
          )}
          <ul className="space-y-2">
            {lines.map((line, j) => (
              <li key={j} className="flex gap-2 items-start text-sm text-dark-200 leading-relaxed">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">›</span>
                {line.replace(/^- /, '').replace(/\*\*/g, '')}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <p key={i} className="text-sm text-dark-200 leading-relaxed mb-4">
        {p.replace(/\*\*/g, '')}
      </p>
    )
  }

  return (
    <div className="bg-dark-700 border border-dark-500 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
          <i className="ti ti-brain text-purple-400 text-lg" />
        </div>
        <div>
          <div className="text-sm font-semibold text-dark-100">Monthly Financial Analysis</div>
          <div className="text-xs text-dark-300">Generated · May 2025</div>
        </div>
      </div>
      {paragraphs.map(renderParagraph)}
    </div>
  )
}

export default function AIInsights() {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    aiService.getSummary()
      .then(({ data }) => setSummary(data.ai_summary || ""))
      .catch(() => setError('Failed to load AI summary'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="animate-fade-in">
      <div className="mb-7">
        <h1 className="text-xl font-semibold text-dark-100">AI Insights</h1>
        <p className="text-sm text-dark-300 mt-1">Powered by financial intelligence</p>
      </div>

      {/* Health metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <StatCard icon="ti-heartbeat"    label="Health Score" value="74/100"  sub="Above average"  color="#10b981" />
        <StatCard icon="ti-piggy-bank"   label="Savings Rate" value="18.2%"   sub="Target: 20%"    color="#3b82f6" />
        <StatCard icon="ti-shield-check" label="Risk Level"   value="Low"     sub="Well managed"   color="#8b5cf6" />
      </div>

      {/* AI Summary */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-dark-300 gap-2 text-sm bg-dark-700 border border-dark-500 rounded-xl mb-5">
          <i className="ti ti-loader-2 animate-spin text-purple-400" /> Generating analysis…
        </div>
      ) : error ? (
        <div className="text-red-400 text-sm p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-5">
          <i className="ti ti-alert-circle mr-2" />{error}
        </div>
      ) : (
        <div className="mb-5">
          <AISummaryCard summary={summary} />
        </div>
      )}

      {/* NLP panel */}
      <div className="bg-dark-700 border border-dark-500 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <i className="ti ti-message-dots text-blue-400" />
          <div className="text-sm font-semibold text-dark-100">Natural Language Expense Input</div>
        </div>
        <NLPPanel />
      </div>
    </div>
  )
}
