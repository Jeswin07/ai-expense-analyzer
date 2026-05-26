import React, {
  useState
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import axios from 'axios'


export default function Register() {

  const navigate =
    useNavigate()

  const [form, setForm] =
    useState({

      username: '',

      email: '',

      password: ''
    })

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')


  const set = (key) => (event) => {

    setForm({

      ...form,

      [key]:
        event.target.value
    })
  }


  const handleRegister = async () => {

    setLoading(true)

    setError('')

    setSuccess('')

    try {

      await axios.post(

        'http://127.0.0.1:8000/auth/register',

        form
      )

      setSuccess(
        'Account created successfully.'
      )

      setTimeout(() => {

        navigate('/login')

      }, 1200)

    } catch (error) {

      console.error(error)

      setError(
        'Registration failed.'
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

              Enterprise Analytics Platform

            </div>

          </div>

        </div>

        {/* Title */}

        <div className="mb-6">

          <h1 className="
            text-2xl font-semibold
            text-dark-100
          ">

            Create Account

          </h1>

          <p className="
            text-sm text-dark-300
            mt-1
          ">

            Register to access business intelligence analytics

          </p>

        </div>

        {/* Inputs */}

        <div className="space-y-4">

          <input

            type="text"

            placeholder="Username"

            value={form.username}

            onChange={set('username')}

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

        {/* Success */}

        {success && (

          <div className="
            mt-4
            text-sm
            text-green-300
            bg-green-500/10
            border border-green-500/20
            rounded-lg
            px-4 py-3
          ">

            {success}

          </div>
        )}

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

          onClick={handleRegister}

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
            ? 'Creating Account...'
            : 'Register'}

        </button>

        {/* Footer */}

        <div className="
          mt-6
          text-sm
          text-dark-300
          text-center
        ">

          Already have an account?

          <Link

            to="/login"

            className="
              text-blue-400
              ml-1
            "
          >

            Login

          </Link>

        </div>

      </div>

    </div>
  )
}
