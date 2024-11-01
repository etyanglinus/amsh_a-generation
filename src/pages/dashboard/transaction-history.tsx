"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/Layout'; // Adjust the path as necessary

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
  accountBalance: number;
}

interface Transaction {
  id: number;
  createdAt: string;
  mode: string;
  amount: number;
  transactionType: string;
}

const TransactionHistoryPage = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>(''); // State for filter type
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]); // State for filtered transactions

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      try {
        const response = await fetch(`https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/uid/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setTransactions(data.data.transaction);
          setFilteredTransactions(data.data.transaction); // Initialize filtered transactions
        } else {
          console.error(data.message || 'Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setFilterType(selectedType);

    // Filter transactions based on the selected type
    if (selectedType) {
      const filtered = transactions.filter(transaction => transaction.transactionType === selectedType);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // Show all transactions if no filter is selected
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (!user) return <p>Please log in to view your transactions.</p>;

  return (
    <DashboardLayout>
      <div style={{ margin: '0', fontFamily: 'Arial, sans-serif' }}> {/* Removed the 200px left margin */}
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Transaction History</h2>

        {/* Filter Options */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="transactionFilter" style={{ marginRight: '10px' }}>Filter by Type:</label>
          <select id="transactionFilter" value={filterType} onChange={handleFilterChange}>
            <option value="">All Transactions</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Transfer">Transfer</option>
            {/* Add more options based on your transaction types */}
          </select>
        </div>

        {/* Transactions Table */}
        <div>
          {filteredTransactions.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mode</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.id}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(transaction.createdAt).toLocaleString()}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.mode}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>Ksh {transaction.amount.toFixed(2)}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.transactionType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionHistoryPage;
