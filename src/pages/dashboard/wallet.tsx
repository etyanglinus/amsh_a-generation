"use client";

import DashboardLayout from '@/components/Dashboard/Layout';
import { useEffect, useState } from 'react';

interface WalletData {
  accountBalance: number;
  availableBalance: number;
  savings: number;
  savingsAmount: number;
}

const PiggyWalletPage = (props) => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [planId, setPlanId] = useState<number>(0);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      const storedUser = localStorage.getItem('userData');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://amsha-gen-96609f863a46.herokuapp.com/api/user/wallet/uid/${user.id}`, {
          method: 'GET',
        });
        const data = await response.json();

        if (response.ok) {
          setWalletData({
            accountBalance: data.data.user.accountBalance,
            availableBalance: data.data.user.availableBalance,
            savings: data.data.user.savings,
            savingsAmount: data.data.user.savingsAmount,
          });
        } else {
          setError(data.message || 'Failed to fetch wallet data');
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setError('An error occurred while fetching wallet data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleTransferToSavings = async () => {
    setTransferMessage(null);
    const storedUser = localStorage.getItem('userData');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await fetch(`http://amsha-gen-96609f863a46.herokuapp.com/api/savings/transferto`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          planId,
          amount: transferAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTransferMessage('Transfer to savings plan successful.');
        setWalletData((prev) => prev && { ...prev, availableBalance: prev.availableBalance - transferAmount });
      } else {
        setTransferMessage(data.message || 'Failed to transfer to savings plan.');
      }
    } catch (error) {
      console.error('Error during transfer to savings:', error);
      setTransferMessage('An error occurred while transferring to the savings plan.');
    }
  };

  const handleTransferFromSavings = async () => {
    setTransferMessage(null);
    const storedUser = localStorage.getItem('userData');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await fetch(`http://amsha-gen-96609f863a46.herokuapp.com/api/savings/transferfrom`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          planId,
          amount: transferAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTransferMessage('Transfer from savings plan successful.');
        setWalletData((prev) => prev && { ...prev, availableBalance: prev.availableBalance + transferAmount });
      } else {
        setTransferMessage(data.message || 'Failed to transfer from savings plan.');
      }
    } catch (error) {
      console.error('Error during transfer from savings:', error);
      setTransferMessage('An error occurred while transferring from the savings plan.');
    }
  };

  if (loading) return <p>Loading wallet data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DashboardLayout>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Wallet Overview</h2>
        {walletData && (
          <div style={{ fontSize: '18px', marginBottom: '20px' }}>
            <p><strong>Account Balance:</strong> Ksh {walletData.accountBalance.toFixed(2)}</p>
            <p><strong>Available Balance:</strong> Ksh {walletData.availableBalance.toFixed(2)}</p>
            <p><strong>Total Savings Plans:</strong> {walletData.savings}</p>
            <p><strong>Total Savings Amount:</strong> Ksh {walletData.savingsAmount.toFixed(2)}</p>
          </div>
        )}

        {/* Transfer to Savings Plan */}
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h3>Transfer to Savings Plan</h3>
          <input
            type="number"
            placeholder="Plan ID"
            value={planId}
            onChange={(e) => setPlanId(Number(e.target.value))}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={handleTransferToSavings} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            Transfer to Savings
          </button>
        </div>

        {/* Transfer from Savings Plan to Wallet */}
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h3>Transfer from Savings Plan to Wallet</h3>
          <input
            type="number"
            placeholder="Plan ID"
            value={planId}
            onChange={(e) => setPlanId(Number(e.target.value))}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={handleTransferFromSavings} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            Transfer from Savings
          </button>
        </div>

        {transferMessage && <p style={{ color: 'green', marginTop: '10px' }}>{transferMessage}</p>}
      </div>
    </DashboardLayout>
  );
};

export default PiggyWalletPage;
