import React, { useState, useEffect } from 'react'

const CATEGORIES = [
  'Cloud Infrastructure',
  'Marketing',
  'Software',
  'Operations',
  'Travel',
  'Payroll',
  'Utilities',
  'Procurement',
  'Other'
]

const DEPARTMENTS = [
  'IT',
  'Marketing',
  'Operations',
  'Finance',
  'HR',
  'Sales'
]

const PAYMENT_METHODS = [
  'UPI',
  'Corporate Card',
  'Bank Transfer',
  'Cash'
]

const EXPENSE_TYPES = [
  'Operational',
  'Infrastructure',
  'Subscription',
  'Advertising',
  'Utilities',
  'Procurement'
]

const DEFAULT_FORM = {
  title: '',
  amount: '',
  category: 'Cloud Infrastructure',
  department: 'IT',
  vendor: '',
  expense_type: 'Operational',
  payment_method: 'UPI',
  gst_amount: '',
  invoice_id: '',
  expense_date: new Date()
    .toISOString()
    .split('T')[0],
}

export default function ExpenseModal({
  expense,
  onSave,
  onClose,
  loading
}) {

  const [form, setForm] =
    useState(DEFAULT_FORM)

  const [errors, setErrors] =
    useState({})

  useEffect(() => {

    if (expense) {

      setForm({
        ...expense,
        amount: String(expense.amount),
        gst_amount: String(
          expense.gst_amount || ''
        )
      })

    } else {

      setForm(DEFAULT_FORM)
    }

  }, [expense])

  const set = (key) => (e) =>

    setForm((previous) => ({
      ...previous,
      [key]: e.target.value
    }))

  const validate = () => {

    const errs = {}

    if (!form.title.trim()) {
      errs.title =
        'Title is required'
    }

    if (
      !form.amount
      || isNaN(parseFloat(form.amount))
      || parseFloat(form.amount) <= 0
    ) {
      errs.amount =
        'Enter a valid amount'
    }

    if (!form.vendor.trim()) {
      errs.vendor =
        'Vendor is required'
    }

    if (!form.expense_date) {
      errs.date =
        'Date is required'
    }

    setErrors(errs)

    return (
      Object.keys(errs).length === 0
    )
  }

  const handleSubmit = () => {

    if (validate()) {

      onSave({
        ...form,
        amount: parseFloat(form.amount),
        gst_amount:
          parseFloat(form.gst_amount) || 0
      })
    }
  }

  const fields = [

    {
      key: 'title',
      label: 'Expense Title',
      type: 'text',
      placeholder:
        'e.g. AWS EC2 Production Server'
    },

    {
      key: 'vendor',
      label: 'Vendor',
      type: 'text',
      placeholder:
        'e.g. AWS India'
    },

    {
      key: 'amount',
      label: 'Amount (₹)',
      type: 'number',
      placeholder: '0.00'
    },

    {
      key: 'gst_amount',
      label: 'GST Amount (₹)',
      type: 'number',
      placeholder: '0.00'
    },

    {
      key: 'invoice_id',
      label: 'Invoice ID',
      type: 'text',
      placeholder:
        'e.g. INV-2026-101'
    },

    {
      key: 'expense_date',
      label: 'Expense Date',
      type: 'date',
      placeholder: ''
    },
  ]

  return (

    <div

      className="
        fixed inset-0 z-[9999]
        bg-black/75
        overflow-y-auto
      "

      onClick={(e) =>

        e.target === e.currentTarget
        && onClose()
      }
    >

      <div className="
        min-h-screen
        flex
        items-start
        justify-center
        py-10
        px-4
      ">

        <div className="
          w-full
          max-w-lg
          rounded-2xl
          border border-dark-500
          bg-dark-700
          p-7
          animate-fade-in
          shadow-2xl
        ">

          {/* Header */}

          <div className="
            flex justify-between
            items-center mb-6
          ">

            <div className="
              text-base font-semibold
              text-dark-100
            ">

              {expense
                ? 'Edit Business Expense'
                : 'Add Business Expense'
              }

            </div>

            <button

              onClick={onClose}

              className="
                text-dark-300
                hover:text-dark-100
                transition-colors
              "
            >

              <i className="
                ti ti-x text-xl
              " />

            </button>

          </div>

          {/* Input Fields */}

          {fields.map((field) => (

            <div
              key={field.key}
              className="mb-4"
            >

              <label className="
                block text-xs
                text-dark-200
                mb-1.5
              ">

                {field.label}

              </label>

              <input

                type={field.type}

                value={form[field.key]}

                onChange={set(field.key)}

                placeholder={field.placeholder}

                className={`
                  w-full bg-dark-900
                  border rounded-lg
                  px-3 py-2.5
                  text-sm text-dark-100
                  outline-none
                  placeholder-dark-400
                  transition-colors
                  focus:border-blue-500/60

                  ${
                    errors[field.key]
                      ? 'border-red-500/60'
                      : 'border-dark-500'
                  }
                `}
              />

              {errors[field.key] && (

                <div className="
                  text-xs text-red-400 mt-1
                ">

                  {errors[field.key]}

                </div>
              )}

            </div>
          ))}

          {/* Category */}

          <div className="mb-4">

            <label className="
              block text-xs
              text-dark-200
              mb-1.5
            ">
              Category
            </label>

            <select

              value={form.category}

              onChange={set('category')}

              className="
                w-full bg-dark-900
                border border-dark-500
                rounded-lg
                px-3 py-2.5
                text-sm text-dark-100
                outline-none
                focus:border-blue-500/60
              "
            >

              {CATEGORIES.map((category) => (

                <option
                  key={category}
                  value={category}
                >

                  {category}

                </option>
              ))}

            </select>

          </div>

          {/* Department */}

          <div className="mb-4">

            <label className="
              block text-xs
              text-dark-200
              mb-1.5
            ">
              Department
            </label>

            <select

              value={form.department}

              onChange={set('department')}

              className="
                w-full bg-dark-900
                border border-dark-500
                rounded-lg
                px-3 py-2.5
                text-sm text-dark-100
                outline-none
                focus:border-blue-500/60
              "
            >

              {DEPARTMENTS.map((department) => (

                <option
                  key={department}
                  value={department}
                >

                  {department}

                </option>
              ))}

            </select>

          </div>

          {/* Expense Type */}

          <div className="mb-4">

            <label className="
              block text-xs
              text-dark-200
              mb-1.5
            ">
              Expense Type
            </label>

            <select

              value={form.expense_type}

              onChange={set('expense_type')}

              className="
                w-full bg-dark-900
                border border-dark-500
                rounded-lg
                px-3 py-2.5
                text-sm text-dark-100
                outline-none
                focus:border-blue-500/60
              "
            >

              {EXPENSE_TYPES.map((type) => (

                <option
                  key={type}
                  value={type}
                >

                  {type}

                </option>
              ))}

            </select>

          </div>

          {/* Payment Method */}

          <div className="mb-6">

            <label className="
              block text-xs
              text-dark-200
              mb-1.5
            ">
              Payment Method
            </label>

            <select

              value={form.payment_method}

              onChange={set('payment_method')}

              className="
                w-full bg-dark-900
                border border-dark-500
                rounded-lg
                px-3 py-2.5
                text-sm text-dark-100
                outline-none
                focus:border-blue-500/60
              "
            >

              {PAYMENT_METHODS.map((method) => (

                <option
                  key={method}
                  value={method}
                >

                  {method}

                </option>
              ))}

            </select>

          </div>

          {/* Actions */}

          <div className="flex gap-3">

            <button

              onClick={onClose}

              className="
                flex-1 py-2.5
                rounded-lg
                border border-dark-500
                text-sm text-dark-200
                hover:bg-dark-600
                hover:text-dark-100
                transition-all
              "
            >

              Cancel

            </button>

            <button

              onClick={handleSubmit}

              disabled={loading}

              className="
                flex-1 py-2.5
                rounded-lg
                bg-blue-500
                hover:bg-blue-400
                text-sm text-white
                font-medium
                transition-all
                disabled:opacity-50
                flex items-center
                justify-center gap-2
              "
            >

              {loading ? (

                <>
                  <i className="
                    ti ti-loader-2
                    animate-spin
                  " />

                  Saving...
                </>

              ) : (

                expense
                  ? 'Save Changes'
                  : 'Add Expense'
              )}

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}