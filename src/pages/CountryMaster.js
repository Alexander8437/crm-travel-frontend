import React, { useEffect, useState } from 'react'
import api from '../apiConfig/config';
import axios from 'axios';
import MasterList from '../components/MasterList';

const CountryMaster = () => {

  const [countryDetails, setCountryDetails] = useState([])

  useEffect(() => {
    axios.get(`${api.baseUrl}/country/get`)
      .then(response => {
        setCountryDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className='mt-0 ml-[120px] mr-4 w-full'>
        <MasterList />
        < table className='w-full border-2  text-center'>
          <thead>
            <tr className='max-w-fit'>
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
          <tbody className='myteam-table gap-4'>
            {Array.isArray(countryDetails) && countryDetails.map((option) => (
              <tr>
                <td></td>
                <td className='myteams-email'>
                  {option.countryName}</td>
                <td>{option.code}</td>
                <td>{option.status ? 'Active' : 'Inactive'}</td>
                <td><img src='' /></td>

                <td><button>edit</button> <button>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table >
      </div>
    </>
  )
}

export default CountryMaster