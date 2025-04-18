import { useState, useEffect } from "react";
import usersApi from "../services/userApi";

const useGetUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersApi.getAll()
                setUsers(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading (false)
            }
        }

        fetchUsers()
    }, [])

    return {
        users,
        error,
        loading
    }
}

export default useGetUsers