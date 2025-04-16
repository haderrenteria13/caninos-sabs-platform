import React from 'react'
import axios from 'axios'

const BASE_URL = 'https://caninos-sabs-backend-production.up.railway.app'

const fetchLoginApi = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    })

    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    } else {
      throw new Error('Error de conexión');
    }
  }
}

export default fetchLoginApi