import React, { useState, useEffect } from 'react'
import usersApi from './services/userApi'
import FormUsers from './components/FormUsers'
import EditUser from './components/editUsers'
import useGetUsers from './hooks/useGetUsers'
import useDeleteUsers from './hooks/useDeleteUsers'
import { toast } from 'react-toastify'
import Avvvatars from 'avvvatars-react'
import { Dialog } from '@headlessui/react'

const Users = () => {
    const { users: initialUsers, loading, error } = useGetUsers()
    const { deleteUser, error: deleteError } = useDeleteUsers()
    const [users, setUsers] = useState([])
    const [deletingId, setDeletingId] = useState(null)
    const [editingUser, setEditingUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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
            } else {
                toast.error('Error al eliminar el usuario')
            }
            setDeletingId(null)
        }
    }

    const handleEditSuccess = async () => {
        try {
            const updatedUsers = await usersApi.getAll()
            setUsers(updatedUsers)
            toast.success('Usuario actualizado con éxito')
        } catch (error) {
            toast.error('Error al actualizar la lista de usuarios')
        }
        setEditingUser(null)
        setIsEditModalOpen(false) // Cierra el modal después de editar
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
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 "></div>
            </div>
        )
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h1>
            <div className="mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                    Crear Usuario
                </button>
            </div>
            {deleteError && (
                <p className="text-red-500 mb-4">
                    Error al eliminar el usuario: {deleteError}
                </p>
            )}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Rol</th>
                            <th className="py-3 px-6 text-left">Compañía</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="py-3 px-6 text-left flex items-center gap-2">
                                    <Avvvatars value={user.fullName} size={36} className="mr-2" />
                                    {user.fullName}
                                </td>
                                <td className="py-3 px-6 text-left">{user.email}</td>
                                <td className="py-3 px-6 text-left">{user.role?.name}</td>
                                <td className="py-3 px-6 text-left">{user.company?.name}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            onClick={() => {
                                                setEditingUser(user)
                                                setIsEditModalOpen(true)
                                            }}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={deletingId === user.id}
                                            className={`text-red-500 hover:underline ${deletingId === user.id ? 'opacity-50' : ''
                                                }`}
                                        >
                                            {deletingId === user.id
                                                ? 'Eliminando...'
                                                : 'Eliminar'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
                <div className="fixed inset-0 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <FormUsers
                            onSubmit={async (formData) => {
                                try {
                                    const newUser = await usersApi.create(formData)
                                    const updatedUsers = await usersApi.getAll()
                                    setUsers(updatedUsers)
                                    toast.success('Usuario creado con éxito')
                                    setIsModalOpen(false)
                                } catch (error) {
                                    toast.error(error.message)
                                }
                            }}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-10">
                <div className="fixed inset-0 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
                        {editingUser && (
                            <FormUsers
                                user={editingUser}
                                onSubmit={async (formData) => {
                                    try {
                                        await usersApi.update(editingUser.id, formData)
                                        handleEditSuccess()
                                    } catch (error) {
                                        toast.error(error.message)
                                    }
                                }}
                            />
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
            {editingUser && (
                <div className="mt-6">
                    <EditUser userId={editingUser.id} onSuccess={handleEditSuccess} />
                </div>
            )}
        </div>
    )
}

export default Users