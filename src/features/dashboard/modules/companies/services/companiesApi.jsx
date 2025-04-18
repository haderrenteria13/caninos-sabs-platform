import axios from 'axios'

const BASE_URL = 'https://caninos-sabs-backend-production.up.railway.app'

const companiesApi = {
  create: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/companies`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear la compañia')
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/companies`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener las compañias')
    }
  },

  getForID: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/companies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener la compañia')
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/companies/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar la compañia')
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/companies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar la compañia')
    }
  },
}

export default companiesApi