import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import api from '../apiConfig/config';
import Select, { components } from 'react-select';



const HotelMasterAddRoom = () => {
  const [roomsMaster, setRoomsMaster] = useState([])
  const [selectedRoomsMaster, setSelectedRoomsMaster] = useState([])
  const [selectedRoomsType, setSelectedRoomsType] = useState([])
  const [allRoomAndType, setAllRoomAndType] = useState([])

  const location = useLocation(); // Unix timestamp in milliseconds
  const item = location.state?.item;

  const roomType = [{ value: 1, label: 'Twin' },
  { value: 2, label: 'Full / Double' },
  { value: 3, label: 'Queen' },
  { value: 4, label: 'King' },
  { value: 5, label: 'Single' },
  { value: 6, label: 'Full XL' }]

  // const [tab, setTab] = React.useState('profile');
  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{ marginRight: 10 }}
        />
        {props.label}
      </components.Option>
    );
  };

  const handleRoomMasterChange = (selectedOption) => {
    setSelectedRoomsMaster(selectedOption)
  }

  const handleRoomsAndType = (selectOption) => {
    setAllRoomAndType({
      ...allRoomAndType,
      selectedRoomsMaster
    })
  }

  const handleRoomTypeChange = (selectedOption) => {
    setSelectedRoomsType(selectedOption)
  }

  useEffect(() => {
    axios.get(`${api.baseUrl}/rooms/getAll`)
      .then(response => {
        const formattedOptions = response.data.map((item) => ({
          value: item.id,
          label: item.roomname
        }))
        const sortedData = formattedOptions.sort((a, b) => a.label.localeCompare(b.label));
        setRoomsMaster(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    console.log(roomsMaster)
  }, []);

  return (
    <div className="p-4 w-full ml-20  bg-gray-100 min-h-screen overflow-y-auto"
    // style={{ marginLeft: "100px" }}
    >
      <div className="bg-white p-4 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-2 md:mb-0">
            <p>Hotel Name : {item.hname}</p>
            <p>Address: {item.haddress}</p>
            <p>Pincode: {item.hpincode}</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Contact No : {item.hcontactnumber}</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Email ID : {item.hcontactemail}</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p>Active Since : {item.status ? 'Active' : 'Inactive'}</p>
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
        <div className="flex flex-col gap-2">
          {/* {roomsMaster.map((item) => (
            <button
              key={item.id}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md `}
            >
              {item.roomname}
            </button>
          ))} */}
          <label className='bg-gray-500 text-white p-2 rounded-sm'>Types of Rooms Avaliable</label>
          <Select
            className='w-full'
            value={selectedRoomsMaster}
            onChange={handleRoomMasterChange}
            options={roomsMaster}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
          />
          {/* <button className='bg-green-500 px-2 py-1 rounded-sm text-white border-2 border-transparent hover:bg-white hover:text-green-500 hover:border-green-500 '>Add</button> */}
        </div>
        <div className='flex justify-center mt-4'>
          <button className='bg-red-600 px-2 py-1 rounded-sm border-2 text-white border-transparent hover:bg-white hover:text-red-600 hover:border-red-400' onClick={handleRoomsAndType}>Add</button>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2 mt-4">
          <label className='bg-gray-500 text-white p-2 rounded-sm'>Types of Bed Avaliable</label>
          <Select
            className='w-full'
            value={selectedRoomsType}
            onChange={handleRoomTypeChange}
            options={roomType}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
          isClearable={true}
          />
        </div> */}


      {selectedRoomsMaster.length !== 0 && (
        <div className="bg-white p-4 rounded shadow mt-4">
          <div className="flex flex-col items-center mb-4">
            <h5 className='bg-gray-500 text-white p-2 rounded-sm w-full'>Types of Bed Avaliable</h5>
            <div className='w-full bg-slate-500 mt-2'>
              {selectedRoomsMaster.map((item) => (
                <div className='row-auto m-1 bg-white p-2 rounded-sm'>
                  <h4 className='font-semibold text-center'>{item.label}</h4>
                  <div className='w-full flex justify-between  gap-4'>
                    {roomType.map((room) => (
                      <div className='flex w-full gap-2 mt-1 items-center'>
                        <input type='checkbox' /> <p>{room.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded">View</button> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelMasterAddRoom