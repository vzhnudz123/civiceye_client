import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    number: '',
    email: '',
    dob: '',
    state: '',
    address: '',
    idProof: '',
    idNumber: '',
  });

  const token = localStorage.getItem('token');

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://civiceye-150o.onrender.com/civiceye/userlogin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Safely set profile data to ensure no undefined values
        const data = response.data[0] || {};  // fallback to empty object if no data
        setProfile({
          name: data.name || '',
          number: data.number || '',
          email: data.email || '',
          dob: data.dob || '',
          state: data.state || '',
          address: data.address || '',
          idProof: data.idProof || '',
          idNumber: data.idNumber || '',
        });
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [token]);
  

  // Handle form input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://civiceye-150o.onrender.com/civiceye/updateprofile', profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-2xl relative">
        <Link to="/home" className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 transition-all text-4xl">
          <IoArrowBackCircle />
        </Link>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Civic<span className="text-blue-600">EYE</span>
        </h1>
        <p className="text-center text-gray-500 mb-10">Update your profile information</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="number"
                  value={profile.number}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Select State</option>
                  <option>Kerala</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  rows="3"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ID Proof</label>
                <select
                  name="idProof"
                  value={profile.idProof}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Select ID Proof</option>
                  <option>Aadhar</option>
                  <option>Passport</option>
                  <option>Driving License</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={profile.idNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-3 rounded-lg shadow-lg transition-all duration-200"
            >
              UPDATE PROFILE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
