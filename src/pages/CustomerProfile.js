import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import api from '../apiConfig/config';

const CustomerProfile = () => {
  const [tab, setTab] = React.useState('profile');
  const location = useLocation(); // Unix timestamp in milliseconds
  const option = location.state?.option;

  const [destination, setDestination] = useState([])
  const [itinerariesList, setItinerayList] = useState([])
  const [inclusion, setInclusion] = useState([])
  const [viewInclusion, setViewInclusion] = useState([])
  const [exclusion, setExclusion] = useState([])
  const [viewExclusion, setViewExclusion] = useState([])

  const ViewDestination = (view) => {
    let d = destination.filter(item => item.id === view)
    let k = d[0]
    return d.length === 0 ? '' : k.destinationName
  }

  // useEffect(() => {

  // })

  useEffect(() => {
    console.log(option)
    axios.get(`${api.baseUrl}/destination/getall`)
      .then((response) => {
        setDestination(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const viewInclusions = (ids) => {
    const incl = inclusion.filter(item => item.id === ids)
    return incl.length !== 0 ? incl[0].inclusionname : ''
  }

  const viewExclusions = (ids) => {
    const incl = exclusion.filter(item => item.id === ids)
    return incl.length !== 0 ? incl[0].exclusionname : ''
  }

  useEffect(() => {
    axios.get(`${api.baseUrl}/itinerarys/getAll`)
      .then((response) => {
        setItinerayList(response.data)
        // handleData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${api.baseUrl}/inclusion/getall`)
      .then((response) => {
        setInclusion(response.data)
        // handleInclusion(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${api.baseUrl}/exclusion/getall`)
      .then((response) => {
        setExclusion(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="p-4 w-full ml-0  bg-gray-100 mb-10"
    // style={{ marginLeft: "100px" }}
    >
      <div className="bg-white p-4 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-2 md:mb-0">
            <p>Package Name : {option.pkName}</p>
            <p>Package Categories : {option.pkCategory}</p>
            <p>Package Specifications : {option.pkSpecifications}</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>From City : {ViewDestination(option.fromCityId)}</p>
            <p>Destination City : {ViewDestination(option.toCityId)}</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Fixed Departure Destinations : {option.fixed_departure_destinations}</p>
            {/* <p>Fixed Departure Destinations : {option.fixed_departure_destinations}</p> */}
          </div>
          <div className="mb-2 md:mb-0">
            <p>{option.days} days/{option.nights} nights</p>
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
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Destination Covered</th>
              </tr>
            </thead>
            <tbody>
              {option.destinationCoveredIds.map((destination, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{ViewDestination(destination)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mt-4 md:mt-0">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Itineraries</th>
                {/* <th className="p-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {/* {option.itinary.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.daytitle}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-4">
        <div className="bg-white p-4 rounded shadow w-full">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Hotel</th>
              </tr>
            </thead>
            <tbody>
              {option.inclusionids.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{viewInclusions(item)}</td>
                  {/* <td className="p-2 text-center">
                    <button className="text-red-500"><FaTrash /></button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-4">
        <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Inclusion</th>
              </tr>
            </thead>
            <tbody>
              {option.inclusionids.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{viewInclusions(item)}</td>
                  {/* <td className="p-2 text-center">
                    <button className="text-red-500"><FaTrash /></button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mt-4 md:mt-0">
          {/* <p className="font-bold mb-4">Itineraries</p> */}
          {/* <div className='w-full'> */}
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Exclusion</th>
                {/* <th className="p-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {option.exclusionids.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{viewExclusions(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <ul>
            {itinerariesList.map(item =>
              <li className='p-2 border-b-2'>{item.daytitle}</li>
            )}
          </ul> */}
          {/* </div> */}

          {/* <table className="w-full">
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
          </table> */}
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
