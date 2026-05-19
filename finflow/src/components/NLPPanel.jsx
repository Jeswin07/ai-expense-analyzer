import React, { useState } from 'react'

import {
  aiService,
  expenseService
} from '../services/api'

const EXAMPLES = [
  'Spent ₹350 on dinner at KFC yesterday',
  'Paid ₹3000 electricity bill this morning',
  'Amazon order for ₹999 two days ago',
  'Uber ride ₹220 today',
]

const FIELD_ICONS = {
  title: 'ti-file-text',
  amount: 'ti-currency-rupee',
  category: 'ti-tag',
  expense_date: 'ti-calendar',
}

export default function NLPPanel() {

  const [input, setInput] =
    useState('')

  const [result, setResult] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  async function extract() {

    if (!input.trim()) {
      return
    }

    setLoading(true)

    setError('')

    setSuccess('')

    setResult(null)

    try {

      /*
      STEP 1:
      Extract expense using AI
      */

      const { data } =
        await aiService.extractExpense(
          input
        )

      console.log(data)

      setResult(data)

      /*
      STEP 2:
      Save extracted expense
      to backend database
      */

      await expenseService.createExpense({

        title:
          data.title,

        amount:
          Number(data.amount),

        category:
          data.category,

        expense_date:
          data.expense_date
      })

      setSuccess(
        'Expense extracted and saved successfully.'
      )

      /*
      STEP 3:
      Optional automatic refresh
      */

      // setTimeout(() => {
      //   window.location.reload()
      // }, 1500)

    } catch (error) {

      console.error(error)

      setError(
        'Failed to process expense.'
      )

    } finally {

      setLoading(false)

    }
  }

  function handleKey(event) {

    if (
      event.key === 'Enter'
      && (
        event.metaKey
        || event.ctrlKey
      )
    ) {
      extract()
    }
  }

  return (

    <div>

      <div className="
        text-sm text-dark-200
        mb-3 flex items-center gap-2
      ">

        <i className="
          ti ti-wand text-purple-400
        " />

        Describe an expense
        in plain English

      </div>

      <textarea
        value={input}

        onChange={(event) =>
          setInput(event.target.value)
        }

        onKeyDown={handleKey}

        placeholder={
          'e.g. "Spent $45 on groceries yesterday"'
        }

        rows={3}

        className="
          w-full bg-dark-900
          border border-dark-500
          rounded-xl
          px-4 py-3
          text-sm text-dark-100
          placeholder-dark-400
          outline-none
          focus:border-blue-500/50
          resize-none
          leading-relaxed
        "
      />

      {/* Example Chips */}

      <div className="
        flex flex-wrap gap-2
        mt-2 mb-4
      ">

        {EXAMPLES.map((example, index) => (

          <button
            key={index}

            onClick={() =>
              setInput(example)
            }

            className="
              text-xs
              px-3 py-1.5
              rounded-full
              bg-dark-700
              border border-dark-500
              text-dark-200
              hover:border-dark-400
              hover:text-dark-100
              transition-all
            "
          >

            {example}

          </button>

        ))}

      </div>

      <button

        onClick={extract}

        disabled={
          loading || !input.trim()
        }

        className="
          flex items-center gap-2
          px-5 py-2.5
          rounded-lg
          bg-purple-500
          hover:bg-purple-400
          text-sm text-white
          font-medium
          transition-all
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >

        {loading ? (
          <>
            <i className="
              ti ti-loader-2
              animate-spin
            " />

            Processing...

          </>
        ) : (
          <>
            <i className="
              ti ti-sparkles
            " />

            Extract & Save Expense

          </>
        )}

      </button>

      {/* Error */}

      {error && (

        <div className="
          mt-4 flex items-center
          gap-2 text-red-400 text-sm
        ">

          <i className="
            ti ti-alert-circle
          " />

          {error}

        </div>

      )}

      {/* Success */}

      {success && (

        <div className="
          mt-4 flex items-center
          gap-2 text-green-400 text-sm
        ">

          <i className="
            ti ti-check-circle
          " />

          {success}

        </div>

      )}

      {/* Extracted Result */}

      {result && (

        <div className="
          mt-5 bg-dark-900
          border border-blue-500/20
          rounded-xl p-4
          animate-fade-in
        ">

          <div className="
            flex items-center gap-2
            text-blue-400 text-xs
            mb-4
          ">

            <i className="
              ti ti-brain
            " />

            AI Extracted Expense

          </div>

          <div className="
            grid grid-cols-2 gap-3
          ">

            {Object.entries(result).map(
              ([key, value]) => (

                <div
                  key={key}

                  className="
                    bg-dark-700
                    rounded-lg
                    px-3 py-2.5
                  "
                >

                  <div className="
                    flex items-center
                    gap-1.5
                    text-xs text-dark-300
                    mb-1 capitalize
                  ">

                    <i
                      className={`
                        ti
                        ${FIELD_ICONS[key]
                          || 'ti-info-circle'}
                        text-sm
                      `}
                    />

                    {key.replace('_', ' ')}

                  </div>

                  <div className="
                    text-sm text-dark-100
                    font-medium
                  ">

                    {key === 'amount'
                      ? `$${Number(value).toFixed(2)}`
                      : value}

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      )}

    </div>
  )
}