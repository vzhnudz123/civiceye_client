import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ComplaintForm = () => {

  const[complaintdata,setcomplaintdata]=useState({
    description:'',
    complainttype:'',
    location:'',
    file:null,

  });

  const handlechange=(event)=>{
    setcomplaintdata({...complaintdata,[event.target.name]:event.target.value})

  }

  const handlefilechange=(event)=>{
    setcomplaintdata({...complaintdata,file:event.target.files[0]})

  }

  const handlesubmit=async(event)=>{
    event.preventDefault();

    const formData=new FormData();
    formData.append('description',complaintdata.description);
    formData.append('complainttype',complaintdata.complainttype);
    formData.append('location',complaintdata.location);
    formData.append('file',complaintdata.file);
    
    try{
      const token=localStorage.getItem('token');

      const response=await axios.post(`https://civiceye-150o.onrender.com/civiceye/complaintregister`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
        
      });
      console.log(response.data);
      alert('complaint success register');

      setcomplaintdata({
        description: '',
        complainttype: '',
        location: '',
        file:null
      });
    }
    catch(error){
      console.log(error);
      alert("complaint not added")
      
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center mb-2">Report Issues Seamlessly</h2>
        <p className="text-center text-gray-600 mb-8">
          Our platform empowers users to submit complaints with ease, offering tools to upload multimedia for
          comprehensive issue reporting.
        </p>

        {/* Form */}
        <form onSubmit={handlesubmit} className="space-y-6">
          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <input
            onChange={handlechange}
              type="text"
              name='description'
              value={complaintdata.description}
              placeholder="Describe the issue"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Complaint Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Complaint type</label>
            <select
            name='complainttype'
            value={complaintdata.complainttype}
            onChange={handlechange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select type</option>
              <option>Pothole</option>
              <option>Water Leakage</option>
              <option>Garbage</option>
              <option>Street Light</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
            onChange={handlechange}
            name='location'
            value={complaintdata.location}
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Proof */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Proof</label>
            <input
            onChange={handlefilechange}
              type="file"
              name='file'
              className="w-full bg-blue-200 text-blue-900 rounded-md px-4 py-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
            >
              Submit
            </button>
            <Link to={"/"}><button
              type="button"
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-md"
            >
              Cancel
            </button></Link> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
