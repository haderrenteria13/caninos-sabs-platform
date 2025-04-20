import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/sidebar/SideBar'


const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-8 bg-white shadow-inner rounded-lg overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard