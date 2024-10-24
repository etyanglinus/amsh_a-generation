"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/uid/35"
        );
        
        // Handle successful response
        if (response.data.statusCode === 200) {
          setTransactions(response.data.data.transaction);
          setFilteredTransactions(response.data.data.transaction);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      <h3>Transaction History</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Mode</th>
            <th>Amount (KES)</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td>{transaction.mode}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>{`
        .transactions-container {
          margin: 20px;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h3 {
          margin-bottom: 15px;
          font-size: 24px;
          font-weight: bold;
        }

        .transactions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transactions-table th,
        .transactions-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .transactions-table th {
          background-color: #f4f4f4;
        }

        .transactions-table tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default TransactionsTable;
