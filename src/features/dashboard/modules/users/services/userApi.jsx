import axios from 'axios'

const BASE_URL = 'https://caninos-sabs-backend-production.up.railway.app'

const usersApi = {
    create: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al registrar el usuario')
        }
    },

    delete: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al eliminar el usuario')
        }
    },


    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener los usuarios')
        }
    },

    getForID: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener el usuario')
        }
    },

    update: async (id, data) => {
        try {
            const response = await axios.put(`${BASE_URL}/users/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al actualizar el usuario')
        }
    },
}

export default usersApi