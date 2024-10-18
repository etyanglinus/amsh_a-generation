import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const SavingsProgressPage = (props) => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(JSON.parse(plan));
    }
  }, []);

  if (!selectedPlan) {
    return <p>No plan selected.</p>;
  }

  return (
    <DashboardLayout>
      <h3>Progress for {selectedPlan.title}</h3>
      <p>Current Savings: Ksh {selectedPlan.current}</p>
      <p>Goal: Ksh {selectedPlan.goal}</p>
      <p>Duration: {selectedPlan.duration}</p>
      {/* Add more details and visualizations if necessary */}
    </DashboardLayout>
  );
};

export default SavingsProgressPage;
