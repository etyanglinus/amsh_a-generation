// ... other imports
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/Layout';

<<<<<<< HEAD
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

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

const TransactionsPage = () => {
=======
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

const TransactionsPage = (props) => {
>>>>>>> 4cb8f74 (November 1)
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [transactionMessage, setTransactionMessage] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleDeposit = async () => {
    if (!user) return;

    try {
      const token = Cookies.get('token');
      const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          phoneNumber: user.phoneNumber,
          amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const redirectUrl = data?.data?.transaction?.redirect_url;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          setTransactionMessage('Transaction initiated successfully, but no redirect URL provided.');
        }
      } else {
        setTransactionMessage(data.message || 'Failed to initiate transaction');
      }
    } catch (error) {
      console.error('Transaction initiation error:', error);
      setTransactionMessage('An error occurred while initiating the transaction.');
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (!user) return <p>Please log in to view your transactions.</p>;

  return (
<<<<<<< HEAD
    <div style={{ margin: '0 200px', fontFamily: 'Arial, sans-serif' }}>
      {/* User Details and Deposit Card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phoneNumber}</p>
          <p>Account Balance: Ksh{user.accountBalance.toFixed(2)}</p>
        </div>

        {/* Deposit Card */}
        <div style={{
          width: '250px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Initiate Deposit</h2>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={handleDeposit}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Deposit
          </button>
          {transactionMessage && <p style={{ color: 'red', marginTop: '10px' }}>{transactionMessage}</p>}
        </div>
      </div>

      {/* Transactions Table */}
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Your Transactions</h2>
        {transactions.length > 0 ? (
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
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(transaction.createdAt).toLocaleString()}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.mode}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Ksh{transaction.amount.toFixed(2)}</td>
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
=======
    <DashboardLayout>
      <div style={{ margin: '0', fontFamily: 'Arial, sans-serif' }}> {/* Removed the 200px left margin */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>Account Balance: Ksh {user.accountBalance.toFixed(2)}</p>
          </div>

          <div style={{
            width: '250px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Deposit to Amsha Wallet</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            <button
              onClick={handleDeposit}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Deposit
            </button>
            {transactionMessage && <p style={{ color: 'red', marginTop: '10px' }}>{transactionMessage}</p>}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Your Transactions</h2>
          {transactions.length > 0 ? (
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
                {transactions.map((transaction) => (
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
>>>>>>> 4cb8f74 (November 1)
  );
};

export default TransactionsPage;
