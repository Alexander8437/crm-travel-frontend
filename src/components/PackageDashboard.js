import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaCaretDown,
  FaFilter,
  FaSort,
  FaArrowsAltH,
  FaPlus,
} from "react-icons/fa";

const PackageDashboard = () => {
  // States for toggling dropdowns
  const [workflowDropdown, setWorkflowDropdown] = useState(false);
  const [createTaskDropdown, setCreateTaskDropdown] = useState(false);
  const [plusDropdown, setPlusDropdown] = useState(false);
  const [towerDropdown, setTowerDropdown] = useState(false);
  const [arrowsDropdown, setArrowsDropdown] = useState(false);

  // Refs for dropdowns
  const workflowRef = useRef(null);
  const createTaskRef = useRef(null);
  const plusRef = useRef(null);
  const towerRef = useRef(null);
  const arrowsRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (workflowRef.current && !workflowRef.current.contains(event.target)) {
        setWorkflowDropdown(false);
      }
      if (
        createTaskRef.current &&
        !createTaskRef.current.contains(event.target)
      ) {
        setCreateTaskDropdown(false);
      }
      if (plusRef.current && !plusRef.current.contains(event.target)) {
        setPlusDropdown(false);
      }
      if (towerRef.current && !towerRef.current.contains(event.target)) {
        setTowerDropdown(false);
      }
      if (arrowsRef.current && !arrowsRef.current.contains(event.target)) {
        setArrowsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="myteams-container mx-4 md:mx-8 lg:mx-6 mt-2">
      {/* Top Navigation Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-3 border-b border-gray-300 mb-5">
        <h2 className="text-lg font-semibold">Packages</h2>

        <div className="flex items-center mt-2 md:mt-0">
          {/* Kanban Board and List View */}
          <Link to="/home/packageDashboard">
            <button className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-800 mr-4">
              Kanban Board
            </button>
          </Link>
          <Link to="/home/packageDashboardList">
            <button className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-800 mr-4">
              List View
            </button>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {/* Default Workflow Dropdown */}
          <div className="relative flex items-center" ref={workflowRef}>
            <button
              className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-800 flex items-center"
              onClick={() => setWorkflowDropdown(!workflowDropdown)}
            >
              Default Workflow <FaCaretDown className="ml-1" />
            </button>
            {workflowDropdown && (
              <div className="absolute bg-white min-w-[160px] shadow-md z-10 mt-2 rounded border border-gray-300">
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#task1"
                >
                  Default Workflow
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#task2"
                >
                  + Create
                </a>
              </div>
            )}
          </div>

          {/* Create Task Button */}
          <div className="relative" ref={createTaskRef}>
            <button
              className="bg-blue-600 text-white rounded px-4 py-2"
              onClick={() => setCreateTaskDropdown(!createTaskDropdown)}
            >
              Create Task
            </button>
            {createTaskDropdown && (
              <div className="absolute bg-white min-w-[160px] shadow-md z-10 mt-2 rounded border border-gray-300">
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#newTask"
                >
                  New Task
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#editTask"
                >
                  Edit Task
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#deleteTask"
                >
                  Delete Task
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter, Plus, Sort, and Arrow buttons */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center bg-gray-100 p-3 border-b border-gray-300 mb-4">
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
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Name
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  End Date
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Start Date
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Owner
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Stage
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Priority
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Collaborators
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Followers
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Created
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Edited Date
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Assignee or Collaborated
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Project
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Group
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Tags
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Assignee
                </a>
              </div>
            )}
          </div>

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
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Name
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Due Date
                </a>
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
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Due Date
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Priority
                </a>
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Owner
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
      {/* Dashboard Task Boxes */}
      <div className="grid grid-cols-3 gap-4">
        {/* Task Box 1 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 3 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 4 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 5 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 6 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 7 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 8 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>

        {/* Task Box 9 */}
        <div className="bg-gray-100 shadow-md rounded-lg p-4">
          <p className="font-bold">
            Gather feedback on the design and usability
          </p>
          <p class="todoGrey mb-2">
            Project: Web Design - Landmark Developments
          </p>
          <button className="text-orange-400 bg-orange-200 rounded-full p-1">
            on hold
          </button>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white">
              P
            </div>
            <p className="ml-2">in 2 weeks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDashboard;
