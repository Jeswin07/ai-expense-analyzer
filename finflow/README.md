# FinFlow AI — Financial Intelligence Platform

A modern React + Tailwind SaaS dashboard for AI-powered financial tracking.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Axios
- Recharts

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure your backend URL (optional)
cp .env.example .env
# Edit .env and set VITE_API_URL=http://your-backend:8000

# 3. Run in development mode
npm run dev
# Opens at http://localhost:3000

# 4. Build for production
npm run build
```

## Connecting to Your FastAPI Backend

Open `src/services/api.js` and set:

```js
const USE_MOCK = false   // ← flip this to use real API
```

The app will then call these endpoints on your FastAPI server:

| Method | Endpoint               | Used in         |
|--------|------------------------|-----------------|
| GET    | /expenses              | Expenses page   |
| POST   | /expenses              | Add expense     |
| PUT    | /expenses/{id}         | Edit expense    |
| DELETE | /expenses/{id}         | Delete expense  |
| GET    | /analytics/summary     | Dashboard       |
| GET    | /ai/summary            | AI Insights     |
| POST   | /nlp/extract-expense   | NLP Panel       |

## Expected API Response Shapes

### GET /expenses
```json
[
  { "id": 1, "title": "Coffee", "amount": 4.50, "category": "Food", "expense_date": "2025-05-15" }
]
```

### GET /analytics/summary
```json
{
  "totalSpending": 686.58,
  "topCategory": "Food",
  "healthScore": 74,
  "avgDailySpending": 68.66,
  "categoryBreakdown": { "Food": 161.70, "Utilities": 147.99 },
  "weeklyTrend": [{ "week": "Week 1", "amount": 210 }]
}
```

### GET /ai/summary
```json
{ "summary": "Your financial health score is 74/100..." }
```

### POST /nlp/extract-expense
Request: `{ "text": "Spent $20 on pizza yesterday" }`  
Response: `{ "title": "...", "amount": 20.0, "category": "Food", "expense_date": "2025-05-18" }`

## Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── ExpenseModal.jsx
│   ├── NLPPanel.jsx
│   ├── SpendingPieChart.jsx
│   └── SpendingBarChart.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Expenses.jsx
│   └── AIInsights.jsx
├── services/
│   └── api.js        ← all axios calls + mock data
├── App.jsx
├── main.jsx
└── index.css
```
