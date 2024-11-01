"use client";

import DashboardLayout from '@/components/Dashboard/Layout';
import { useEffect, useState } from 'react';

interface SavingsPlan {
  planId: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
}

const SavingsPlanPage = (props) => {
  const [savingsPlans, setSavingsPlans] = useState<SavingsPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fields for creating and updating plans
  const [newPlan, setNewPlan] = useState({ title: '', description: '', targetAmount: 0 });
  const [updatePlan, setUpdatePlan] = useState({ planId: 0, title: '', description: '', targetAmount: 0 });
  const [depositPlanId, setDepositPlanId] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);

  useEffect(() => {
    const fetchSavingsPlans = async () => {
      const storedUser = localStorage.getItem('userData');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://amsha-gen-96609f863a46.herokuapp.com/api/savings?userId=${user.id}`,
          { method: 'GET' }
        );
        const data = await response.json();

        if (response.ok && data.data?.savings) {
          setSavingsPlans(data.data.savings);
        } else {
          setError(data.message || 'Failed to fetch savings plans');
        }
      } catch (error) {
        console.error('Error fetching savings plans:', error);
        setError('An error occurred while fetching savings plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsPlans();
  }, []);

  const handleCreatePlan = async () => {
    try {
      const storedUser = localStorage.getItem('userData');
      const user = storedUser ? JSON.parse(storedUser) : null;
      
      const response = await fetch(`https://amsha-gen-96609f863a46.herokuapp.com/api/savings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          title: newPlan.title,
          description: newPlan.description,
          targetAmount: newPlan.targetAmount,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSavingsPlans([...savingsPlans, data.data.savings]);
        setNewPlan({ title: '', description: '', targetAmount: 0 });
      } else {
        setError(data.message || 'Failed to create savings plan');
      }
    } catch (error) {
      setError('An error occurred while creating savings plan.');
    }
  };

  const handleUpdatePlan = async () => {
    try {
      const storedUser = localStorage.getItem('userData');
      const user = storedUser ? JSON.parse(storedUser) : null;

      const response = await fetch(`http://amsha-gen-96609f863a46.herokuapp.com/api/savings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: updatePlan.planId,
          userId: user.id,
          title: updatePlan.title,
          description: updatePlan.description,
          targetAmount: updatePlan.targetAmount,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSavingsPlans(savingsPlans.map(plan => plan.planId === updatePlan.planId ? data.data.savings : plan));
        setUpdatePlan({ planId: 0, title: '', description: '', targetAmount: 0 });
      } else {
        setError(data.message || 'Failed to update savings plan');
      }
    } catch (error) {
      setError('An error occurred while updating savings plan.');
    }
  };

  const handleDeposit = async () => {
    try {
      const response = await fetch(`http://amsha-gen-96609f863a46.herokuapp.com/api/savings/deposit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: depositPlanId,
          amount: depositAmount,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSavingsPlans(savingsPlans.map(plan => plan.planId === depositPlanId ? data.data.savings : plan));
        setDepositAmount(0);
      } else {
        setError(data.message || 'Failed to deposit to savings plan');
      }
    } catch (error) {
      setError('An error occurred while depositing to savings plan.');
    }
  };

  if (loading) return <p>Loading savings plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DashboardLayout>
      <div style={{ margin: '0', fontFamily: 'Arial, sans-serif' }}> {/* Removed the 200px margin */}
        <h2>Savings Plans</h2>

        <div style={{ marginTop: '20px' }}>
          <h3>Your Savings Plans</h3>
          {savingsPlans.length > 0 ? (
            savingsPlans.map((plan) => (
              <div key={plan.planId} style={{ marginBottom: '15px' }}>
                <h4>{plan.title}</h4>
                <p>Description: {plan.description}</p>
                <p>Target Amount: Ksh {plan.targetAmount.toFixed(2)}</p>
                <p>Current Amount: Ksh {plan.currentAmount.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>No savings plans found.</p>
          )}
        </div>

        <div>
          <h3>Create Savings Plan</h3>
          <input
            placeholder="Title"
            value={newPlan.title}
            onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newPlan.description}
            onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
          />
          <input
            placeholder="Target Amount"
            type="number"
            value={newPlan.targetAmount}
            onChange={(e) => setNewPlan({ ...newPlan, targetAmount: parseFloat(e.target.value) })}
          />
          <button onClick={handleCreatePlan}>Create Plan</button>
        </div>

        <div>
          <h3>Update Savings Plan</h3>
          <input
            placeholder="Plan ID"
            type="number"
            value={updatePlan.planId}
            onChange={(e) => setUpdatePlan({ ...updatePlan, planId: parseInt(e.target.value) })}
          />
          <input
            placeholder="Title"
            value={updatePlan.title}
            onChange={(e) => setUpdatePlan({ ...updatePlan, title: e.target.value })}
          />
          <input
            placeholder="Description"
            value={updatePlan.description}
            onChange={(e) => setUpdatePlan({ ...updatePlan, description: e.target.value })}
          />
          <input
            placeholder="Target Amount"
            type="number"
            value={updatePlan.targetAmount}
            onChange={(e) => setUpdatePlan({ ...updatePlan, targetAmount: parseFloat(e.target.value) })}
          />
          <button onClick={handleUpdatePlan}>Update Plan</button>
        </div>

        <div>
          <h3>Deposit to Savings Plan</h3>
          <input
            placeholder="Plan ID"
            type="number"
            value={depositPlanId}
            onChange={(e) => setDepositPlanId(parseInt(e.target.value))}
          />
          <input
            placeholder="Amount"
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
          />
          <button onClick={handleDeposit}>Deposit</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavingsPlanPage;
