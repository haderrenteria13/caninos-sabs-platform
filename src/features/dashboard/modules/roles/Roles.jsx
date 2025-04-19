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
    <div>
      <h1>Roles</h1>
      <FormRoles
        onSubmit={async (formData) => {
          try {
            const newRole = await rolesApi.create(formData)
            toast.success('Rol creado con éxito')
            setRoles([...roles, newRole])
          } catch (error) {
            toast.error(error.message) 
          }
        }} />
      {deleteError && <p style={{ color: 'red' }}>Error al eliminar el rol: {deleteError}</p>} 
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
            <button onClick={() => handleDelete(role.id)} disabled={deletingId === role.id}>
              {deletingId === role.id ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button onClick={() => setEditingRole(role)}>Editar</button>
          </li>
        ))}
      </ul>
      {editingRole && (<EditRole roleId={editingRole.id} onSuccess={handleEditSuccess} />)}
    </div>
  )
}

export default Roles