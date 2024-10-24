import React, { useEffect, useState } from "react";
import Select from "react-select";
import api from "../apiConfig/config";
import axios from "axios";

// const roleOptions = [
//   { value: "admin", label: "Admin" },
//   { value: "user", label: "User" },
// ];

const NewMember = ({ isOpen, onClose }) => {
  const [role, setRole] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)


  useEffect(() => {
    axios.get(`${api.baseUrl}/rolesPermission`,
      {
        headers: {
          "content-type": "text/html"
        }
      }
    )
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.name // or any display label you want
        }));
        setRole(formattedOptions);
        console.log()
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  }
  )

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedOption) => {
    // setFormData((prevData) => ({
    //   ...prevData,
    //   role: selectedOption,
    // }));
    setSelectedOption(selectedOption)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      "username": formData.username,
      "email": formData.email,
      "password": formData.password,
      "role": [selectedOption.label]
    }

    await axios.post(`${api.baseUrl}/signup`, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      alert(response.data);
      setSelectedOption(null);
      setFormData({
        username: "",
        email: "",
        password: "",
      })
    })
      .catch(error => console.log(error));
  }



  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg z-50 transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[850px]"} mt-4 sm:mt-8 md:mt-12 lg:w-[800px] sm:w-[400px] md:w-[500px]`}
    >
      {/* "X" button positioned outside the form box */}
      <button className="absolute top-[12px] left-[-22px] font-semibold text-white text-sm bg-red-700 square px-3  py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700" onClick={() => onClose(true)}>
        X
      </button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Member</h2>
      </div>
      {/* Line below the title with shadow */}
      {/* <div className="border-b border-gray-300 shadow-sm"></div> */}

      <form className="p-4">
        <div className="mb-4">
          <h3 className="bg-red-700 text-white p-2 rounded text-sm sm:text-base">
            Basic Information
          </h3>
        </div>

        {/* Role and Username fields in one row */}
        <div className="flex flex-wrap sm:flex-nowrap -mx-1 sm:-mx-2 mb-3 sm:mb-4">
          <div className="w-full sm:w-1/2 px-1 sm:px-2 mb-3 sm:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2" htmlFor="role">
              Role <span className="text-red-700">*</span>
            </label>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              options={role}
              className="w-full"
              placeholder="Select..."
            />
          </div>

          <div className="w-full sm:w-1/2 px-1 sm:px-2">
            <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2" htmlFor="username">
              Username <span className="text-red-700">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your Team Member Username"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Email and Password fields in one row */}
        <div className="flex flex-wrap sm:flex-nowrap -mx-1 sm:-mx-2 mb-3 sm:mb-4">
          <div className="w-full sm:w-1/2 px-1 sm:px-2 mb-3 sm:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2" htmlFor="email">
              Email <span className="text-red-700">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Team Member Email Id"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="w-full sm:w-1/2 px-1 sm:px-2">
            <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2" htmlFor="password">
              Password <span className="text-red-700">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Type Strong Password For Your Team Member"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </form>

      {/* Line with shadow above the buttons */}
      <div className="flex justify-between items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12">
        <div className="flex justify-start space-x-4">
          <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow"
            onClick={handleSubmit}>
            Submit
          </button>
          <button
            type="button"
            className="bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

  );
};

export default NewMember;
