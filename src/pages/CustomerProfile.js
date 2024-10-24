import React from 'react';
import { FaTrash } from 'react-icons/fa6';

const CustomerProfile = () => {
  const [tab, setTab] = React.useState('profile');

  return (
    <div className="p-4 w-full ml-20  bg-gray-100"
    // style={{ marginLeft: "100px" }}
    >
      <div className="bg-white p-4 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-2 md:mb-0">
            <p>Customer Name : Mr. Gaurav Kr Gupta</p>
            <p>Owner Name : Gaurav Gupta</p>
            <p>Last Remark :</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Contact No : 8899008899</p>
            <p>Customer Type: B2C</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Email ID : abc@gmail.com</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Active Since : 02-Aug-17 05:26:00</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">+ Add Remarks</button>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Facebook</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">+ To Do</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">+ New Query</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <div className="flex overflow-x-auto space-x-4 mb-4">
          {['profile', 'queries', 'bookings', 'todos', 'chats', 'contacts', 'feedback', 'remarks'].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 ${tab === item ? 'bg-blue-500 text-white rounded-md' : ''}`}
              onClick={() => setTab(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)} {item === 'queries' && <span className="bg-white text-red-500 rounded-full px-2">236</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <div className="flex justify-between items-center mb-4">
          <p>Payments: </p>
          <p>Total Billed: 405,895.66 </p>
          <p>Total Paid: 105,020.00</p>
          <p>Pending: 300,875.66</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded">View</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-4">
        <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold">I want to go :</p>
            <button className="bg-gray-200 px-4 py-2 rounded">+ Add</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Destination</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {['Goa (India)', '(Singapore)', '(USA)', 'Goa (India)'].map((destination, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-center">{destination}</td>
                  <td className="p-2 text-center">
                    <button className="text-red-500"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mt-4 md:mt-0">
          <p className="font-bold mb-4">Customer Profile / Preferences</p>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="p-2">Food:</td>
                <td className="p-2">Veg, Jain/Satwik</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Hotel:</td>
                <td className="p-2">1 Star, 2 Star, 3 Star, 4 Star, 5 Star, Any Star</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Passport:</td>
                <td className="p-2">31155895 (20-Sep-24)</td>
              </tr>
              <tr>
                <td className="p-2">Marital Status:</td>
                <td className="p-2">
                  <select className="border p-2 rounded w-full">
                    <option>Select your status</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
