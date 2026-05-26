import React from 'react'

import {
  useLocation,
  useNavigate
} from 'react-router-dom'


const NAV = [

  {
    path: '/',
    icon: 'ti-layout-dashboard',
    label: 'Dashboard'
  },

  {
    path: '/expenses',
    icon: 'ti-receipt',
    label: 'Expenses'
  },

  {
    path: '/intelligence',
    icon: 'ti-brain',
    label: 'Business Intelligence'
  },

  {
    path: '/ai',
    icon: 'ti-sparkles',
    label: 'AI Insights'
  },
]


export default function Sidebar() {

  const navigate =
    useNavigate()

  const location =
    useLocation()


  const logout = () => {

    localStorage.removeItem(
      'token'
    )

    navigate('/login')
  }


  return (

    <aside className="
      flex flex-col
      w-64 min-w-64
      bg-dark-800
      border-r border-dark-500
    ">

      {/* Logo */}

      <div className="
        px-5 py-6
        border-b border-dark-500
      ">

        <div className="
          flex items-center
          gap-3
        ">

          <div className="
            w-10 h-10
            rounded-xl
            flex items-center
            justify-center
          "

          style={{

            background:
              'linear-gradient(135deg,#3b82f6,#8b5cf6)'
          }}>

            <i className="
              ti ti-chart-arrows-vertical
              text-white text-lg
            " />

          </div>

          <div>

            <div className="
              font-mono
              font-bold
              text-base
              text-dark-100
              tracking-tight
            ">

              FinFlow AI

            </div>

            <div className="
              text-xs
              text-dark-300
              tracking-widest
              uppercase
            ">

              Business Intelligence

            </div>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="
        flex-1
        p-3
        space-y-1
      ">

        {NAV.map((item) => {

          const active =
            location.pathname === item.path

          return (

            <button

              key={item.path}

              onClick={() =>

                navigate(
                  item.path
                )
              }

              className={`

                flex items-center
                gap-3
                w-full
                px-3 py-3
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-150

                ${active

                  ? `
                    bg-blue-500/10
                    text-blue-400
                    border border-blue-500/20
                  `

                  : `
                    text-dark-200
                    hover:bg-dark-700
                    hover:text-dark-100
                  `
                }
              `}
            >

              <i className={`
                ti ${item.icon}
                text-lg
              `} />

              {item.label}

              {active && (

                <span className="
                  ml-auto
                  w-1.5 h-1.5
                  rounded-full
                  bg-blue-400
                " />

              )}

            </button>
          )
        })}

      </nav>

      {/* User */}

      <div className="
        px-5 py-4
        border-t border-dark-500
      ">

        <div className="
          flex items-center
          gap-3
          mb-4
        ">

          <div className="
            w-10 h-10
            rounded-full
            flex items-center
            justify-center
            text-sm
            font-semibold
            text-blue-400
          "

          style={{

            background:
              'linear-gradient(135deg,#1e3a5f,#2d5a87)'
          }}>

            BI

          </div>

          <div>

            <div className="
              text-sm
              text-dark-100
              font-medium
            ">

              Business User

            </div>

            <div className="
              text-xs
              text-dark-300
            ">

              Enterprise Plan

            </div>

          </div>

        </div>

        {/* Logout */}

        <button

          onClick={logout}

          className="
            w-full
            flex items-center
            justify-center
            gap-2
            px-4 py-2.5
            rounded-xl
            bg-red-500/10
            border border-red-500/20
            text-red-300
            text-sm
            font-medium
            hover:bg-red-500/20
            transition-all
          "
        >

          <i className="
            ti ti-logout
          " />

          Logout

        </button>

      </div>

    </aside>
  )
}
