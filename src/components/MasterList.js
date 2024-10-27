import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MasterList = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <div className="h-24 w-full mt-0">
      <div className="pb-1">
        <h2 className="text-2xl p-1">Master List</h2>
      </div>
      <div className="relative inline-block">
        <ul className="flex gap-4 py-2 border-b border-gray-300">
          <Link to='/home/master-list' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/master-list' ? 'border-red-700' : 'border-transparent'}`}>
              Country
            </li>
          </Link>

          <Link to='/home/master-list/state' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/master-list/state' ? 'border-red-700' : 'border-transparent'}`}>
              State
            </li>
          </Link>

          <Link to='/home/master-list/destination' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/master-list/destination' ? 'border-red-700' : 'border-transparent'}`}>
              Destination
            </li>
          </Link>

          <Link to='/home/master-list/hotel' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/master-list/hotel' ? 'border-red-700' : 'border-transparent'}`}>
              Hotel
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default MasterList