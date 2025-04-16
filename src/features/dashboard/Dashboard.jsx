import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/sidebar/SideBar'

const Dashboard = () => {
  return (
    <div>
      <SideBar/>
      Dashboard
      <Outlet/>
    </div>
    
  )
}

export default Dashboard