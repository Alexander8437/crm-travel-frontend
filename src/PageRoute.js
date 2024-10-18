import React from 'react'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import Quickstart from './components/Quickstart'
import Packages from './components/Packages'
import PackageDashboard from './components/PackageDashboard'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CountryMaster from './pages/CountryMaster'

const PageRoute = () => {

  return (
    <>
      <Navbar />
      <div className="main-content h-screen mt-12 flex flex-row w-full overflow-x-hidden overflow-y-auto	">
        <Sidebar />
        <Routes>
          <Route path={''} element={<Quickstart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages" element={<Packages />} /> {/* Add the Package route */}
          <Route path="/home/packageDashboard" element={<PackageDashboard />} />
          <Route path="/home/master-list" element={<CountryMaster />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </>
  )
}

export default PageRoute