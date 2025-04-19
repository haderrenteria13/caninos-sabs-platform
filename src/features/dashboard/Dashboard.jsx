import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/sidebar/SideBar'
import NavBar from './components/navbar/NavBar'

const Dashboard = () => {
  return (
    <div>
      <SideBar />
      <NavBar />
      Dashboard
      <Outlet />
    </div>

  )
}

export default Dashboard