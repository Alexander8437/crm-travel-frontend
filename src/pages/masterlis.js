import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './TableComponent';
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig/config';

const MasterList = () => {
  const [activeTab, setActiveTab] = useState('country');
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const navigate = useNavigate()

  const tabs = [
    { key: 'country', label: 'Country' },
    { key: 'state', label: 'State' },
    { key: 'destination', label: 'Destination' },
    { key: 'hotel', label: 'Hotel' },
  ];

  const tableData = {
    country: {
      columns: [
        { header: 'Country Name', accessor: 'countryName' },
        { header: 'Code', accessor: 'code' },
        { header: 'Phone Code', accessor: 'pCode' },
        { header: 'Status', accessor: 'status' },
      ],
      data: countryData,
    },
    state: {
      columns: [
        { header: 'Country Name', accessor: 'countryName' },
        { header: 'State Name', accessor: 'stateName' },
        { header: 'Code', accessor: 'code' },
        { header: 'Status', accessor: 'status' },
      ],
      data: stateData,
    },
    destination: {
      columns: [
        { header: 'Destination', accessor: 'name' },
        { header: 'Attractions', accessor: 'attractions' },
      ],
      data: [
        { name: 'Paris', attractions: 'Eiffel Tower, Louvre' },
        { name: 'Rome', attractions: 'Colosseum, Vatican City' },
      ],
    },
    hotel: {
      columns: [
        { header: 'Hotel Name', accessor: 'name' },
        { header: 'Location', accessor: 'location' },
      ],
      data: [
        { name: 'The Ritz', location: 'Paris' },
        { name: 'The Plaza', location: 'New York' },
      ],
    },
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`${api.baseUrl}/country/get`);
        const formattedData = response.data.map((country) => ({
          ...country,
          status: country.status ? 'Active' : 'Inactive'
        }));
        setCountryData(formattedData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    const fetchStateData = async () => {
      try {
        const response = await axios.get(
          'https://updated-crm-travel-server-production.up.railway.app/Motherson/crm/v1/state/get'
        );
        const formattedData = response.data.map((state) => ({
          ...state,
          status: state.status ? 'Active' : 'Inactive'
        }));
        setStateData(formattedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    if (activeTab === 'country') {
      fetchCountryData();
    } else if (activeTab === 'state') {
      fetchStateData();
    } else if (activeTab === 'hotel')
      navigate('/home/master-list/hotel')
  }, [activeTab]);

  return (
    <div className="h-24 w-full ml-[100px]">
      <div className="pb-1">
        <h2 className="text-2xl p-1">Master List</h2>
      </div>
      <div className="relative inline-block">
        <ul className="flex gap-4 py-2 border-b border-gray-300">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              className={`cursor-pointer text-sm text-gray-700 border-b-2 ${activeTab === tab.key ? 'border-red-700' : 'border-transparent'
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Select Users</option>
            </select>
            <button className="bg-gray-200 text-black px-4 py-2 rounded">Assign</button>
          </div>
          <div className="flex items-center space-x-2">
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
        {
          <Table
            columns={tableData[activeTab].columns}
            data={tableData[activeTab].data}
          />
        }
      </div>
    </div>
  );
};

export default MasterList;
