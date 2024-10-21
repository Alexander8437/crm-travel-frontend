import React from 'react'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import Quickstart from './components/Quickstart'
import Packages from './components/Packages'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CountryMaster from './pages/CountryMaster'
import PackageDashboard from './pages/PackageDashboard'
import CustomerProfile from './pages/CustomerProfile'
import Bookings from './pages/Bookings'

const PageRoute = () => {

  return (
    <>
      <Navbar />
      <div className="main-content h-screen mt-12 flex flex-row w-full overflow-x-hidden overflow-y-auto">
        <Sidebar />
        <Routes>
          <Route path={''} element={<Quickstart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages" element={<Packages />} /> {/* Add the Package route */}
          <Route path="/packageDashboard" element={<PackageDashboard />} />
          <Route path="/master-list" element={<CountryMaster />} />
          <Route path="/package-view" element={<CustomerProfile />} />
          <Route path="/booking-dashboard" element={<Bookings />} />
          <Route path='/' />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </>
  )
}

export default PageRoute