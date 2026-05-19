import React, { useState, useEffect } from 'react'

const CATEGORIES = ['Food', 'Entertainment', 'Utilities', 'Health', 'Transport', 'Shopping', 'Travel', 'Other']

const DEFAULT_FORM = {
  title: '',
  amount: '',
  category: 'Food',
  expense_date: new Date().toISOString().split('T')[0],
}

export default function ExpenseModal({ expense, onSave, onClose, loading }) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (expense) setForm({ ...expense, amount: String(expense.amount) })
    else setForm(DEFAULT_FORM)
  }, [expense])

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0)
      errs.amount = 'Enter a valid amount'
    if (!form.expense_date) errs.date = 'Date is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (validate()) onSave(form)
  }

  const fields = [
    { key: 'title',        label: 'Title',       type: 'text',   placeholder: 'e.g. Coffee at Starbucks' },
    { key: 'amount',       label: 'Amount (₹)',   type: 'number', placeholder: '0.00' },
    { key: 'expense_date', label: 'Date',         type: 'date',   placeholder: '' },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl border border-dark-500 bg-dark-700 p-7 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-base font-semibold text-dark-100">
            {expense ? 'Edit Expense' : 'Add Expense'}
          </div>
          <button onClick={onClose} className="text-dark-300 hover:text-dark-100 transition-colors">
            <i className="ti ti-x text-xl" />
          </button>
        </div>

        {/* Fields */}
        {fields.map((f) => (
          <div key={f.key} className="mb-4">
            <label className="block text-xs text-dark-200 mb-1.5">{f.label}</label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={set(f.key)}
              placeholder={f.placeholder}
              className={`w-full bg-dark-900 border rounded-lg px-3 py-2.5 text-sm text-dark-100 outline-none
                focus:border-blue-500/60 placeholder-dark-400 transition-colors
                ${errors[f.key] ? 'border-red-500/60' : 'border-dark-500'}`}
            />
            {errors[f.key] && (
              <div className="text-xs text-red-400 mt-1">{errors[f.key]}</div>
            )}
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-xs text-dark-200 mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={set('category')}
            className="w-full bg-dark-900 border border-dark-500 rounded-lg px-3 py-2.5 text-sm text-dark-100 outline-none focus:border-blue-500/60"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-dark-500 text-sm text-dark-200 hover:bg-dark-600 hover:text-dark-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-sm text-white font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><i className="ti ti-loader-2 animate-spin" /> Saving...</>
            ) : (
              expense ? 'Save Changes' : 'Add Expense'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
