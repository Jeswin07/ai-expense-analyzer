import React, {
  useState
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import axios from 'axios'


export default function Login() {

  const navigate =
    useNavigate()

  const [form, setForm] =
    useState({

      email: '',

      password: ''
    })

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')


  const set = (key) => (event) => {

    setForm({

      ...form,

      [key]:
        event.target.value
    })
  }


  const handleLogin = async () => {

    setLoading(true)

    setError('')

    try {

      const response = await axios.post(

        'http://127.0.0.1:8000/auth/login',

        form
      )

      localStorage.setItem(

        'token',

        response.data.access_token
      )

      navigate('/')

    } catch (error) {

      console.error(error)

      setError(
        'Invalid credentials.'
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <div className="
      min-h-screen
      bg-dark-900
      flex items-center
      justify-center
      p-6
    ">

      <div className="
        w-full max-w-md
        bg-dark-700
        border border-dark-500
        rounded-2xl
        p-8
      ">

        {/* Logo */}

        <div className="
          flex items-center
          gap-3 mb-8
        ">

          <div className="
            w-11 h-11
            rounded-xl
            bg-blue-500
            flex items-center
            justify-center
          ">

            <i className="
              ti ti-chart-arrows-vertical
              text-white
              text-xl
            " />

          </div>

          <div>

            <div className="
              text-lg font-bold
              text-dark-100
            ">

              FinFlow AI

            </div>

            <div className="
              text-xs text-dark-300
            ">

              Business Intelligence Platform

            </div>

          </div>

        </div>

        {/* Title */}

        <div className="mb-6">

          <h1 className="
            text-2xl font-semibold
            text-dark-100
          ">

            Welcome Back

          </h1>

          <p className="
            text-sm text-dark-300
            mt-1
          ">

            Login to access operational analytics

          </p>

        </div>

        {/* Inputs */}

        <div className="space-y-4">

          <input

            type="email"

            placeholder="Email"

            value={form.email}

            onChange={set('email')}

            className="
              w-full
              bg-dark-800
              border border-dark-500
              rounded-xl
              px-4 py-3
              text-sm
              text-dark-100
              outline-none
              focus:border-blue-500
            "
          />

          <input

            type="password"

            placeholder="Password"

            value={form.password}

            onChange={set('password')}

            className="
              w-full
              bg-dark-800
              border border-dark-500
              rounded-xl
              px-4 py-3
              text-sm
              text-dark-100
              outline-none
              focus:border-blue-500
            "
          />

        </div>

        {/* Error */}

        {error && (

          <div className="
            mt-4
            text-sm
            text-red-300
            bg-red-500/10
            border border-red-500/20
            rounded-lg
            px-4 py-3
          ">

            {error}

          </div>
        )}

        {/* Button */}

        <button

          onClick={handleLogin}

          disabled={loading}

          className="
            w-full
            mt-6
            bg-blue-500
            hover:bg-blue-400
            text-white
            py-3
            rounded-xl
            text-sm
            font-medium
            transition-all
            disabled:opacity-50
          "
        >

          {loading
            ? 'Signing In...'
            : 'Login'}

        </button>

        {/* Footer */}

        <div className="
          mt-6
          text-sm
          text-dark-300
          text-center
        ">

          Don’t have an account?

          <Link

            to="/register"

            className="
              text-blue-400
              ml-1
            "
          >

            Register

          </Link>

        </div>

      </div>

    </div>
  )
}
