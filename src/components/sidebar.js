import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaHome, FaListAlt, FaUserTie } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { IoListSharp } from "react-icons/io5";
import { FiPackage } from "react-icons/fi"; // Packages icon
import { TbChecklist } from "react-icons/tb"; // Bookings icon
import { IoIosPeople } from "react-icons/io"; // My Teams icon
import { HiOutlineDocumentReport } from "react-icons/hi"; // Reports icon
import { FcSalesPerformance } from "react-icons/fc"; // Sales icon
import Country from '../pages/Country';
import State from '../pages/State';
import Destination from '../pages/Destination';
import Hotel from '../pages/Hotel';
import Roles from '../pages/Roles';
import NewMember from '../pages/NewMember';

const Sidebar = () => {
  const [showQuickstart, setShowQuickstart] = useState(false);
  const [addCountry, setAddCountry] = useState(false);
  const [addState, setAddState] = useState(false);
  const [addDestination, setAddDestination] = useState(false);
  const [addHotel, setAddHotel] = useState(false);
  const [addRole, setAddRole] = useState(false);
  const [addNewMember, setAddNewMember] = useState(false)


  const showCountry = () => {
    setAddCountry(true)
  }
  const showNewMember = () => {
    setAddNewMember(true)
  }
  const showRole = () => {
    setAddRole(true)
  }
  const showState = () => {
    setAddState(true)
  }
  const showDestination = () => {
    setAddDestination(true)
  }
  const showHotel = () => {
    setAddHotel(true)
  }

  return (<>
    <div className="sidebar w-20 bg-[#db272e] h-full text-white py-4 space-y-4 fixed truncate mb-10" style={{ zIndex: "2" }}>
      {/* Sidebar Home Item */}
      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center rounded cursor-pointer m-0 p-0" style={{ minWidth: "100%" }}>
          <FaHome size="25px" />
          <p className='menu-name'>Home</p>
        </div>
        {/* Animated Submenu */}
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-[#333338] p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px' }}>
          <div className='flex flex-col'>
            <p>Home</p>
            {/* <Link to='/home' className="block px-4 py-2 hover:bg-gray-600 rounded"> */}
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify border border-1 border-gray-400 hover:text-black hover:border-gray-400 hover:bg-white">
              Quickstart
            </button>
            {/* </Link> */}
            {/* <Link to='/home/dashboard' className="block px-4 py-2 hover:bg-gray-600 rounded">       */}
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
              Dashboard
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>

      {/* Sidebar Packages Item */}
      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center space-x-2 p-2 rounded cursor-pointer hover:color-black"
          style={{ zIndex: "2" }}>
          <FiPackage size="25px" />
          <p className='menu-name'>Packages</p>
        </div>
        {/* Animated Submenu */}
        {/* <div className="submenu fixed left-20 top-0 h-screen pointer-events-none transform -translate-x-full opacity-0 transition-all duration-1000 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto bg-[#f9f9f9] p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px', zIndex: "1" }}> */}
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px' }}>
          <div className='flex flex-col'>
            <p>Package</p>
            {/* <Link to='/home' className="block px-4 py-2 hover:bg-gray-600 rounded"> */}
            <div className="mt-4 border-b-2">
              <h6 className='flex font-bold gap-4 items-center'>
                <FaListUl size='18px' />
                All Package List</h6>
            </div>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify">
              New Package
            </button>
            {/* </Link> */}
            {/* <Link to='/home/dashboard' className="block px-4 py-2 hover:bg-gray-600 rounded">       */}
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
              Ouick Package
            </button>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
              Packages Dashboard
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>

      {/* Sidebar Bookings Item */}
      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center space-x-2 p-2 rounded cursor-pointer">
          <TbChecklist size="25px" />
          <p className='menu-name'>Bookings</p>
        </div>
        {/* Animated Submenu */}
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px' }}>
          <div className='flex flex-col'>
            <p>Booking</p>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify">New Bookings</button>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">Bookings Dashboard</button>
          </div>
        </div>
      </div>

      {/* Other Sidebar Items (without submenus) */}
      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center space-x-2 p-2 rounded cursor-pointer">
          <IoIosPeople className='sidebar-icon text-white' size="25px" />
          <p className='menu-name text-white text-center mt-1'>My Teams</p>
        </div>
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px' }}>
          <div className='flex flex-col'>
            <p>My Teams</p>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify" onClick={showRole}>Roles & Permission</button>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify" onClick={showNewMember}>New Members</button>
            <button class="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">Member Board</button>
          </div>
        </div>
      </div>

      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center space-x-2 p-2 rounded cursor-pointer">
          <HiOutlineDocumentReport className='sidebar-icon text-white' size="25px" />
          <p className='menu-name text-white text-center mt-1'>Reports</p>
        </div>
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px' }}>
          <div className='flex flex-col'>
            <p>Reports</p>
          </div>
        </div>
      </div>

      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center space-x-2 p-2 rounded cursor-pointer">
          <FcSalesPerformance className='sidebar-icon text-white' size="25px" />
          <p className='menu-name text-white text-center mt-1'>Sales</p>
        </div>
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '270px' }}>
          <div className='flex flex-col'>
            <p>Sales</p>
          </div>
        </div>
      </div>

      <div className="sidebar-item group relative hover:w-full">
        <div className="sidebar-icons flex flex-col items-center space-x-2 p-2 rounded cursor-pointer">
          <FaUserTie className='sidebar-icon text-white' size="25px" />
          <p className='menu-name text-white text-center mt-1'>Masters</p>
        </div>
        <div className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-1200 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px' }}>
          <div className='flex flex-col'>
            <p>Masters</p>
            <Link to='/home/master-list'>
              <p className='py-2 my-4 border-b-2 flex items-center gap-4'>
                <FaListUl size='18px' />
                All Master</p>
            </Link>
            <div className='flex mt-10 gap-4'>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20"
                onClick={showCountry}>Country</button>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20 "
                onClick={showState}
              >State</button>
            </div>
            <div className='flex gap-4'>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20"
                onClick={showDestination} >Destinations</button>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20" onClick={showHotel}>Hotels</button>
            </div>
            <div className='flex gap-4'>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">Transportation</button>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">Policies</button>
            </div>
            <div className='flex gap-4'>

              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">Vendors</button>
              <button className="w-full px-4 py-2 bg-gray-300 cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">Itinerary</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='submenu-menu' style={{ right: addCountry ? '0' : '-100%' }}>
      <Country isOpen={addCountry} onClose={() => setAddCountry(false)} />
    </div>
    <div className='submenu-menu' style={{ right: addState ? '0' : '-100%' }}>
      <State isOpen={addState} onClose={() => setAddState(false)} />
    </div>
    <div className='submenu-menu' style={{ right: addDestination ? '0' : '-100%' }}>
      <Destination isOpen={addDestination} onClose={() => setAddDestination(false)} />
    </div>
    <div className='submenu-menu' style={{ right: addHotel ? '0' : '-100%' }}>
      <Hotel isOpen={addHotel} onClose={() => setAddHotel(false)} />
    </div>
    <div className='submenu-menu' style={{ right: addRole ? '0' : '-100%' }}>
      <Roles isOpen={addRole} onClose={() => setAddRole(false)} />
    </div>
    <div className='submenu-menu' style={{ right: addNewMember ? '0' : '-100%' }}>
      <NewMember isOpen={addNewMember} onClose={() => setAddNewMember(false)} />
    </div>
  </>);
};

export default Sidebar;
