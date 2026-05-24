import axios from 'axios'

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Set USE_MOCK to false when your FastAPI backend is running
const USE_MOCK = false

// Base URL of your FastAPI backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120000,
})

// Intercept errors for global handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
let mockExpenses = [
  {
    id: 1,
    title: 'AWS EC2 Production Servers',
    amount: 14500,
    category: 'Cloud Infrastructure',
    expense_date: '2026-05-15',
  },
  {
    id: 2,
    title: 'Meta Ads Campaign',
    amount: 22000,
    category: 'Marketing',
    expense_date: '2026-05-14',
  },
  {
    id: 3,
    title: 'Office Internet - Jio Business',
    amount: 4200,
    category: 'Utilities',
    expense_date: '2026-05-13',
  },
  {
    id: 4,
    title: 'Razorpay Subscription',
    amount: 5999,
    category: 'Software',
    expense_date: '2026-05-12',
  },
  {
    id: 5,
    title: 'Employee Travel Reimbursement',
    amount: 8500,
    category: 'Travel',
    expense_date: '2026-05-11',
  },
  {
    id: 6,
    title: 'Laptop Procurement',
    amount: 68000,
    category: 'Procurement',
    expense_date: '2026-05-10',
  },
  {
    id: 7,
    title: 'Payroll Processing',
    amount: 125000,
    category: 'Payroll',
    expense_date: '2026-05-09',
  }
]
let mockNextId = 11

const mockAnalytics = {
  totalSpending: 686.58,
  topCategory: 'Food',
  healthScore: 74,
  avgDailySpending: 68.66,
  categoryBreakdown: {
    Food: 161.70, Entertainment: 38.49, Utilities: 147.99,
    Health: 120.00, Transport: 62.40, Shopping: 156.00,
  },
  weeklyTrend: [
    { week: 'Week 1', amount: 210 },
    { week: 'Week 2', amount: 185 },
    { week: 'Week 3', amount: 142 },
    { week: 'Week 4', amount: 149 },
  ],
}

const mockAiSummary = `Your financial health score is 74/100 — solid, with room for improvement.

**Key findings this month:**
- Food & dining accounts for 23.5% of spending — within a reasonable range
- Subscription services total ₹9,500/month — review and cancel unused plans
- A one-time shopping spike (₹13,000 Amazon purchase) increased May spending; regular monthly average is around ₹44,000
- Transport expenses are trending 12% higher than last month

**Recommendations:**
1. Set a ₹10,000 monthly food budget cap — you're close to crossing it
2. The ₹13,000 shopping expense is acceptable if it's non-recurring
3. Utility costs (₹12,000) are lower than average urban household spending — good control
4. Projected June spending: ₹52,000–₹54,000 if current patterns continue`

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

// ─── MOCK IMPL ──────────────────────────────────────────────────────────────
const mockAPI = {
  async getExpenses()                { await delay(); return { data: [...mockExpenses] } },
  async createExpense(data)          { await delay(); const e = { ...data, id: mockNextId++, amount: parseFloat(data.amount) }; mockExpenses.unshift(e); return { data: e } },
  async updateExpense(id, data)      { await delay(); mockExpenses = mockExpenses.map(e => e.id === id ? { ...e, ...data, amount: parseFloat(data.amount) } : e); return { data: mockExpenses.find(e => e.id === id) } },
  async deleteExpense(id)            { await delay(); mockExpenses = mockExpenses.filter(e => e.id !== id); return { data: { success: true } } },
  async getAnalyticsSummary()        { await delay(); return { data: mockAnalytics } },
  async getAiSummary()               { await delay(800); return { data: { summary: mockAiSummary } } },
  async extractExpense(text) {
    await delay(900)
    const lower = text.toLowerCase()
    const amountMatch = text.match(/\$?([\d]+(?:\.[\d]+)?)/)
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 0
    let category = 'Other'
    if (/lunch|dinner|breakfast|coffee|pizza|food|restaurant|groceri|cafe|eat/i.test(lower)) category = 'Food'
    else if (/electric|internet|water|utility|gas bill/i.test(lower)) category = 'Utilities'
    else if (/uber|lyft|taxi|transport|gas|fuel/i.test(lower)) category = 'Transport'
    else if (/amazon|shopping|order|bought/i.test(lower)) category = 'Shopping'
    else if (/gym|doctor|health|medicine|pharma/i.test(lower)) category = 'Health'
    else if (/netflix|spotify|movie|game|entertainment/i.test(lower)) category = 'Entertainment'
    const today = new Date()
    let expense_date = today.toISOString().split('T')[0]
    if (/yesterday/i.test(lower)) { const d = new Date(today); d.setDate(d.getDate() - 1); expense_date = d.toISOString().split('T')[0] }
    const raw = text.replace(/\$[\d.]+/g, '').replace(/yesterday|today|this morning|two days ago/gi, '').replace(/spent|paid|bought|purchased/gi, '').trim()
    const title = (raw.charAt(0).toUpperCase() + raw.slice(1)).slice(0, 60) || 'Expense'
    return { data: { title, amount, category, expense_date } }
  },
}

// ─── PUBLIC API ─────────────────────────────────────────────────────────────
export const expenseService = {

  getAll: () =>
    USE_MOCK
      ? mockAPI.getExpenses()
      : api.get('/expenses'),

  createExpense: (data) =>
    USE_MOCK
      ? mockAPI.createExpense(data)
      : api.post('/expenses', data),

  updateExpense: (id, data) =>
    USE_MOCK
      ? mockAPI.updateExpense(id, data)
      : api.put(`/expenses/${id}`, data),

  deleteExpense: (id) =>
    USE_MOCK
      ? mockAPI.deleteExpense(id)
      : api.delete(`/expenses/${id}`),
}

export const analyticsService = {
  getSummary: () => USE_MOCK ? mockAPI.getAnalyticsSummary() : api.get('/analytics/summary'),
}

export const aiService = {
  getSummary:     ()     => USE_MOCK ? mockAPI.getAiSummary()         : api.get('/ai/summary'),
  extractExpense: (text) => USE_MOCK ? mockAPI.extractExpense(text)    : api.post('/nlp/extract-expense', { text }),
}
