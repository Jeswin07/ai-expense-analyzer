import axios from 'axios'


const API = axios.create({

  baseURL:
    'http://127.0.0.1:8000'
})


// ─────────────────────────────
// JWT INTERCEPTOR
// ─────────────────────────────

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        'token'
      )

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },

  (error) => {

    return Promise.reject(
      error
    )
  }
)


// ─────────────────────────────
// EXPENSE APIs
// ─────────────────────────────

export const expenseService = {

  getAll: () =>

    API.get('/expenses'),

  create: (data) =>

    API.post(
      '/expenses/',
      data
    ),

  update: (id, data) =>

    API.put(
      `/expenses/${id}`,
      data
    ),

  delete: (id) =>

    API.delete(
      `/expenses/${id}`
    )
}


// ─────────────────────────────
// ANALYTICS APIs
// ─────────────────────────────

export const analyticsService = {

  getSummary: () =>

    API.get(
      '/analytics/summary'
    )
}


// ─────────────────────────────
// AI APIs
// ─────────────────────────────

export const aiService = {

  getSummary: () =>

    API.get(
      '/ai/summary'
    ),

  extractExpense: (text) =>

    API.post(

      '/nlp/extract-expense',

      { text }
    )
}


// ─────────────────────────────
// BUSINESS INTELLIGENCE APIs
// ─────────────────────────────

export const businessIntelligenceService = {

  getForecasting: () =>

    API.get('/forecasting'),

  getVendorSegmentation: () =>

    API.get(
      '/vendor-segmentation'
    ),

  getAnomalies: () =>

    API.get(
      '/anomaly-detection'
    )
}


// ─────────────────────────────
// CSV IMPORT
// ─────────────────────────────

export const csvImportService = {

  uploadCSV: async (file) => {

    const formData =
      new FormData()

    formData.append(
      'file',
      file
    )

    return API.post(

      '/csv-import/',

      formData,

      {
        headers: {

          'Content-Type':
            'multipart/form-data'
        }
      }
    )
  }
}
