import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useGetRoles from './hooks/useGetRoles'
import useDeleteRoles from './hooks/useDeleteRoles'
import FormRoles from './components/FormRoles'
import EditRole from './components/EditRoles'
import rolesApi from './services/rolesApi'

const Roles = () => {
  const { roles: initialRoles, error, loading } = useGetRoles()
  const { deleteRole, error: deleteError } = useDeleteRoles()
  const [roles, setRoles] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingRole, setEditingRole] = useState(null)

  useEffect(() => {
    setRoles(initialRoles)
  }, [initialRoles])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar este rol?')
    if (confirmed) {
      setDeletingId(id)
      const success = await deleteRole(id)
      if (success) {
        toast.success('Rol eliminado correctamente')
        setRoles((prev) => prev.filter((role) => role.id !== id))
        setDeletingId(null)
      } else {
        toast.error('Error al eliminar el rol')
        setDeletingId(null)
      }
    }
  }

  const handleEditSuccess = () => {
    toast.success('Rol actualizado con éxito')
    setEditingRole(null)
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Roles</h1>
      <div className="mb-6">
        <FormRoles
          onSubmit={async (formData) => {
            try {
              const newRole = await rolesApi.create(formData)
              toast.success('Rol creado con éxito')
              setRoles([...roles, newRole])
            } catch (error) {
              toast.error(error.message)
            }
          }}
        />
      </div>
      {deleteError && (
        <p className="text-red-500 mb-4">
          Error al eliminar el rol: {deleteError}
        </p>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left">{role.name}</td>
                <td className="py-3 px-6 text-left">{role.description}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setEditingRole(role)}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      disabled={deletingId === role.id}
                      className={`text-red-500 hover:underline ${deletingId === role.id ? 'opacity-50' : ''
                        }`}
                    >
                      {deletingId === role.id
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
      {editingRole && (
        <div className="mt-6">
          <EditRole roleId={editingRole.id} onSuccess={handleEditSuccess} />
        </div>
      )}
    </div>
  )
}

export default Roles