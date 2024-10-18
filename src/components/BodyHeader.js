import React from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Quickstart from './Quickstart';
import Dashboard from './Dashboard';
import HomePage from './Home';
import { FaHome, FaUserTie } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { FcSalesPerformance } from 'react-icons/fc';

const BodyHeader = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    // <div className="flex flex-col w-full ml-10 p-0">
    // <div className="flex-auto">
    <div className=" bg-gray-100 py-4 px-10 shadow-md">
      <div className="flex space-x-4 justify-between md:space-x-10">
        <Link to="/home">
          <button
            className={`header-button text-black font-medium text-sm md:text-base`}
          >
            Home
          </button>
        </Link>

        <div className='flex m-0 p-0 gap-8'>
          <Link to="/home" className={` pb-1 ${activeTab === '/home' ? 'border-b-4 border-red-700' : ''
            }`}>
            <button
              className={`header-button text-black font-medium text-sm md:text-base`}
            >
              Quickstart
            </button>
          </Link>

          <Link to="/home/dashboard" className={` pb-1 ${activeTab === '/home/dashboard' ? 'border-b-4 border-red-700' : ''
            }`}>
            <button
              className={`header-button text-black font-medium text-sm md:text-base`}
            >
              Dashboard
            </button>
          </Link>
        </div>
        <p></p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default BodyHeader;
