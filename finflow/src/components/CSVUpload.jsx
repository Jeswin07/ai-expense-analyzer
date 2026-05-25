import React, {
  useState
} from 'react'

import {
  csvImportService
} from '../services/api'

export default function CSVUpload({

  onUploadSuccess
}) {

  const [file, setFile] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] =
    useState('')

  const [error, setError] =
    useState('')

  const handleUpload = async () => {

    if (!file) {

      setError(
        'Please select a CSV file.'
      )

      return
    }

    setLoading(true)

    setError('')

    setMessage('')

    try {

      const response =

        await csvImportService
          .uploadCSV(file)

      setMessage(

        `${response.data.rows_inserted}
         operational expense records imported successfully.`
      )

      setFile(null)

      if (onUploadSuccess) {

        onUploadSuccess()
      }

    } catch (error) {

      console.error(error)

      setError(
        'CSV import failed.'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="
      bg-dark-700
      border border-dark-500
      rounded-xl p-5
      mb-5
    ">

      {/* Header */}

      <div className="
        flex items-start
        justify-between
        mb-5
      ">

        <div>

          <div className="
            text-sm font-medium
            text-dark-100
          ">

            Import Operational Data

          </div>

          <div className="
            text-xs text-dark-300
            mt-1
          ">

            Upload enterprise expense CSV datasets for analytics ingestion

          </div>

        </div>

        <div className="
          w-10 h-10 rounded-lg
          bg-blue-500/10
          flex items-center
          justify-center
          text-blue-400
        ">

          <i className="
            ti ti-upload
            text-xl
          " />

        </div>

      </div>

      {/* Upload Area */}

      <div className="
        border-2 border-dashed
        border-dark-500
        rounded-xl
        p-6
        text-center
        bg-dark-800
      ">

        <input

          type="file"

          accept=".csv"

          onChange={(event) =>

            setFile(
              event.target.files[0]
            )
          }

          className="
            block w-full
            text-sm text-dark-200
            file:mr-4
            file:py-2
            file:px-4
            file:rounded-lg
            file:border-0
            file:bg-blue-500
            file:text-white
            file:text-sm
            file:font-medium
            hover:file:bg-blue-400
          "
        />

        <div className="
          text-xs text-dark-300
          mt-3
        ">

          Supports operational expense datasets in CSV format

        </div>

      </div>

      {/* Selected File */}

      {file && (

        <div className="
          mt-4
          bg-dark-800
          rounded-lg
          px-4 py-3
          flex items-center
          justify-between
        ">

          <div className="
            flex items-center
            gap-3
          ">

            <i className="
              ti ti-file-spreadsheet
              text-green-400
              text-lg
            " />

            <div>

              <div className="
                text-sm text-dark-100
              ">

                {file.name}

              </div>

              <div className="
                text-xs text-dark-300
              ">

                CSV dataset ready for ingestion

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Messages */}

      {message && (

        <div className="
          mt-4
          bg-green-500/10
          border border-green-500/20
          text-green-300
          rounded-lg
          px-4 py-3
          text-sm
        ">

          {message}

        </div>
      )}

      {error && (

        <div className="
          mt-4
          bg-red-500/10
          border border-red-500/20
          text-red-300
          rounded-lg
          px-4 py-3
          text-sm
        ">

          {error}

        </div>
      )}

      {/* Actions */}

      <div className="
        flex justify-end
        mt-5
      ">

        <button

          onClick={handleUpload}

          disabled={loading}

          className="
            px-5 py-2.5
            rounded-lg
            bg-blue-500
            hover:bg-blue-400
            text-white
            text-sm
            font-medium
            transition-all
            disabled:opacity-50
            flex items-center
            gap-2
          "
        >

          {loading ? (

            <>

              <i className="
                ti ti-loader-2
                animate-spin
              " />

              Importing...

            </>

          ) : (

            <>

              <i className="
                ti ti-database-import
              " />

              Import CSV

            </>

          )}

        </button>

      </div>

    </div>
  )
}
