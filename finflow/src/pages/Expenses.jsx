import React, {
  useEffect,
  useState,
  useCallback
} from 'react'

import ExpenseModal from '../components/ExpenseModal'

import {
  expenseService
} from '../services/api'

const CATEGORIES = [
  'All',
  'Food',
  'Entertainment',
  'Utilities',
  'Health',
  'Transport',
  'Shopping',
  'Travel',
  'Other',
]

const CAT_COLORS = {
  Food: '#3b82f6',
  Entertainment: '#8b5cf6',
  Utilities: '#10b981',
  Health: '#f59e0b',
  Transport: '#ef4444',
  Shopping: '#06b6d4',
  Travel: '#f97316',
  Other: '#6b7280',
}

export default function Expenses() {

  const [expenses, setExpenses] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const [modal, setModal] =
    useState(null)

  const [search, setSearch] =
    useState('')

  const [filterCat, setFilterCat] =
    useState('All')

  const load = useCallback(() => {

    setLoading(true)

    expenseService
      .getAll()

      .then(({ data }) => {

        setExpenses(data)

      })

      .catch((error) => {

        console.error(error)

        setError(
          'Failed to load expenses'
        )

      })

      .finally(() => {

        setLoading(false)

      })

  }, [])

  useEffect(() => {

    load()

  }, [load])

  const filtered = expenses.filter(
    (expense) => {

      const matchSearch =
        expense.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchCategory =
        filterCat === 'All'
        || expense.category === filterCat

      return (
        matchSearch
        && matchCategory
      )
    }
  )

  async function handleSave(form) {

    setSaving(true)

    try {

      if (modal === 'new') {

        const { data } =
          await expenseService
            .createExpense(form)

        setExpenses((previous) => [

          data,

          ...previous

        ])

      } else {

        const { data } =
          await expenseService
            .updateExpense(
              modal.id,
              form
            )

        setExpenses((previous) =>

          previous.map((expense) =>

            expense.id === modal.id
              ? data
              : expense
          )
        )
      }

      setModal(null)

    } catch (error) {

      console.error(error)

      alert(
        'Failed to save expense'
      )

    } finally {

      setSaving(false)

    }
  }

  async function handleDelete(id) {

    const confirmed = window.confirm(
      'Delete this expense?'
    )

    if (!confirmed) {
      return
    }

    try {

      await expenseService
        .deleteExpense(id)

      setExpenses((previous) =>

        previous.filter((expense) =>

          expense.id !== id
        )
      )

    } catch (error) {

      console.error(error)

      alert(
        'Failed to delete expense'
      )
    }
  }

  return (

    <div className="
      animate-fade-in
    ">

      {/* Header */}

      <div className="
        flex justify-between
        items-center mb-7
      ">

        <div>

          <h1 className="
            text-xl font-semibold
            text-dark-100
          ">
            Expenses
          </h1>

          <p className="
            text-sm text-dark-300 mt-1
          ">
            {filtered.length} records
          </p>

        </div>

        <button

          onClick={() =>
            setModal('new')
          }

          className="
            flex items-center gap-2
            px-4 py-2.5
            bg-blue-500
            hover:bg-blue-400
            text-white text-sm
            font-medium
            rounded-lg
            transition-all
          "
        >

          <i className="
            ti ti-plus text-base
          " />

          Add Expense

        </button>

      </div>

      {/* Filters */}

      <div className="
        flex gap-3 mb-4
        flex-wrap
      ">

        <div className="
          relative flex-1 min-w-48
        ">

          <i className="
            ti ti-search
            absolute left-3 top-1/2
            -translate-y-1/2
            text-dark-300 text-sm
          " />

          <input

            value={search}

            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }

            placeholder="
              Search expenses…
            "

            className="
              w-full bg-dark-700
              border border-dark-500
              rounded-lg
              pl-9 pr-3 py-2.5
              text-sm text-dark-100
              placeholder-dark-400
              outline-none
              focus:border-blue-500/50
            "
          />

        </div>

        <select

          value={filterCat}

          onChange={(event) =>
            setFilterCat(
              event.target.value
            )
          }

          className="
            bg-dark-700
            border border-dark-500
            rounded-lg
            px-3 py-2.5
            text-sm text-dark-100
            outline-none
            focus:border-blue-500/50
          "
        >

          {CATEGORIES.map(
            (category) => (

              <option
                key={category}
              >

                {category}

              </option>
            )
          )}

        </select>

      </div>

      {/* Errors */}

      {error && (

        <div className="
          text-red-400 text-sm
          p-3
          bg-red-500/10
          border border-red-500/20
          rounded-xl mb-4
        ">

          {error}

        </div>
      )}

      {/* Table */}

      <div className="
        bg-dark-700
        border border-dark-500
        rounded-xl
        overflow-hidden
      ">

        {/* Header */}

        <div className="
          grid
          grid-cols-[1fr_110px_110px_100px_72px]
          px-4 py-3
          border-b border-dark-600
          text-xs text-dark-300
          uppercase tracking-wider
        ">

          <span>Title</span>

          <span>Category</span>

          <span>Date</span>

          <span className="text-right">
            Amount
          </span>

          <span />

        </div>

        {/* Loading */}

        {loading ? (

          <div className="
            flex items-center
            justify-center
            py-16
            text-dark-300
            gap-2 text-sm
          ">

            <i className="
              ti ti-loader-2
              animate-spin
              text-blue-500
            " />

            Loading…

          </div>

        ) : filtered.length === 0 ? (

          <div className="
            text-center py-16
            text-dark-300 text-sm
          ">

            <i className="
              ti ti-inbox
              text-3xl
              block mb-2
              text-dark-400
            " />

            No expenses found

          </div>

        ) : (

          filtered.map((expense, index) => (

            <div

              key={expense.id}

              className={`
                grid
                grid-cols-[1fr_110px_110px_100px_72px]
                px-4 py-3.5
                items-center
                hover:bg-blue-500/5
                transition-colors

                ₹{
                  index < filtered.length - 1
                    ? 'border-b border-dark-600'
                    : ''
                }
              `}
            >

              <span className="
                text-sm text-dark-100
                font-medium truncate pr-2
              ">

                {expense.title}

              </span>

              <span>

                <span

                  className="
                    inline-flex text-xs
                    px-2 py-0.5
                    rounded-md
                    font-medium
                  "

                  style={{
                    background:
                      `₹{
                        CAT_COLORS[
                          expense.category
                        ]
                        || '#6b7280'
                      }20`,

                    color:
                      CAT_COLORS[
                        expense.category
                      ]
                      || '#6b7280',
                  }}
                >

                  {expense.category}

                </span>

              </span>

              <span className="
                text-sm text-dark-200
              ">

                {expense.expense_date}

              </span>

              <span className="
                text-sm font-mono
                text-dark-100
                text-right
              ">

                ₹
                {Number(
                  expense.amount
                ).toFixed(2)}

              </span>

              <div className="
                flex gap-1 justify-end
              ">

                <button

                  onClick={() =>
                    setModal(expense)
                  }

                  title="Edit"

                  className="
                    p-1.5 rounded-md
                    text-dark-300
                    hover:text-blue-400
                    hover:bg-blue-500/10
                    transition-all
                  "
                >

                  <i className="
                    ti ti-edit text-base
                  " />

                </button>

                <button

                  onClick={() =>
                    handleDelete(expense.id)
                  }

                  title="Delete"

                  className="
                    p-1.5 rounded-md
                    text-dark-300
                    hover:text-red-400
                    hover:bg-red-500/10
                    transition-all
                  "
                >

                  <i className="
                    ti ti-trash text-base
                  " />

                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* Modal */}

      {modal && (

        <ExpenseModal

          expense={
            modal === 'new'
              ? null
              : modal
          }

          onSave={handleSave}

          onClose={() =>
            setModal(null)
          }

          loading={saving}
        />
      )}

    </div>
  )
}