"use client";
import { useState } from 'react';

const InvestmentCalculatorPage = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(1000);
  const [investmentDuration, setInvestmentDuration] = useState<number>(1);
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const [topUpFrequency, setTopUpFrequency] = useState<number>(12);
  const [reasonForInvesting, setReasonForInvesting] = useState<string>('');
  const [totalInvestmentValue, setTotalInvestmentValue] = useState<number>(0);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [referredByAdvisor, setReferredByAdvisor] = useState<string>('no');

  const handleCalculate = () => {
    const totalTopUps = topUpAmount * topUpFrequency * investmentDuration;
    const totalValue = initialDeposit + totalTopUps;
    setTotalInvestmentValue(totalValue);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
     
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>How much do you want to start investing? *</label>
          <input
            type="number"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
            required
            min="1000"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>How long would you like to Invest? (Years) *</label>
          <input
            type="number"
            value={investmentDuration}
            onChange={(e) => setInvestmentDuration(Number(e.target.value))}
            required
            min="1"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>How much do you want to be topping up? *</label>
          <input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(Number(e.target.value))}
            required
            min="1"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>How often do you want to be topping up? *</label>
          <select
            value={topUpFrequency}
            onChange={(e) => setTopUpFrequency(Number(e.target.value))}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value={12}>Monthly</option>
            <option value={1}>Yearly</option>
          </select>
        </div>

        <div>
          <label>Reason for investing?</label>
          <select
            value={reasonForInvesting}
            onChange={(e) => setReasonForInvesting(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Reason for investing</option>
            <option value="travelling">Travelling</option>
            <option value="buy_house">Buy a house</option>
            <option value="buy_car">Buy a car</option>
            <option value="emergency_fund">Emergency Fund</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ borderTop: '1px solid #ccc', paddingTop: '15px', marginTop: '20px' }}>
          <h2 style={{ margin: '0', color: '#333' }}>Investment Summary</h2>
          <div style={{ marginBottom: '10px' }}>
            <span>Initial Deposit</span>
            <h2 style={{ margin: '5px 0', color: '#007bff' }}>KShs. {initialDeposit}</h2>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span>Top Up Amount</span>
            <h2 style={{ margin: '5px 0', color: '#007bff' }}>KShs. {topUpAmount}</h2>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span>Total Investment Value</span>
            <h2 style={{ margin: '5px 0', color: '#007bff' }}>KShs. {totalInvestmentValue}</h2>
            <p style={{ fontSize: '12px', color: '#666' }}>
              *Please note this is an indicative return for illustration purposes. The current effective annual yield rate used is 9.0%*.
            </p>
          </div>
          <button
            onClick={handleCalculate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Calculate Investment
          </button>
        </div>
        <div>
          <label>Have you been referred by a Financial Advisor?</label>
          <select
            value={referredByAdvisor}
            onChange={(e) => setReferredByAdvisor(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculatorPage;
