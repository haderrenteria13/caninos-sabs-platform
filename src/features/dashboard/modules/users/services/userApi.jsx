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

    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener los usuarios')
        }
    },
}

export default usersApi

