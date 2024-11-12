import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaFilter, FaSort, FaArrowsAltH, FaPlus } from "react-icons/fa";
import TableComponent from "./TableComponent";
import axios from "axios";
import api from "../apiConfig/config";

// The main dashboard component
const PackageDashboard = () => {
  const [isListViewSelected, setIsListViewSelected] = useState(false);

  return (
    <div
      className="myteams-container w-full h-full"
    // style={{ marginLeft: "100px" }}
    >
      <div className="flex flex-col md:flex-row justify-between h-full bg-gray-100 border-b border-gray-300 mb-5">
        <main className="bg-gray-100 flex-1 p-4">
          <PackageDashboardTab
            isListViewSelected={isListViewSelected}
            setIsListViewSelected={setIsListViewSelected}
          />

          {/* Conditional Rendering of Views */}
          {isListViewSelected ? <ListView /> : <KanbanBoard />}
        </main>
      </div>
    </div>
  );
};

// Kanban Board Component
const KanbanBoard = () => (
  <>
    {/* Task Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md">
        <p className="text-gray-600 font-bold">Confirmed</p>
        <p className="text-lg">7 Tasks 0/0</p>
      </div>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md">
        <p className="text-gray-600 font-bold">In Progress</p>
        <p className="text-lg">5 Tasks 0/0</p>
      </div>
      <div className="bg-pink-100 border-l-4 border-pink-500 p-4 rounded-md">
        <p className="text-gray-600 font-bold">Needs Approval</p>
        <p className="text-lg">2 Tasks 0/0</p>
      </div>
      <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md">
        <p className="text-gray-600 font-bold">Completed</p>
        <p className="text-lg">1 Tasks 0/0</p>
      </div>
    </div>

    {/* Tasks in scrollable columns */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      <ScrollableTaskColumn />
      <ScrollableTaskColumn />
      <ScrollableTaskColumn />
      <ScrollableTaskColumn />
    </div>
  </>
);

// List View 
const ListView = () => {
  const navigate = useNavigate();
  const [packageList, setPackageList] = useState([])
  const [packageThemeList, setPackageThemeList] = useState([])
  const [destination, setDestination] = useState([])
  const [packIti, setPackIti] = useState([])
  const [packItiDetail, setPackItiDetail] = useState([])
  const [hotelList, setHotelList] = useState([])

  const handleView = (option) => {
    const pack = packIti.filter(item => option.id === item.packid)
    option.itinary = pack
    let packDe = []
    for (let i = 0; i < pack.length; i++) {
      packDe.push(packItiDetail.map(item => item.packitid.id === item.id))
    }
    option.packItiDetail = packDe
    const hotels = hotelList.map()
    navigate(`/home/package-list/${option.id}`, { state: { option } })
  }

  const ViewTheme = (data) => {
    const arr = data.split(",").map(Number);  // Result: [1, 2, 3]packageTheme/getall
    let total = []
    for (let i = 0; i < arr.length; i++) {
      const filterlist = packageThemeList.filter(item => item.id === arr[i])
      total.push(filterlist[0])
    }
    return total.map(item => item.title).join(", ")
  }

  const ViewDestination = (view) => {
    let d = destination.filter(item => item.id === view)
    let k = d[0]
    return d.length === 0 ? '' : k.destinationName
  }

  useEffect(() => {
    axios.get(`${api.baseUrl}/packageitinerary/getAll`)
      .then((response) => {
        setPackIti(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${api.baseUrl}/packageitinerarydetails/getAll`)
      .then((response) => {
        setPackItiDetail(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${api.baseUrl}/packageTheme/getall`)
      .then((response) => {
        setPackageThemeList(response.data);
      })
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    axios.get(`${api.baseUrl}/hotel/getAll`)
      .then((response) => {
        setHotelList(response.data);
      })
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    axios.get(`${api.baseUrl}/destination/getall`)
      .then((response) => {
        setDestination(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get(`${api.baseUrl}/packages/getAll`)
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          return a.pkName.localeCompare(b.pkName);  // Replace 'name' with the key to sort by
        });
        setPackageList(sortedData);
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className='truncate border-collapse'>
          <th className="py-2 px-4 border"></th>
          <th className="py-2 px-4 border">Package Name</th>
          <th className="py-2 px-4 border">From</th>
          <th className="py-2 px-4 border">To</th>
          <th className="py-2 px-4 border">Package Category</th>
          <th className="py-2 px-4 border">Package Theme</th>
          <th className="py-2 px-4 border">Package Type</th>
          <th className="py-2 px-4 border">No. of Days</th>
          <th className="py-2 px-4 border">No. of Nights</th>
          <th className="py-2 px-4 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {packageList.map((option, index) => (
          <tr key={index} className="border-collapse text-center truncate">
            <td className="py-2 px-4 border">{index + 1}</td>
            <td className="py-2 px-4 border">{option.pkName}</td>
            <td className="py-2 px-4 border">{ViewDestination(option.fromCityId)}</td>
            <td className="py-2 px-4 border">{ViewDestination(option.toCityId)}</td>
            <td className="py-2 px-4 border">{option.pkCategory}</td>
            <td className="py-2 px-4 border">{ViewTheme(option.pkthem) ? ViewTheme(option.pkthem) : ""}</td>
            <td className="py-2 px-4 border">{option.packageType}</td>
            <td className="py-2 px-4 border">{option.days}</td>
            <td className="py-2 px-4 border">{option.nights}</td>
            <td className="py-2 px-4 border"><button onClick={() => handleView(option)}>Action</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

// Task Column Component
const TaskColumn = ({ title, taskCount, taskStatus }) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <h6 className="text-xl font-semibold">{title}</h6>
    <p className="text-gray-600">
      {taskCount} Tasks
      <br />
      {taskStatus}
    </p>
  </div>
);

// Scrollable Task Column Component
const ScrollableTaskColumn = () => (
  <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto">
    {/* Individual Tasks */}
    {Array.from({ length: 5 }, (_, idx) => (
      <div key={idx} className="mb-4">
        <p className="font-semibold">
          Gather feedback on the design and usability
        </p>
        <p className="text-sm text-gray-500">
          Project: Web Design - Landmark Developments
        </p>
        <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
          on hold
        </button>
        <div className="flex items-center mt-2">
          <a
            href="#"
            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            p
          </a>
          <p className="ml-2 text-sm text-gray-600">in 2 weeks</p>
        </div>
      </div>
    ))}
  </div>
);

// PackageDashboardTab Component
const PackageDashboardTab = ({ isListViewSelected, setIsListViewSelected }) => {
  const [workflowDropdown, setWorkflowDropdown] = useState(false);
  const [createTaskDropdown, setCreateTaskDropdown] = useState(false);
  const [plusDropdown, setPlusDropdown] = useState(false);
  const [towerDropdown, setTowerDropdown] = useState(false);
  const [arrowsDropdown, setArrowsDropdown] = useState(false);

  const workflowRef = useRef(null);
  const createTaskRef = useRef(null);
  const plusRef = useRef(null);
  const towerRef = useRef(null);
  const arrowsRef = useRef(null);

  const handleClickOutside = (event, setter, ref) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setter(false);
    }
  };

  // Handle clicks outside the workflow dropdown
  useEffect(() => {
    const handleClick = (event) =>
      handleClickOutside(event, setWorkflowDropdown, workflowRef);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [workflowRef]);

  // Handle clicks outside the create task dropdown
  useEffect(() => {
    const handleClick = (event) =>
      handleClickOutside(event, setCreateTaskDropdown, createTaskRef);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [createTaskRef]);

  // Handle clicks outside the plus dropdown
  useEffect(() => {
    const handleClick = (event) =>
      handleClickOutside(event, setPlusDropdown, plusRef);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [plusRef]);

  // Handle clicks outside the sort dropdown
  useEffect(() => {
    const handleClick = (event) =>
      handleClickOutside(event, setTowerDropdown, towerRef);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [towerRef]);

  // Handle clicks outside the arrows dropdown
  useEffect(() => {
    const handleClick = (event) =>
      handleClickOutside(event, setArrowsDropdown, arrowsRef);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [arrowsRef]);

  return (
    <>
      <div className="flex flex-col gap-3 justify-between items-center py-4 bg-white shadow-md px-6 rounded-md lg:flex-row sm:flex-col">
        <h2 className="text-xl font-bold">Tasks</h2>

        <div></div>

        <div className="flex items-center">
          <button
            className={`btn ${!isListViewSelected
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
              } py-2 px-4 rounded-md mr-2`}
            onClick={() => setIsListViewSelected(false)}
          >
            Kanban Board
          </button>
          <button
            className={`btn ${isListViewSelected
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
              } py-2 px-4 rounded-md`}
            onClick={() => setIsListViewSelected(true)}
          >
            List View
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative" ref={workflowRef}>
            <button
              className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-md flex items-center"
              onClick={() => setWorkflowDropdown(!workflowDropdown)}
            >
              Default Workflow <FaCaretDown className="ml-2" />
            </button>
            {workflowDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <a
                  href="#task1"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Default Workflow
                </a>
                <a
                  href="#task2"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Another Workflow
                </a>
              </div>
            )}
          </div>

          <div className="relative ml-2" ref={createTaskRef}>
            <button
              className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-md flex items-center"
              onClick={() => setCreateTaskDropdown(!createTaskDropdown)}
            >
              Create Task <FaCaretDown className="ml-2" />
            </button>
            {createTaskDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <a
                  href="#task1"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Create task
                </a>
                <a
                  href="#task2"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Create task from template
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Filter, Plus, Sort, and Arrow buttons */}
      <div className="flex md:flex- mt-3 justify-center md:justify-between items-center rounded-md bg-white p-3 border-b border-gray-300 mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 border border-gray-300 rounded mr-2"
          />
          <button className="bg-white border border-gray-300 rounded px-2 py-1">
            <FaFilter />
          </button>

          {/* Plus Button Dropdown */}
          <div className="relative" ref={plusRef}>
            <button
              className="bg-white border border-gray-300 rounded px-2 py-1"
              onClick={() => setPlusDropdown(!plusDropdown)}
            >
              <FaPlus className="ml-1" />
            </button>
            {plusDropdown && (
              <div className="absolute bg-white min-w-[160px] shadow-md z-10 mt-2 rounded border border-gray-300">
                {[
                  "Name",
                  "End Date",
                  "Start Date",
                  "Owner",
                  "Stage",
                  "Priority",
                  "Collaborators",
                  "Followers",
                  "Created",
                  "Edited Date",
                  "Assignee or Collaborated",
                  "Project",
                  "Group",
                  "Tags",
                  "Assignee",
                ].map((item, index) => (
                  <a
                    key={index}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    href="#"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>


        </div>
        <div className="flex">
          {/* Sort Button Dropdown */}
          <div className="relative" ref={towerRef}>
            <button
              className="bg-white border border-gray-300 rounded px-2 py-1"
              onClick={() => setTowerDropdown(!towerDropdown)}
            >
              <FaSort className="ml-1" />
            </button>
            {towerDropdown && (
              <div className="absolute bg-white min-w-[160px] shadow-md z-10 mt-2 rounded border border-gray-300">
                {["Name", "Due Date"].map((item, index) => (
                  <a
                    key={index}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    href="#"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Arrows Button Dropdown */}
          <div className="relative" ref={arrowsRef}>
            <button
              className="bg-white border border-gray-300 rounded px-2 py-1"
              onClick={() => setArrowsDropdown(!arrowsDropdown)}
            >
              <FaArrowsAltH className="ml-1" />
            </button>
            {arrowsDropdown && (
              <div className="absolute bg-white min-w-[160px] shadow-md z-10 mt-2 rounded border border-gray-300">
                {["Due Date", "Priority", "Owner"].map((item, index) => (
                  <a
                    key={index}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    href="#"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default PackageDashboard;
