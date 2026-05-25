import React, {
  useState
} from 'react'

import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import AIInsights from './pages/AIInsights'
import BusinessIntelligence from './pages/BusinessIntelligence'

const PAGES = {

  dashboard: Dashboard,

  expenses: Expenses,

  ai: AIInsights,

  intelligence: BusinessIntelligence,
}

export default function App() {

  const [activePage, setActivePage] =
    useState('dashboard')

  const Page =
    PAGES[activePage]

  return (

    <div className="
      flex h-screen
      overflow-hidden
      bg-dark-900
    ">

      <Sidebar
        active={activePage}
        setActive={setActivePage}
      />

      <main className="
        flex-1 overflow-y-auto
      ">

        <div className="
          max-w-6xl mx-auto
          px-6 py-7
        ">

          <Page />

        </div>

      </main>

    </div>
  )
}
