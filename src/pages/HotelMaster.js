import React, { useEffect, useState } from 'react'
import MasterList from '../components/MasterList';
import api from '../apiConfig/config';
import { FaEye } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelMaster = () => {
  const navigate = useNavigate();
  const statusColors = {
    hot: "bg-red-500",
    warm: "bg-yellow-500",
    cold: "bg-blue-500",
    noStatus: "bg-gray-500"
  }

  const [hotelDetails, setHotelDetails] = useState([])

  useEffect(() => {
    axios.get(`${api.baseUrl}/hotel/getAll`)
      .then(response => {
        setHotelDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleView = (item) => {
    navigate(`/home/master-list/hotel/${item.id}`, { state: { item } })
  }

  return (
    <>
      <div className="p-4 w-full bg-gray-50 overflow-x-auto ml-20">
        <MasterList />
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Select Users</option>
            </select>
            <button className="bg-gray-200 text-black px-4 py-2 rounded">Assign</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-orange-500 text-white px-4 py-2 rounded">B2C Customer</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">B2B Customer</button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button className="bg-gray-200 text-black px-4 py-2 rounded">Archive</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Hot</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Warm</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Cold</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">No Status</button>
          </div>
        </div>
        <hr />

        <table className="min-w-full bg-white">
          <thead>
            <tr className='border-b truncate'>
              <th className="py-2 px-4 border-l">Select</th>
              <th className="py-2 px-4 border-l">Hotel Name</th>
              <th className="py-2 px-4 border-l">Description</th>
              <th className="py-2 px-4 border-l">Hotel Address </th>
              <th className="py-2 px-4 border-l">Created By</th>
              <th className="py-2 px-4 border-l">Hotel Email ID</th>
              <th className="py-2 px-4 border-l">Status</th>
              <th className="py-2 px-4 border-l border-r">Action</th>
            </tr>
          </thead>
          <tbody>
            {hotelDetails.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 border-l">
                  <div className='flex'>
                    <div className={`w-1 h-14 ${statusColors[item.status]} mr-2`}></div>
                    <input type="checkbox" className="form-checkbox" />
                  </div>
                </td>
                <td className="py-2 px-4 border-l">
                  {item.hname}</td>
                <td className="py-2 px-4 border-l">
                  {item.hdescription}
                </td>
                <td className="py-2 px-4 border-l">
                  {item.haddress}
                </td>
                <td className="py-2 px-4 border-l">{item.created_by}</td>
                <td className="py-2 px-4 border-l">{item.hcontactemail}</td>
                <td className="py-2 px-4 border-l">{item.status ? 'Active' : 'Inactive'}</td>

                <td className="py-2 px-4 border-l border-r">
                  <div className='flex items-center justify-center gap-1'>
                    <FaEye className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => handleView(item)} />
                    <FaEye className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                    <FaEye className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default HotelMaster