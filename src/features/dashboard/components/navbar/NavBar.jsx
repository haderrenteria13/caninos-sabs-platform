import React from 'react'
import Avvvatars from 'avvvatars-react'
import useAuth from '../../../auth/hooks/useAuth'

const NavBar = () => {
    const { user } = useAuth()

    return (
        <nav>
            <Avvvatars value={user?.email || 'usuario'} radius={10} size={40} />
            <p>{user?.email ? `Usuario: ${user.email}` : 'No hay un usuario logueado'}</p>
        </nav>
    )
}

export default NavBar