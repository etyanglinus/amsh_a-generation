import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

Chart.register(ArcElement, Tooltip, Legend);

interface SavingsPlan {
  id: number;
  title: string;
  description: string;
  goal: number; // Ksh
  current: number; // Ksh
  duration: string;
}

const SavingsPlansPage = (props) => {
  const [plans, setPlans] = useState<SavingsPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningPlan, setJoiningPlan] = useState<SavingsPlan | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [selectedPlans, setSelectedPlans] = useState<SavingsPlan[]>([]);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{
      data: [] as number[],
      backgroundColor: [] as string[],
    }]
  });

  const fetchSavingsPlans = async () => {
    try {
      const response = await fetch('/api/savings-plans');
      if (!response.ok) {
        throw new Error('Failed to fetch savings plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching savings plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavingsPlans();
  }, []);

  const handleJoinPlan = (plan: SavingsPlan) => {
    setJoiningPlan(plan);
    setSelectedPlans((prev) => [...prev, plan]);
    updateChartData(plan);
  };

  const updateChartData = (plan: SavingsPlan) => {
    setChartData((prev) => {
      const newLabels = [...prev.labels, plan.title];
      const newData = [...prev.datasets[0].data, plan.current]; // Current savings amount
      const newColors = [...prev.datasets[0].backgroundColor, getRandomColor()];

      return {
        labels: newLabels,
        datasets: [{
          ...prev.datasets[0],
          data: newData,
          backgroundColor: newColors,
        }],
      };
    });
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCloseConfirmation = () => {
    setJoiningPlan(null);
  };

  const calculateTotalSaved = () => {
    setTotalSaved(monthlyAmount * duration);
  };

  if (loading) {
    return <p>Loading savings plans...</p>;
  }

  return (
    <DashboardLayout>
      <div className="savings-plans-page">
        <h3>Savings Plans</h3>
        <p>Choose a savings plan that fits your goals and start saving today!</p>

        <div className="plans-list">
          {plans.map((plan) => (
            <div className="plan-card" key={plan.id}>
              <h4>{plan.title}</h4>
              <p>{plan.description}</p>
              <p><strong>Goal:</strong> Ksh {plan.goal}</p>
              <p><strong>Current Savings:</strong> Ksh {plan.current}</p>
              <p><strong>Duration:</strong> {plan.duration}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(plan.current / plan.goal) * 100}%`,
                    backgroundColor: '#27ae60',
                  }}
                />
              </div>
              <p>{((plan.current / plan.goal) * 100).toFixed(0)}% of your goal achieved!</p>
              <button 
                className="action-button" 
                onClick={() => handleJoinPlan(plan)}
              >
                Join This Plan
              </button>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="donut-chart">
          <h3>Selected Savings Plans</h3>
          <Doughnut data={chartData} />
        </div>

        {/* Savings Calculator Section */}
        <section className="savings-calculator">
          <h3>Savings Calculator</h3>
          <input
            type="number"
            placeholder="Monthly Savings Amount (Ksh)"
            value={monthlyAmount > 0 ? monthlyAmount : ''}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Duration (Months)"
            value={duration > 0 ? duration : ''}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <button onClick={calculateTotalSaved}>Calculate Total Saved</button>
          {totalSaved > 0 && (
            <p>Total Savings After {duration} Month(s): Ksh {totalSaved}</p>
          )}
        </section>

        {/* Confirmation Modal */}
        {joiningPlan && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h4>You&apos;ve Joined the Plan!</h4>
              <p>
                You have successfully joined the <strong>{joiningPlan.title}</strong>.
                Here are your next steps:
              </p>
              <ul>
                <li>Set up automatic contributions to your plan.</li>
                <li>Track your progress regularly to reach your goal.</li>
                <li>Check out exclusive offers for plan members.</li>
              </ul>
              <button onClick={handleCloseConfirmation} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .savings-plans-page {
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          padding-left: 250px;
          padding-right: 20px;
        }

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 20px;
        }

        .plans-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .plan-card {
          background-color: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .plan-card:hover {
          transform: scale(1.02);
        }

        .progress {
          background-color: #f0f0f0;
          border-radius: 8px;
          height: 10px;
          margin: 10px 0;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
        }

        .action-button {
          padding: 10px 15px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 10px;
        }

        .action-button:hover {
          background-color: darkblue;
        }

        /* Donut Chart Styles */
        .donut-chart {
          margin-top: 40px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Savings Calculator Styles */
        .savings-calculator {
          margin-top: 40px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .savings-calculator input {
          width: calc(50% - 10px);
          padding: 10px;
          margin: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .confirmation-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          text-align: center;
        }

        .close-button {
          padding: 10px 15px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .close-button:hover {
          background-color: darkblue;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default SavingsPlansPage;
