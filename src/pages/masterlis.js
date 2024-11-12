import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './TableComponent';
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig/config';

const MasterList = () => {
  const [activeTab, setActiveTab] = useState('country');
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const navigate = useNavigate()

  const tabs = [
    { key: 'country', label: 'Country' },
    { key: 'state', label: 'State' },
    { key: 'destination', label: 'Destination' },
    { key: 'hotel', label: 'Hotel' },
    { key: 'customer', label: 'Customer' },
    { key: 'vendor', label: 'Vendor' },
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
        { header: 'State Name', accessor: 'stateName' },
        { header: 'Country Name', accessor: 'countryName' },
        { header: 'Code', accessor: 'code' },
        { header: 'Status', accessor: 'status' },
      ],
      data: stateData,
    },
    destination: {
      columns: [
        { header: 'Destination Name', accessor: 'destinationName' },
        { header: 'State Name', accessor: 'stateName' },
        { header: 'Country Name', accessor: 'countryName' },
        { header: 'Attractions', accessor: 'keyofattractions' },
        { header: 'Status', accessor: 'status' },
      ],
      data: destinationData,
    },
    hotel: {
      columns: [
        { header: 'Hotel Name', accessor: 'hname' },
        { header: 'Country', accessor: 'countryName' },
        { header: 'State', accessor: 'stateName' },
        { header: 'Destination', accessor: 'destinationName' },
        { header: 'Address', accessor: 'haddress' },
        { header: 'Pin Code', accessor: 'hpincode' },
        { header: 'Status', accessor: 'status' },
      ],
      data: hotelData,
    },
    customer: {
      columns: [
        { header: 'First Name', accessor: 'firstName' },
        { header: 'Last Name', accessor: 'lastName' },
        { header: 'E-mail', accessor: 'email' },
        { header: 'Lead Source', accessor: 'leadSource' }
      ],
      data: customerData,
    },
    vendor: {
      columns: [
        { header: 'Name', accessor: 'vendorName' },
        { header: 'E-Mail', accessor: 'vendorEmail' },
        { header: 'Contact', accessor: 'vendorContactNo' },
        { header: 'Lead Source', accessor: 'vendorAddress' }
      ],
      data: vendorData,
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
        const sortedData = formattedData.sort((a, b) => {
          return a.countryName.localeCompare(b.countryName);  // Replace 'name' with the key to sort by
        });
        setCountryData(sortedData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    const fetchStateData = async () => {
      try {
        const response = await axios.get(`${api.baseUrl}/state/get`);
        const formattedData = response.data.map((state) => ({
          ...state,
          status: state.status ? 'Active' : 'Inactive',
          countryName: state.country.countryName
        }));
        const sortedData = formattedData.sort((a, b) => {
          return a.stateName.localeCompare(b.stateName);  // Replace 'name' with the key to sort by
        });
        setStateData(sortedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    const fetchDestinationData = async () => {
      try {
        const response = await axios.get(`${api.baseUrl}/destination/getall`);
        const formattedData = response.data.map((item) => ({
          ...item,
          status: item.status ? 'Active' : 'Inactive',
          countryName: item.country.countryName,
          stateName: item.state.stateName
        }));
        const sortedData = formattedData.sort((a, b) => {
          return a.destinationName.localeCompare(b.destinationName);  // Replace 'name' with the key to sort by
        });
        setDestinationData(sortedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`${api.baseUrl}/hotel/getAll`);
        const formattedData = response.data.map((item) => ({
          ...item,
          status: item.status ? 'Active' : 'Inactive',
          countryName: item.country.countryName,
          stateName: item.state.stateName,
          destinationName: item.destination.destinationName,
        }));
        const sortedData = formattedData.sort((a, b) => {
          return a.hname.localeCompare(b.hname);  // Replace 'name' with the key to 
        });
        setHotelData(sortedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }

    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${api.baseUrl}/customer/getall`);
        const formattedData = response.data.map((item) => ({
          ...item,
          status: item.status ? 'Active' : 'Inactive',
          firstName: item.fName,
          lastName: item.lName,
          email: item.emailId,
          leadSource: item.leadSource,
        }));
        const sortedData = formattedData.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);  // Replace 'name' with the key to 
        });
        setCustomerData(sortedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }

    const fetchVendorData = async () => {
      try {
        const response = await axios.get(`${api.baseUrl}/vendor/getAll`);
        // const formattedData = response.data.map((item) => ({
        //   ...item,
        //   status: item.status ? 'Active' : 'Inactive',
        //   firstName: item.fName,
        //   lastName: item.lName,
        //   email: item.emailId,
        //   leadSource: item.leadSource,
        // }));
        const sortedData = response.data.sort((a, b) => {
          return a.vendorName.localeCompare(b.vendorName);  // Replace 'name' with the key to 
        });
        setVendorData(sortedData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }



    if (activeTab === 'country') {
      fetchCountryData();
    } else if (activeTab === 'state') {
      fetchStateData();
    } else if (activeTab === 'destination') {
      fetchDestinationData();
    } else if (activeTab === 'hotel') {
      fetchHotelData();
    } else if (activeTab === 'customer') {
      fetchCustomerData()
    } else if (activeTab === 'vendor') {
      fetchVendorData()
    }
  }, [activeTab]);

  return (
    <div className="h-24 mb-10 w-full p-4 bg-gray-50">
      <div className="pb-1">
        <h2 className="text-2xl p-1">Master List</h2>
      </div>
      <div className="relative inline-block w-full  border-b">
        <ul className="flex gap-4 py-0 border-gray-300">
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
          <div className="flex flex-wrap gap-3">
            <button className="bg-gray-200 text-black px-4 py-2 rounded">Archive</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Hot</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Warm</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Cold</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">No Status</button>
          </div>
        </div>
        <hr />
        <div className='w-full  overflow-auto'>
          <Table
            columns={tableData[activeTab].columns}
            data={tableData[activeTab].data}
          />
        </div>
      </div>
    </div>
  );
};

export default MasterList;
