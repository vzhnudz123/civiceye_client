import React, { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { LuCctv } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircle } from "react-icons/io5";




export const Allmycomplaints = () => {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([]);

  const data = async () => {
    try {
      const token = localStorage.getItem('token')

      let response = await axios.get('http://localhost:8000/civiceye/usercomplaint', {
        headers: {
          Authorization: ` Bearer ${token}`
        }
      })
      setComplaints(response.data)
    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    data()

  }, [])

  const Deleteing = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8000/civiceye/userdelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      alert("delete is success")
      data();

    }
    catch (error) {
      console.log(error);
      alert('failed to delete complaint')

    }

  }


  // const logout=()=>{
  //   localStorage.clear()
  // }

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "profile") navigate('/profile');
    else if (value === 'settings') navigate('/settings');
    else if (value === 'logout') {
      logout();
      navigate('/homeguest');
    }
  };

  const logout = () => {
    localStorage.clear();
    localStorage.removeItem('token');
    navigate('/homeguest')
  }
  return (


    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
        <span className="text-2xl md:text-3xl font-bold flex items-center gap-1 text-gray-800">
          <LuCctv className="text-blue-600 text-3xl" />
          <span>Civic</span>
          <span className="text-blue-600">EYE</span>
        </span>


        <div className="flex items-center gap-6 text-gray-700 text-sm md:text-base">
          <Link to={'/home'}><h3 className="cursor-pointer hover:text-blue-600 transition">Home</h3></Link>
          <Link to={'/report'}><h3 className="cursor-pointer hover:text-blue-600 transition">My Complaints</h3></Link>
          <Link to={'/about'}><h3 className="cursor-pointer hover:text-blue-600 transition">About</h3></Link> 
          <Link to={'/contact'}><h3 className="cursor-pointer hover:text-blue-600 transition">Contact</h3></Link> 
          {/* <h3 className="cursor-pointer hover:text-blue-600 transition">Logout</h3> */}

          <div className="flex items-center gap-2">
            <FaUserAlt />
            <select defaultValue="default" onChange={handleSelect} className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200">
              <option value="default" disabled>options</option>
              <option value="profile">Profile</option>
              <option value="settings">Delete Account</option>
              <option value="logout">Logout</option>
            </select>

          </div>
        </div>
      </nav>

           <Link to={'/home'}> <div className='text-[40px] mt-4'>
        <IoArrowBackCircle />
      </div></Link>

      <div>

        <div className='text-center text-[20px] font-semibold'>
          <span className='text-center bg-white shadow-sm shadow-black rounded-sm p-2'>All My Complaints</span>
        </div>
        {/* Display Complaints */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.length > 0 ? (
            complaints.map((complaint, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2">issue:{complaint.description}</h4>
                <p className='text-gray-600'>Complain type:{complaint.complainttype}</p>
                <p className="text-gray-600">Location:{complaint.location}</p>
                <p className="text-sm text-gray-500 mt-2">Status: {complaint.status}</p>
                <button onClick={() => Deleteing(complaint._id)} className='bg-red-600 rounded p-2 mt-3'>delete</button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No complaints found.</p>
          )}
        </div>

        <div>

        </div>
      </div>
    </div>
  )
}
