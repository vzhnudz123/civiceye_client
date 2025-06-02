import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Complaint = () => {
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(null); // for zoomed image

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/civiceye/complaintview');
      setData(response.data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/civiceye/status/${id}`, { status });
      alert("Status updated successfully!");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Status update failed.");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold text-center mb-8">Complaints Overview</h2>

      {/* Modal for image zoom */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={modalImage}
              alt="Zoomed"
              className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-60 rounded-full px-3 py-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Uploader</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">File</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((complaint, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{complaint.description}</td>
                <td className="px-6 py-4">{complaint.location}</td>
                <td className="px-6 py-4">{complaint.userId?.name || "N/A"}</td>
                <td className="px-6 py-4">{complaint.complainttype || "N/A"}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === 'Resolved'
                      ? 'bg-green-100 text-green-700'
                      : complaint.status === 'Rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4">
  {complaint.file ? (
    /\.(mp4|webm|ogg)$/i.test(complaint.file) ? (
      <video
        controls
        className="w-24 h-16 rounded border"
        src={`http://localhost:8000/uploads/${complaint.file}`}
      />
    ) : (
      <img
        onClick={() => setModalImage(`http://localhost:8000/uploads/${complaint.file}`)}
        src={`http://localhost:8000/uploads/${complaint.file}`}
        alt="evidence"
        className="w-16 h-16 rounded object-cover border cursor-pointer hover:scale-105 transition-transform duration-200"
      />
    )
  ) : (
    <span className="text-gray-400 italic">No file</span>
  )}
</td>

                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(complaint._id, 'Rejected')}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(complaint._id, 'Resolved')}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
