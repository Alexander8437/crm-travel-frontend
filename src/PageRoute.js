import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import Quickstart from './components/Quickstart'
import Packages from './components/Packages'
import Dashboard from './components/Dashboard'
import CountryMaster from './pages/CountryMaster'
import PackageDashboard from './pages/PackageDashboard'
import CustomerProfile from './pages/CustomerProfile'
import HotelMaster from './pages/HotelMaster'
import Bookings from './pages/Bookings'
import HotelMasterAddRoom from './pages/HotelMasterAddRoom'
import MasterList from './pages/masterlis'
import AllMembers from './pages/AllMembers'
import ProfilePage from './pages/ProfilePage'

const PageRoute = () => {

  return (
    <div className='flex flex-col h-[100vh] overflow-hidden'>
      <Navbar />
      <div className="main-content h-full flex flex-row w-full">
        <Sidebar />
        <div className='h-full w-full overflow-y-auto'>
          <Routes>
            <Route path='' element={<Quickstart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/packages" element={<Packages />} /> {/* Add the Package route */}
            <Route path="/packageDashboard" element={<PackageDashboard />} />
            <Route path={'/package-list/:id'} element={<CustomerProfile />} />
            <Route path="/master-list" element={<MasterList />} />
            <Route path="/master-list/hotel" element={<HotelMaster />} />
            {/* <Route path="/master-list/hotel" element={<HotelMaster />} /> */}
            <Route path='/master-list/hotel/:id' element={<HotelMasterAddRoom />} />
            {/* <Route path="/package-view" element={<CustomerProfile />} /> */}
            <Route path="/booking-dashboard" element={<Bookings />} />
            <Route path="/all-members" element={<AllMembers />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path='/' />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default PageRoute