import axios from 'axios'

const BASE_URL = 'https://caninos-sabs-backend-production.up.railway.app'

const rolesApi = {
  create: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/roles`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear la categoría')
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/roles`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener los roles')
    }
  },

  getForID: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/roles/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener la categoría')
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/roles/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar la categoría')
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/roles/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar la categoría')
    }
  },
}

export default rolesApi