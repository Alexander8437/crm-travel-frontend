import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import api from '../apiConfig/config';
import Select, { components } from 'react-select';



const HotelMasterAddRoom = () => {
  // const [roomsMaster, setRoomsMaster] = useState([])
  // const [selectedRoomsMaster, setSelectedRoomsMaster] = useState([])
  // const [selectedRoomsType, setSelectedRoomsType] = useState([])
  // const [allRoomAndType, setAllRoomAndType] = useState([])
  // const [showRoom, setShowRoom] = useState(false)
  // const [allOptions, setAllOptions] = useState([]);


  const location = useLocation(); // Unix timestamp in milliseconds
  const item = location.state?.item;

  // const roomTypes = [{ value: 1, label: 'Twin' },
  // { value: 2, label: 'Full / Double' },
  // { value: 3, label: 'Queen' },
  // { value: 4, label: 'King' },
  // { value: 5, label: 'Single' },
  // { value: 6, label: 'Full XL' }]

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

  // const handleCheckboxChange = (roomTypeId, optionId, checked) => {
  //   setAllOptions(prevOptions =>
  //     prevOptions.map(option => {
  //       if (option.roomTypeId === roomTypeId && option.id === optionId) {
  //         return { ...option, selected: checked };
  //       }
  //       return option;
  //     })
  //   );
  // };

  // const handleRoomMasterChange = (selectedOption) => {
  //   setSelectedRoomsMaster(selectedOption)
  // }

  // const handleRoomsAndType = () => {
  //   setShowRoom(!showRoom)
  // }

  // const handleRoomTypeChange = (selectedOption) => {
  //   setSelectedRoomsType(selectedOption)
  // }

  useEffect(() => {
    axios.get(`${api.baseUrl}/rooms/getAll`)
      .then(response => {
        const formattedOptions = response.data.map((item) => ({
          value: item.id,
          label: item.roomname
        }))
        const sortedData = formattedOptions.sort((a, b) => a.label.localeCompare(b.label));
        setRoomOptions(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    // console.log(roomOptions)
  }, []);

  const bedTypes = [
    { value: 1, label: 'Twin' },
    { value: 2, label: 'Full / Double' },
    { value: 3, label: 'Queen' },
    { value: 4, label: 'King' },
    { value: 5, label: 'Single' },
    { value: 6, label: 'Full XL' }
  ];

  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedBedsByRoom, setSelectedBedsByRoom] = useState({});

  // useEffect(() => {
  //   axios.get('/api/room-options')
  //     .then(response => setRoomOptions(response.data))
  //     .catch(error => console.error("Error fetching room options:", error));
  // }, []);

  const handleRoomTypeChange = (selectedOptions) => {
    setSelectedRoomTypes(selectedOptions);

    const updatedSelectedBeds = { ...selectedBedsByRoom };
    selectedOptions.forEach(room => {
      if (!updatedSelectedBeds[room.value]) {
        updatedSelectedBeds[room.value] = [];
      }
    });
    setSelectedBedsByRoom(updatedSelectedBeds);
  };

  const handleBedCheckboxChange = (roomTypeId, bedId, isChecked) => {
    setSelectedBedsByRoom(prevSelectedBeds => ({
      ...prevSelectedBeds,
      [roomTypeId]: isChecked
        ? [...prevSelectedBeds[roomTypeId], { bedId, image: null, maxPersons: '' }]
        : prevSelectedBeds[roomTypeId].filter(bed => bed.bedId !== bedId)
    }));
  };

  const handleInputChange = (roomTypeId, bedId, field, value) => {
    setSelectedBedsByRoom(prevSelectedBeds => ({
      ...prevSelectedBeds,
      [roomTypeId]: prevSelectedBeds[roomTypeId].map(bed =>
        bed.bedId === bedId ? { ...bed, [field]: value } : bed
      )
    }));
  };
  const handleImageChange = (roomTypeId, bedId, file) => {
    setSelectedBedsByRoom(prevSelectedBeds => ({
      ...prevSelectedBeds,
      [roomTypeId]: prevSelectedBeds[roomTypeId].map(bed =>
        bed.bedId === bedId ? { ...bed, image: file } : bed
      )
    }));
  };

  const handleSave = () => {
    const payload = selectedRoomTypes.map(room => ({
      roomTypeId: room.value,
      bedTypes: selectedBedsByRoom[room.value]
    }));

    // axios.post('/api/save-room-selections', payload)
    //   .then(() => alert('Selections saved successfully!'))
    //   .catch(error => console.error("Error saving selections:", error));

    console.log(roomOptions)
    console.log(bedTypes)
    console.log(payload)
  };


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

      {/* <div className="bg-white p-4 rounded shadow mt-4">
        <div className="flex flex-col gap-2">
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
        </div>
        <div className='flex justify-center mt-4'>
          <button className='bg-red-600 px-2 py-1 rounded-sm border-2 text-white border-transparent hover:bg-white hover:text-red-600 hover:border-red-400' onClick={handleRoomsAndType}>{showRoom ? 'Hide' : 'Show Rooms'}</button>
        </div>
      </div> */}
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


      {/* {showRoom && selectedRoomsMaster.length !== 0 && (
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
          </div>
        </div>
      )} */}
      {/* {selectedRoomsMaster.map(roomType => (
        <div key={roomType.value} className="mb-4">
          <h3 className="font-semibold">{roomType.label} Options</h3>
          <div className="flex flex-wrap gap-2">
            {roomTypes
              .filter(option => option.value === roomType.value)
              .map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={option.selected || false}
                    onChange={(e) => handleCheckboxChange(roomType.value, option.id, e.target.checked)}
                    className="mr-2"
                  />
                  {option.name}
                </label>
              ))}
          </div>
        </div>
      ))} */}
      {/* {selectedRoomTypes.map(roomType => (
        <div key={roomType.value} className="mb-4">
          <h3 className="font-semibold">{roomType.label} Bed Types</h3>
          <div className="flex flex-wrap gap-2">
            {bedTypes.map(bed => (
              <label key={bed.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBedsByRoom[roomType.value]?.includes(bed.value) || false}
                  onChange={(e) => handleBedCheckboxChange(roomType.value, bed.value, e.target.checked)}
                  className="mr-2"
                />
                {bed.label}
              </label>
            ))}
          </div>
        </div>
      ))} */}
      <div className="p-4">
        <Select
          options={roomOptions}
          isMulti
          onChange={handleRoomTypeChange}
          placeholder="Select Room Types"
          className="mb-4"
        />

        {selectedRoomTypes.map(roomType => (
          <div key={roomType.value} className="mb-4">
            <h3 className="font-semibold">{roomType.label} Bed Types</h3>
            <div className="flex flex-wrap gap-2">
              {bedTypes.map(bed => {
                const isSelected = selectedBedsByRoom[roomType.value]?.find(b => b.bedId === bed.value);
                return (
                  <div key={bed.value} className="flex border p-2 rounded mb-2 w-full gap-5">
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={!!isSelected}
                        onChange={(e) => handleBedCheckboxChange(roomType.value, bed.value, e.target.checked)}
                        className="mr-2"
                      />
                      {bed.label}
                    </label>

                    {isSelected && (
                      <div className="flex justify-between gap-2">
                        <input
                          type="number"
                          placeholder="Maximum Persons"
                          value={isSelected.maxPersons}
                          onChange={(e) => handleInputChange(roomType.value, bed.value, 'maxPersons', e.target.value)}
                          className="p-2 border rounded"
                        />
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(roomType.value, bed.value, e.target.files[0])}
                          className="p-2 border rounded"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>


    </div>
  )
}

export default HotelMasterAddRoom