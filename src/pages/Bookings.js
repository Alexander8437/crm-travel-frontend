import React from 'react'
import { FaEye } from 'react-icons/fa6'

const Bookings = () => {
  const data = [
    {
      queryDate: "18-Jan-21",
      name: "Mr. Gaurav Kr Gupta(15)",
      mobile: "9********2",
      email: "g*****@co.in",
      type: "B2C (Normal)",
      description: "Package Agency",
      travelDate: "29-Jan-21",
      pax: "2 Adult(s)",
      destinations: "Delhi-Singapore",
      proposal: "1 (View)",
      leadStage: "Query Created",
      lastUpdated: "18-Jan-21",
      owner: "Gaurav Gupta",
      status: "hot"
    },
    {
      queryDate: "18-Jan-21",
      name: "Mr. Gaurav Kr Gupta(15)",
      mobile: "9********2",
      email: "g*****@co.in",
      type: "B2C (Normal)",
      description: "Visa",
      travelDate: "31-Jan-21 - 05-Feb-21",
      pax: "1 Adult(s)",
      destinations: "Singapore",
      proposal: "1 (View)",
      leadStage: "Proposal Sent",
      lastUpdated: "18-Jan-21",
      owner: "Gaurav Gupta",
      status: "warm"
    },
    {
      queryDate: "18-Jan-21",
      name: "Mr. Gaurav Kr Gupta(15)",
      mobile: "9********2",
      email: "g*****@co.in",
      type: "B2C (Normal)",
      description: "Flight Agency",
      travelDate: "28-Jan-21 - 28-Jan-21",
      pax: "1 Adult(s)",
      destinations: "Delhi - Dubai",
      proposal: "0",
      leadStage: "Query Created",
      lastUpdated: "18-Jan-21",
      owner: "Gaurav Gupta",
      status: "cold"
    },
    {
      queryDate: "18-Jan-21",
      name: "Mr. Gaurav Kr Gupta(15)",
      mobile: "9********2",
      email: "g*****@co.in",
      type: "B2C (Normal)",
      description: "Package Website",
      travelDate: "22-Jan-21 - 26-Jan-21",
      pax: "1 Adult(s)",
      destinations: "Kerala",
      proposal: "1 (View)",
      leadStage: "Proposal Sent",
      lastUpdated: "18-Jan-21",
      owner: "Gaurav Gupta",
      status: "noStatus"
    },
    {
      queryDate: "18-Jan-21",
      name: "Mr. Gaurav Kr Gupta(15)",
      mobile: "9********2",
      email: "g*****@co.in",
      type: "B2C (Normal)",
      description: "Package Agency",
      travelDate: "28-Jan-21",
      pax: "5 Adult(s)",
      destinations: "Delhi-Singapore",
      proposal: "2 (View)",
      leadStage: "Query Created",
      lastUpdated: "18-Jan-21",
      owner: "Gaurav Gupta",
      status: "noStatus"
    }
  ]

  const statusColors = {
    hot: "bg-red-500",
    warm: "bg-yellow-500",
    cold: "bg-blue-500",
    noStatus: "bg-gray-500"
  }

  return (
    <div className="p-4 w-full bg-gray-50 overflow-x-auto ml-20">
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
      <div className="flex justify-between items-center mb-4 mt-4">
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">In Progress (154)</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Recent (222)</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Confirmed Proposals (64)</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Rejected</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Un Assigned</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Call Back</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Overall (6074)</button>
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-2 py-1">
            <option>Select Email Template</option>
          </select>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Email</button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">Query Date</th>
            <th className="py-2 px-4 border-b">Name/Mobile</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Travel Date</th>
            <th className="py-2 px-4 border-b">No. of Pax</th>
            <th className="py-2 px-4 border-b">Destinations</th>
            <th className="py-2 px-4 border-b">Proposal</th>
            <th className="py-2 px-4 border-b">Lead Stage</th>
            <th className="py-2 px-4 border-b">Last Updated</th>
            <th className="py-2 px-4 border-b">Owner</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">
                <div className='flex'>
                  <div className={`w-1 h-14 ${statusColors[item.status]} mr-2`}></div>
                  <input type="checkbox" className="form-checkbox" />
                </div>
              </td>
              <td className="py-2 px-4">{item.queryDate}</td>
              <td className="py-2 px-4">
                {item.name}
                <br />
                {item.mobile}
                <br />
                {item.email}
              </td>
              <td className="py-2 px-4">{item.type}</td>
              <td className="py-2 px-4">{item.description}</td>
              <td className="py-2 px-4">{item.travelDate}</td>
              <td className="py-2 px-4">{item.pax}</td>
              <td className="py-2 px-4">{item.destinations}</td>
              <td className="py-2 px-4">{item.proposal}</td>
              <td className="py-2 px-4">
                <div className="flex flex-col space-y-1">
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>Query Created</option>
                    <option>Proposal Sent</option>
                    <option>Follow Up</option>
                    <option>Closed</option>
                    <option>Post Sale</option>
                  </select>
                  <button className="bg-orange-500 text-white px-2 py-1 rounded">Follow Up</button>
                  <button className="bg-gray-200 text-black px-2 py-1 rounded">Touch Points</button>
                </div>
              </td>
              <td className="py-2 px-4">{item.lastUpdated}</td>
              <td className="py-2 px-4">{item.owner}</td>
              <td className="py-2 px-4">
                <div className='flex flex-col items-center justify-center'>
                  <FaEye className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                  <FaEye className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                  <FaEye className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Bookings