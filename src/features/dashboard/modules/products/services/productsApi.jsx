import axios from 'axios'

const BASE_URL = 'https://caninos-sabs-backend-production.up.railway.app'

const productsApi = {
  create: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto')
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data.products
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener los productos')
    }
  },

  getForID: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el producto')
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el producto')
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el producto')
    }
  },
}

export default productsApi