import React, { useState, useEffect } from 'react'
import usersApi from './services/userApi'
import FormUsers from './components/FormUsers'
import EditUser from './components/editUsers'
import useGetUsers from './hooks/useGetUsers'
import useDeleteUsers from './hooks/useDeleteUsers'
import { toast } from 'react-toastify'

const Users = () => {
    const { users: initialUsers, loading, error } = useGetUsers()
    const { deleteUser, error: deleteError } = useDeleteUsers()
    const [users, setUsers] = useState([])
    const [deletingId, setDeletingId] = useState(null)
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        setUsers(initialUsers)
    }, [initialUsers])

    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro que quieres eliminar este usuario?')
        if (confirmed) {
            setDeletingId(id)
            const success = await deleteUser(id)
            if (success) {
                toast.success('Usuario eliminado correctamente')
                setUsers((prev) => prev.filter((user) => user.id !== id))
                setDeletingId(null)
            } else {
                toast.error('Error al eliminar el usuario')
                setDeletingId(null)
            }
        }
    }

    const handleEditSuccess = () => {
        toast.success('Usuario actualizado con éxito')
        setEditingUser(null)
    }

    const handleCreateUser = async (formData) => {
        try {
            const newUser = await usersApi.create(formData)
            toast.success('Usuario creado con éxito')
            setUsers([...users, newUser.user])
        } catch (error) {
            toast.error(error.message)
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
            {deleteError && <p style={{ color: 'red' }}>Error al eliminar el usuario: {deleteError}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h2>{user.fullName}</h2>
                        <p>Email: {user.email}</p>
                        <p>Rol: {user.role?.name}</p>
                        <p>Compañía: {user.company?.name}</p>
                        <button onClick={() => handleDelete(user.id)} disabled={deletingId === user.id}>
                            {deletingId === user.id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                        <button onClick={() => setEditingUser(user)}>Editar</button>
                    </li>
                ))}
            </ul>
            {editingUser && (<EditUser userId={editingUser.id} onSuccess={handleEditSuccess} />)}
        </div>
    )
}

export default Users