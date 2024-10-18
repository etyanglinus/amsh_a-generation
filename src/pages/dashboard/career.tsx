import { useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const CareerTools = () => {
  const [salary, setSalary] = useState(0);
  const [debt, setDebt] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [livingCosts, setLivingCosts] = useState({
    cityA: 1500,
    cityB: 1800,
  });
  const [comparisonResult, setComparisonResult] = useState('');

  // API call to calculate salary projection
  const calculateSalaryProjection = async (career) => {
    try {
      const response = await fetch('/api/careerTools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'salaryProjection', career }),
      });
      const data = await response.json();
      setSalary(data.salary);
    } catch (error) {
      console.error('Error calculating salary projection:', error);
    }
  };

  // API call to calculate debt repayment
  const calculateDebtRepayment = async (interestRate, term) => {
    try {
      const response = await fetch('/api/careerTools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'debtRepayment',
          debt,
          interestRate,
          term,
        }),
      });
      const data = await response.json();
      setMonthlyPayment(data.monthlyPayment);
    } catch (error) {
      console.error('Error calculating debt repayment:', error);
    }
  };

  // API call to compare cost of living
  const costOfLivingComparison = async () => {
    try {
      const response = await fetch('/api/careerTools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'costOfLiving',
          cityA: livingCosts.cityA,
          cityB: livingCosts.cityB,
        }),
      });
      const data = await response.json();
      setComparisonResult(data.comparison);
    } catch (error) {
      console.error('Error comparing cost of living:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="career-tools">
        <h3>Career-Related Financial Tools</h3>

        {/* Salary Projections Section */}
        <div className="tool-section salary-projections">
          <h4>Salary Projections</h4>
          <select onChange={(e) => calculateSalaryProjection(e.target.value)} className="select-career">
            <option value="">Select Career</option>
            <option value="Engineering">Engineering</option>
            <option value="Teaching">Teaching</option>
            <option value="Business">Business</option>
          </select>
          {salary > 0 && <p className="salary-info">Projected Salary: Ksh {salary.toLocaleString()} per year</p>}
        </div>

        {/* Debt Repayment Plans Section */}
        <div className="tool-section debt-repayment">
          <h4>Debt Repayment Plans</h4>
          <input
            type="number"
            placeholder="Enter your total debt"
            className="input-field"
            onChange={(e) => setDebt(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Enter interest rate (%)"
            className="input-field"
            onChange={(e) => calculateDebtRepayment(Number(e.target.value), 12)}
          />
          {monthlyPayment > 0 && (
            <p className="payment-info">Monthly Payment: Ksh {monthlyPayment.toFixed(2)}</p>
          )}
        </div>

        {/* Cost of Living Comparisons Section */}
        <div className="tool-section living-costs">
          <h4>Cost of Living Comparisons</h4>
          <div className="living-costs-info">
            <p>City A: Ksh {livingCosts.cityA.toLocaleString()}</p>
            <p>City B: Ksh {livingCosts.cityB.toLocaleString()}</p>
          </div>
          <button onClick={costOfLivingComparison} className="compare-btn">
            Compare Costs
          </button>
          {comparisonResult && <p className="comparison-result">{comparisonResult}</p>}
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .career-tools {
          padding: 20px;
          padding-left: 240px; /* Padding from the sidebar */
          font-family: 'sans-serif';
        }

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
        }

        .tool-section {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
          margin-left: 20px; /* Added padding to create space from left side */
        }

        h4 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        .select-career {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .salary-info {
          font-size: 18px;
          color: #2980b9;
          margin-top: 10px;
        }

        .input-field {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .payment-info {
          font-size: 18px;
          color: #c0392b;
          margin-top: 10px;
        }

        .living-costs-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .compare-btn {
          padding: 10px 20px;
          background-color: #2980b9;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        .compare-btn:hover {
          background-color: #1f618d;
        }

        .comparison-result {
          font-size: 18px;
          font-weight: 500;
          color: #16a085;
          margin-top: 15px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CareerTools;
