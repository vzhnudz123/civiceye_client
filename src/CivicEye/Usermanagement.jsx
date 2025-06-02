import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Usermanagement = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // You can change this

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:8000/civiceye/adminview")
        const filteruser = response.data.view.filter(user => user.role !== 'admin')
        setUsers(filteruser)
      } catch (error) {
        console.log("Error fetching user data", error)
      }
    }

    fetchdata()
  }, [])

  // Calculate sliced data for current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="w-[900px] ms-[200px] mt-[100px]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-[1px]">
        <table className="w-full text-sm text-left h-auto">
          <thead className="text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Name:"</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">ID proof</th>
              <th className="px-6 py-3">Reports</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="border-[1px] border-gray-200">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.number}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">{user.idProof || "N/A"}</td>
                <td className="px-6 py-4">{user.complaintCount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 rounded border ${
              pageNum === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  )
}
