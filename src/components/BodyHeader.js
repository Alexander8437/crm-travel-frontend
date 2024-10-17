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
    <div className="flex justify-center bg-gray-100 py-4 shadow-md">
      <div className="flex space-x-4 justify-between md:space-x-10">
        <Link to="/home">
          <button
            className={`header-button text-black font-medium text-sm md:text-base`}
          >
            Home
          </button>
        </Link>

        <div className='m-0 p-0'>
          <Link to="/home">
            <button
              className={`header-button text-black font-medium text-sm md:text-base ${activeTab === '/home' ? 'border-b-4 border-red-700' : ''
                }`}
            >
              Quickstart
            </button>
          </Link>

          <Link to="/home/dashboard">
            <button
              className={`header-button text-black font-medium text-sm md:text-base ${activeTab === '/home/dashboard' ? 'border-b-4 border-red-700' : ''
                }`}
            >
              Dashboard
            </button>
          </Link>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default BodyHeader;
