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
import Itinerary from '../pages/Itinerary';
import NewPackageForm from '../pages/NewPacakgeForm';

const Sidebar = () => {
  const [homeStyle, setHomeStyle] = useState([])
  const [showQuickstart, setShowQuickstart] = useState(false);
  const [addCountry, setAddCountry] = useState(false);
  const [addState, setAddState] = useState(false);
  const [addDestination, setAddDestination] = useState(false);
  const [addHotel, setAddHotel] = useState(false);
  const [addRole, setAddRole] = useState(false);
  const [addNewMember, setAddNewMember] = useState(false)
  const [addItinerary, setAddItinerary] = useState(false)
  const [addNewPackage, setAddNewPackage] = useState(false)


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

  const showItinerary = () => {
    setAddItinerary(true)
  }
  const showNewPackage = () => {
    setAddNewPackage(true)
  }
  return (
    <>
      <div
        className="sidebar w-20 bg-gradient-to-b from-[#db272e] to-[#5b2727] h-full text-white py-2 space-y-4 fixed truncate mb-10 l-0 t-0"
        style={{ zIndex: "2" }}
      >
        {/* Sidebar Home Item */}
        <div className="sidebar-item group relative">
          <div
            className="sidebar-icons flex flex-col justify-center items-center rounded cursor-pointer m-0 p-0  w-full"
            style={{ minWidth: "100%" }}
            onMouseEnter={() => setHomeStyle(['Home'])}
            onMouseLeave={() => setHomeStyle([])}
          >
            <FaHome size="30px" color={homeStyle[0] === 'Home' ? '#fff' : '#B4B4B8'} />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'Home' ? 'text-white' : 'text-[#B4B4B8]'} `}>Home</p>
          </div>
          {/* Animated Submenu */}
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-[#333338] p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "340px" }}
          >
            <div className="flex flex-col">
              <p>Home</p>
              {/* <Link to='/home' className="block px-4 py-2 hover:bg-gray-600 rounded"> */}
              <Link to='/home'>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify  hover:text-black hover:border-gray-400 hover:bg-white"
                >
                  Quickstart
                </button>
              </Link>
              {/* </Link> */}
              {/* <Link to='/home/dashboard' className="block px-4 py-2 hover:bg-gray-600 rounded">       */}
              <Link to='/home/dashboard'>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
                  Dashboard
                </button>
              </Link>
              {/* </Link> */}
            </div>
          </div>
        </div>

        {/* Sidebar Packages Item */}
        <div className="sidebar-item group relative hover:w-full">
          <div
            className="sidebar-icons flex flex-col justify-center  items-center space-x-2 p-2 rounded cursor-pointer hover:color-black"
            style={{ zIndex: "2" }}
            onMouseEnter={() => setHomeStyle(['Packages'])}
            onMouseLeave={() => setHomeStyle([])}
          >
            <FiPackage size="30px" color={homeStyle[0] === 'Packages' ? '#fff' : '#B4B4B8'} />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'Packages' ? 'text-white' : 'text-[#B4B4B8]'} `}>Packages</p>
          </div>
          {/* Animated Submenu */}
          {/* <div className="submenu fixed left-20 top-0 h-screen pointer-events-none transform -translate-x-full opacity-0 transition-all duration-1000 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto bg-[#f9f9f9] p-4 rounded shadow-lg space-y-2 mt-2"
          style={{ width: '340px', zIndex: "1" }}> */}
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "340px" }}
          >
            <div className="flex flex-col">
              <p className="font-bold">Package</p>
              {/* <Link to='/home' className="block px-4 py-2 hover:bg-gray-600 rounded"> */}
              <div className="mt-4 border-b-2">
                <h6 className="flex font-bold gap-4 items-center">
                  <FaListUl size="18px" />
                  All Package List
                </h6>
              </div>
              <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify"
                onClick={showNewPackage}
              >
                New Package
              </button>
              {/* </Link> */}
              {/* <Link to='/home/dashboard' className="block px-4 py-2 hover:bg-gray-600 rounded">       */}
              <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
                Ouick Package
              </button>
              <Link to='/home/packageDashboard'>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
                  Packages Dashboard
                </button>
              </Link>
              {/* </Link> */}
            </div>
          </div>
        </div>

        {/* Sidebar Bookings Item */}
        <div className="sidebar-item group relative hover:w-full">
          <div className="sidebar-icons flex flex-col justify-center  items-center space-x-2 p-2 rounded cursor-pointer"

            onMouseEnter={() => setHomeStyle(['Bookings'])}
            onMouseLeave={() => setHomeStyle([])}>
            <TbChecklist size="30px" color={homeStyle[0] === 'Bookings' ? '#fff' : '#B4B4B8'} />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'Bookings' ? 'text-white' : 'text-[#B4B4B8]'} `}>Bookings</p>
          </div>
          {/* Animated Submenu */}
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "340px" }}
          >
            <div className="flex flex-col">
              <p className="font-bold">Booking</p>
              <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 mt-10 rounded-md text-justify">
                New Bookings
              </button>
              <Link to='/home/booking-dashboard'>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify"
                >
                  Bookings Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Other Sidebar Items (without submenus) */}
        <div className="sidebar-item group hover:w-full">
          <div className="sidebar-icons flex flex-col justify-center  items-center space-x-2 p-2 rounded cursor-pointer"
            onMouseEnter={() => setHomeStyle(['MyTeams'])}
            onMouseLeave={() => setHomeStyle([])}>
            <IoIosPeople size="30px" color={homeStyle[0] === 'MyTeams' ? '#fff' : '#B4B4B8'} />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'MyTeams' ? 'text-white' : 'text-[#B4B4B8]'} `}>My Teams</p>
          </div>
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "340px" }}
          >
            <div className="flex flex-col h-full">
              <p className="font-bold text-lg  mb-4">My Teams</p>

              {/* Members Section Header */}
              <div className="flex items-center py-4 border-b-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z"
                  />
                </svg>
                <p className="text-sm font-semibold">Members</p>
              </div>

              {/* Member Item */}
              <div className='flex flex-col justify-between h-1/2 border-b-2 mb-2'>

                <div className="flex items-center space-x-3 py-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <span className="text-xl">A</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      Alexander7@gmail.com
                    </span>
                    <span className="text-sm text-gray-600">Alexander7</span>
                  </div>
                </div>

                {/* All Members Button */}
                <button className="w-full px-4 py-2 text-purple-600 font-semibold border border-purple-600 rounded-md my-4">
                  All Members
                </button>
              </div>

              {/* Roles & Permission, New Member, Member Board Buttons */}
              <div className="flex flex-col items-center pb-4 border-b">

                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify"
                  onClick={showRole}
                >
                  Roles & Permission
                </button>
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify"
                  onClick={showNewMember}
                >
                  New Member
                </button>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify">
                  Member Board
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-item group relative hover:w-full">
          <div className="sidebar-icons flex flex-col justify-center  items-center space-x-2 p-2 rounded cursor-pointer"
            onMouseEnter={() => setHomeStyle(['Reports'])}
            onMouseLeave={() => setHomeStyle([])}>
            <HiOutlineDocumentReport size="30px" color={homeStyle[0] === 'Reports' ? '#fff' : '#B4B4B8'}
            />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'Reports' ? 'text-white' : 'text-[#B4B4B8]'} `}>Reports</p>
          </div>
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "340px" }}
          >
            <div className="flex flex-col">
              <p className="font-bold">Reports</p>
            </div>
          </div>
        </div>

        <div className="sidebar-item group relative hover:w-full">
          <div className="sidebar-icons flex flex-col text-center justify-center items-center space-x-2 p-2 rounded cursor-pointer"
            onMouseEnter={() => setHomeStyle(['Sales'])}
            onMouseLeave={() => setHomeStyle([])}>
            <FcSalesPerformance size="30px" color={homeStyle[0] === 'Sales' ? '#fff' : '#B4B4B8'} />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'Sales' ? 'text-white' : 'text-[#B4B4B8]'} `}>Sales</p>
          </div>
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "270px" }}
          >
            <div className="flex flex-col">
              <p className="font-bold">Sales</p>
            </div>
          </div>
        </div>

        <div className="sidebar-item group relative hover:w-full">
          <div className="sidebar-icons flex flex-col justify-center items-center space-x-2 p-2 rounded cursor-pointer"
            onMouseEnter={() => setHomeStyle(['Masters'])}
            onMouseLeave={() => setHomeStyle([])}>
            <FaUserTie size="30px" color={homeStyle[0] === 'Masters' ? '#fff' : '#B4B4B8'} />
            <p className={`menu-name text-[15px] ${homeStyle[0] === 'Masters' ? 'text-white' : 'text-[#B4B4B8]'} `}>Masters</p>
          </div>
          <div
            className="submenu fixed left-20 top-10 h-screen pointer-events-none transform opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-[#f9f9f9] text-black p-4 rounded shadow-lg space-y-2 mt-2"
            style={{ width: "340px" }}
          >
            <div className="flex flex-col">
              <p className="font-bold">Masters</p>
              <Link to="/home/master-list">
                <p className="py-2 my-4 border-b-2 flex items-center gap-4">
                  <FaListUl size="18px" />
                  All Master
                </p>
              </Link>
              <div className="flex mt-10 gap-4">
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20"
                  onClick={showCountry}
                >
                  Country
                </button>
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20 "
                  onClick={showState}
                >
                  State
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20"
                  onClick={showDestination}
                >
                  Destinations
                </button>
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20"
                  onClick={showHotel}
                >
                  Hotels
                </button>
              </div>
              <div className="flex gap-4">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">
                  Transportation
                </button>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">
                  Policies
                </button>
              </div>
              <div className="flex gap-4">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6]  cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20">
                  Vendors
                </button>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#FFF9F9] to-[#F7C6C6] cursor-pointer border-none text-left shadow-md h-10 my-2 rounded-md text-justify h-20"
                  onClick={showItinerary}>
                  Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="submenu-menu"
        style={{ right: addCountry ? "0" : "-100%" }}
      >
        <Country isOpen={addCountry} onClose={() => setAddCountry(false)} />
      </div>
      <div className="submenu-menu" style={{ right: addState ? "0" : "-100%" }}>
        <State isOpen={addState} onClose={() => setAddState(false)} />
      </div>
      <div
        className="submenu-menu"
        style={{ right: addDestination ? "0" : "-100%" }}
      >
        <Destination
          isOpen={addDestination}
          onClose={() => setAddDestination(false)}
        />
      </div>
      <div className="submenu-menu" style={{ right: addHotel ? "0" : "-100%" }}>
        <Hotel isOpen={addHotel} onClose={() => setAddHotel(false)} />
      </div>
      <div className="submenu-menu" style={{ right: addRole ? "0" : "-100%" }}>
        <Roles isOpen={addRole} onClose={() => setAddRole(false)} />
      </div>
      <div
        className="submenu-menu"
        style={{ right: addNewMember ? "0" : "-100%" }}
      >
        <NewMember
          isOpen={addNewMember}
          onClose={() => setAddNewMember(false)}
        />
      </div>
      <div className="submenu-menu" style={{ right: addRole ? "0" : "-100%" }}>
        <Itinerary isOpen={addItinerary} onClose={() => setAddItinerary(false)} />
      </div>
      <div className="submenu-menu" style={{ right: addNewPackage ? "0" : "-100%" }}>
        <NewPackageForm isOpen={addNewPackage} onClose={() => setAddNewPackage(false)} />
      </div>
    </>
  );
};

export default Sidebar;