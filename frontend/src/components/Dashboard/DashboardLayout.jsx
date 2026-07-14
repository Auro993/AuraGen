import React from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="dashboard-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout