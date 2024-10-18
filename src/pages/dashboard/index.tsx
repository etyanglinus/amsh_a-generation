"use client";

import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard: React.FC = (props) => {
  const [lineData, setLineData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [amount, setAmount] = useState<number>(0); // State for the deposit amount
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null); // State for selected savings plan

  const router = useRouter();
  const token = Cookies.get("token");

  // Check if the token exists, redirect if not
  useEffect(() => {
    if (!token) {
      router.push("/signin"); // Redirect to login if no token
    }
  }, [token, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // Ensure token is available before fetching

      try {
        // Fetch line chart data
        const lineChartResponse = await axios.get(
          "https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/uid/1",
          {
            
          }
        );

        const data = lineChartResponse.data;
        setLineData({
          labels: data.map((entry: any) => entry.date),
          datasets: [
            {
              label: "Savings Progress",
              data: data.map((entry: any) => entry.amount),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });

        // Fetch latest transactions
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        setError("Failed to fetch data.");
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    // Load selected savings plan from local storage
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(JSON.parse(plan));
    }
  }, []);

  // Function to handle filtering
  const handleFilter = async () => {
    if (!token) return; // Ensure token is available before fetching

    try {
      const filterResponse = await axios.get(
        `https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/all?userId=1&startDate=${startDate}&endDate=${endDate}&type=${transactionType}`,
        {
          
        }
      );
      setFilteredTransactions(filterResponse.data);
    } catch (error) {
      console.error("Error fetching filtered transactions:", error);
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    if (!token) return; // Ensure token is available before fetching

    try {
      const searchResponse = await axios.get(
        `https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/all?userId=1&startDate=${startDate}&endDate=${endDate}&search=${searchQuery}`,
        {
         
        }
      );
      setFilteredTransactions(searchResponse.data);
    } catch (error) {
      console.error("Error searching transactions:", error);
    }
  };

  const handleAddFunds = async () => {
  if (amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const token = Cookies.get("token"); // Retrieve token from cookies

  if (!token) {
    alert("You are not logged in.");
    return;
  }

  console.log("Attempting to add funds:", amount);

  try {
    const response = await axios.post(
      "https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/deposit",
      { userId: 1, phoneNumber: "0794649026", amount: amount },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = response.data;
    console.log("Response from API:", responseData);

    if (responseData.statusCode === 200 && responseData.data.transaction.redirect_url) {
      alert("Click OK to deposit");
      setAmount(0); // Reset the amount after successful deposit
      
      // Open the redirect URL in a new tab
      window.open(responseData.data.transaction.redirect_url, '_blank');
    } else {
      alert("Transaction successful, but no redirect URL found.");
    }
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(`Failed to add funds: ${error.response?.data?.message || error.message}`);
    } else {
      alert("Failed to add funds: ${error}");
    }
    console.error("Error adding funds:", error);
  }
};



   const donutData = {
    labels: selectedPlan ? [selectedPlan.title, "Goal Remaining"] : ["No Plan Selected"],
    datasets: [
      {
        label: "Savings Breakdown",
        data: selectedPlan ? [selectedPlan.current, selectedPlan.goal - selectedPlan.current] : [0, 1],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* First Row */}
        <div className="first-row">
          <div className="left-section">
            <h2>Hello to Amsha Generation</h2>
          </div>
          <div className="right-section">
            <input
              type="number"
              value={amount} // Use the amount state variable
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
            <button onClick={handleAddFunds}>Add Funds</button>
          </div>
        </div>

        {/* Second Row - Charts */}
        <div className="second-row">
          <div className="chart-container">
            {lineData ? (
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p>Loading line chart...</p>
            )}
          </div>
          <div className="chart-container">
            <Doughnut
              data={donutData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="chart-container">
            <Bar
              data={{
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                  {
                    label: "Monthly Savings",
                    data: [500, 700, 800, 600, 900],
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Third Row - Transactions Table */}
        <div className="third-row">
          <div className="filter-section">
            <h3>Filter Transactions</h3>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <input
              type="text"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              placeholder="Transaction Type"
            />
            <button onClick={handleFilter}>Filter</button>

            <h3>Search Transactions</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="transaction-table">
            <h3>Transactions</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
            {/* Inline Styles */}
            <style jsx>{`
     .dashboard-container {
      padding: 20px;
      background-color: #f9f9f9; /* Light background for contrast */
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-left: 200px; /* Add left margin for the container */
      font-family: sans-serif; /* Apply sans-serif font */
    }
    
    .first-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .left-section {
      flex: 1;
    }
    
    .right-section {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
    
    .right-section input {
      margin-right: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .right-section button {
      padding: 10px 15px;
      background-color: #4caf50; /* Green button */
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .right-section button:hover {
      background-color: #45a049; /* Darker green on hover */
    }
    
    .second-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .chart-container {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .transaction-table {
      margin-top: 20px;
    }
    
    .transaction-table table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .transaction-table th,
    .transaction-table td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    
    .transaction-table th {
      background-color: #f2f2f2; /* Light gray background for header */
    }
    
    .filter-section {
      margin-bottom: 20px;
    }
    
    .filter-section input {
      margin-right: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .filter-section button {
      padding: 10px 15px;
      background-color: #007bff; /* Blue button */
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .filter-section button:hover {
      background-color: #0056b3; /* Darker blue on hover */
    }
    
        }
        
      `}</style>
    </DashboardLayout>
  );
};

export default Dashboard;
