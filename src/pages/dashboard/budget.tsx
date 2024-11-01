"use client";

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/Layout';

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
  accountBalance: number;
}

interface Budget {
  budgetId: number;
  name: string;
  plannedAmount: number;
  actualAmount: number;
}

const BudgetPage = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState<{ name: string; plannedAmount: number; actualAmount: number }>({ name: '', plannedAmount: 0, actualAmount: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionMessage, setTransactionMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!user) return;

      try {
        const response = await fetch(`https://amsha-gen-96609f863a46.herokuapp.com/api/budget/user/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setBudgets(data);
        } else {
          console.error(data.message || 'Failed to fetch budgets');
        }
      } catch (error) {
        console.error('Error fetching budgets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [user]);

  const handleCreateBudget = async () => {
    if (!user) return;

    try {
      const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ userId: user.id, ...newBudget }),
      });

      const data = await response.json();

      if (response.ok) {
        setBudgets((prev) => [...prev, data]); // Add new budget to the list
        setNewBudget({ name: '', plannedAmount: 0, actualAmount: 0 }); // Reset input fields
        setTransactionMessage('Budget created successfully.');
      } else {
        setTransactionMessage(data.message || 'Failed to create budget');
      }
    } catch (error) {
      console.error('Error creating budget:', error);
      setTransactionMessage('An error occurred while creating the budget.');
    }
  };

  const handleDeleteBudget = async (budgetId: number) => {
    try {
      const response = await fetch(`https://amsha-gen-96609f863a46.herokuapp.com/api/budget/${budgetId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBudgets((prev) => prev.filter((budget) => budget.budgetId !== budgetId));
        setTransactionMessage('Budget deleted successfully.');
      } else {
        setTransactionMessage('Failed to delete budget');
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
      setTransactionMessage('An error occurred while deleting the budget.');
    }
  };

  if (loading) return <p>Loading budgets...</p>;
  if (!user) return <p>Please log in to manage your budgets.</p>;

  return (
    <DashboardLayout> {/* Wrap your page content with the DashboardLayout */}
      <div style={{ margin: '0 0 0 200px', fontFamily: 'Arial, sans-serif' }}>
        {/* User Details and Create Budget Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2>Your Budgets</h2>
            {budgets.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Planned Amount</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actual Amount</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budgets.map((budget) => (
                    <tr key={budget.budgetId}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{budget.budgetId}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{budget.name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>Ksh {budget.plannedAmount.toFixed(2)}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>Ksh {budget.actualAmount.toFixed(2)}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <button onClick={() => handleDeleteBudget(budget.budgetId)} style={{ color: 'red' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No budgets found.</p>
            )}
          </div>

          {/* Create Budget Card */}
          <div style={{
            width: '250px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Create New Budget</h2>
            <input
              type="text"
              placeholder="Budget Name"
              value={newBudget.name}
              onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            <input
              type="number"
              placeholder="Planned Amount"
              value={newBudget.plannedAmount}
              onChange={(e) => setNewBudget({ ...newBudget, plannedAmount: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            />
            <input
              type="number"
              placeholder="Actual Amount"
              value={newBudget.actualAmount}
              onChange={(e) => setNewBudget({ ...newBudget, actualAmount: Number(e.target.value) })}
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
              onClick={handleCreateBudget}
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
              Create Budget
            </button>
            {transactionMessage && <p style={{ color: 'red', marginTop: '10px' }}>{transactionMessage}</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BudgetPage;
