import React from 'react'
import usersApi from './services/userApi'
import FormUsers from './components/FormUsers'
import useGetUsers from './hooks/useGetUsers'

const Users = () => {
    const {users, loading, error} = useGetUsers()

    const handleCreateUser = async (formData) => {
        try {
            const newUser = await usersApi.create(formData)
            setUsers([...users, newUser.user])
        } catch (error) {
            alert(error.message)
        }
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <FormUsers onSubmit={handleCreateUser} />
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h2>{user.fullName}</h2>
                        <p>Email: {user.email}</p>
                        <p>Rol: {user.role?.name}</p>
                        <p>Compañía: {user.company?.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users