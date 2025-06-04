import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState({
    pending: 0,
    resolved: 0,
    rejected: 0,
  });

  // Fetch users (excluding admin)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://civiceye-150o.onrender.com/civiceye/adminview");
        const filteredUsers = response.data.view.filter((user) => user.role !== "admin");
        setUsers(filteredUsers);
        console.log("Users:", response.data);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch complaint data (for location chart)
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("https://civiceye-150o.onrender.com/civiceye/complaintview");
        setData(response.data.complaints);
        console.log("Complaints:", response.data.complaints);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComplaints();
  }, []);

  // Fetch monthly complaint data
  useEffect(() => {
    const fetchMonthlyComplaints = async () => {
      try {
        const response = await axios.get("https://civiceye-150o.onrender.com/civiceye/complaintpermonth");
        setMonthlyData(response.data);
        console.log("Monthly complaint data:", response.data);
      } catch (error) {
        console.error("Error fetching monthly complaints", error);
      }
    };
    fetchMonthlyComplaints();
  }, []);

  // Fetch complaint status counts
  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get("https://civiceye-150o.onrender.com/civiceye/statuscount");
        setCount(response.data);
        console.log("Status count:", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatusCounts();
  }, []);

  // Calculate this month's complaints
  const currentMonthCount =
    monthlyData.find((item) => {
      const [month, year] = item.month.split("-");
      const now = new Date();
      return parseInt(month) === now.getMonth() + 1 && parseInt(year) === now.getFullYear();
    })?.count || 0;

  // Prepare bar chart data
  const complaintPerMonthBarData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Complaints per Month",
        data: monthlyData.map((item) => item.count),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Count complaints per location for doughnut chart
  const locationCounts = {};
  data.forEach((complaint) => {
    const location = complaint.location || "Unknown";
    locationCounts[location] = (locationCounts[location] || 0) + 1;
  });

  const doughnutData = {
    labels: Object.keys(locationCounts),
    datasets: [
      {
        label: "Complaint counts",
        data: Object.values(locationCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(100, 255, 100, 0.2)",
          "rgba(200, 100, 255, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(100, 255, 100, 1)",
          "rgba(200, 100, 255, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8">
      <div>
        <h2>Welcome Admin</h2>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-8 justify-center text-center ms-[90px] mt-5">
        <div className="bg-white shadow-lg w-[200px] rounded text-[30px] p-4">
          <h3>This month</h3>
          <h4>{currentMonthCount}</h4>
        </div>
        <div className="bg-white shadow-lg rounded text-[30px] p-4 w-auto">
          <h3>Verified Cases</h3>
          <h4>{count.resolved}</h4>
        </div>
        <div className="bg-white shadow-lg w-[200px] rounded text-[30px] p-4">
          <h3>Pending</h3>
          <h4>{count.pending}</h4>
        </div>
        <div className="bg-white shadow-lg w-[200px] rounded text-[30px] p-4">
          <h3>Rejected</h3>
          <h4>{count.rejected}</h4>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 mt-12">
        <div className="w-full max-w-[500px]">
          <h2 className="text-xl font-semibold mb-4 text-center">Complaints Per Month</h2>
          <Bar data={complaintPerMonthBarData} options={options} />
        </div>

        <div className="w-full max-w-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-center">Complaints Per Location</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
