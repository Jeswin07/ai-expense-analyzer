import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import AIInsights from './pages/AIInsights'
import BusinessIntelligence from './pages/BusinessIntelligence'

import Login from './pages/Login'
import Register from './pages/Register'


function ProtectedRoute({ children }) {

  const token = localStorage.getItem('token')

  if (!token) {

    return <Navigate to="/login" />
  }

  return children
}


function MainLayout({ children }) {

  return (

    <div className="
      flex h-screen
      overflow-hidden
      bg-dark-900
    ">

      <Sidebar />

      <main className="
        flex-1 overflow-y-auto
      ">

        <div className="
          max-w-6xl mx-auto
          px-6 py-7
        ">

          {children}

        </div>

      </main>

    </div>
  )
}


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ───────────────────── */}
        {/* AUTH ROUTES */}
        {/* ───────────────────── */}

        <Route

          path="/login"

          element={<Login />}
        />

        <Route

          path="/register"

          element={<Register />}
        />


        {/* ───────────────────── */}
        {/* PROTECTED ROUTES */}
        {/* ───────────────────── */}

        <Route

          path="/"

          element={

            <ProtectedRoute>

              <MainLayout>

                <Dashboard />

              </MainLayout>

            </ProtectedRoute>
          }
        />


        <Route

          path="/expenses"

          element={

            <ProtectedRoute>

              <MainLayout>

                <Expenses />

              </MainLayout>

            </ProtectedRoute>
          }
        />


        <Route

          path="/intelligence"

          element={

            <ProtectedRoute>

              <MainLayout>

                <BusinessIntelligence />

              </MainLayout>

            </ProtectedRoute>
          }
        />


        <Route

          path="/ai"

          element={

            <ProtectedRoute>

              <MainLayout>

                <AIInsights />

              </MainLayout>

            </ProtectedRoute>
          }
        />


        {/* ───────────────────── */}
        {/* FALLBACK */}
        {/* ───────────────────── */}

        <Route

          path="*"

          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  )
}
