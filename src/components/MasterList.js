import React from 'react'

const MasterList = () => {
  return (
    <div className="h-24 w-full">
      <div className="pb-1">
        <h2 className="text-2xl p-1">Master List</h2>
      </div>
      <div className="relative inline-block">
        <ul className="flex gap-4 py-2 border-b border-gray-300">
          <Link to='/home/masterList' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/masterList' ? 'border-red-700' : 'border-transparent'}`}>
              Country
            </li>
          </Link>

          <Link to='/home/masterList/state' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/masterList/state' ? 'border-red-700' : 'border-transparent'}`}>
              State
            </li>
          </Link>

          <Link to='/home/masterList/destination' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/masterList/destination' ? 'border-red-700' : 'border-transparent'}`}>
              Destination
            </li>
          </Link>

          <Link to='/home/masterList/hotel' className='no-underline'>
            <li className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === '/home/masterList/hotel' ? 'border-red-700' : 'border-transparent'}`}>
              Hotel
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default MasterList