import React, { useEffect, useState } from 'react'
import api from '../apiConfig/config';
import axios from 'axios';

const CountryMaster = () => {

  const [countryDetails, setCountryDetails] = useState([])

  const fetchData = async () => {
    await axios.get(`${api.baseUrl}/country/get`)
      .then(response => {
        setCountryDetails(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchData()
    console.log("fi")
  }, []);

  return (
    < table >
      <thead>
        <tr>
          <th><input type="checkbox" id='teamsListChecked' /></th>
          <th>Country</th>
          <th>Code</th>
          {/* <th>Phone</th> */}
          {/* <th>IP Address</th> */}
          <th>Staus</th>
          <th>Image</th>
          <th>Actions</th>
          {/* <th>Allow Authorization</th> */}
        </tr>
      </thead>
      <tbody className='myteam-table'>
        {/* {Array.isArray(countryDetails) && countryDetails.map((option) => (
          <tr>
            <td></td>
            <td className='myteams-email'>
              {option.countryName}</td>
            <td>{option.code}</td>
            <td>{option.status}</td>
            <td><img src='' /></td>

            <td><button>edit</button> <button>delete</button></td>
          </tr>
        ))} */}
      </tbody>
    </table >
  )
}

export default CountryMaster