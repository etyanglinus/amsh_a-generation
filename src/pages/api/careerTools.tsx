export default function handler(req, res) {
    if (req.method === 'POST') {
      const { action, career, debt, interestRate, term, cityA, cityB } = req.body;
  
      // Handle salary projection
      if (action === 'salaryProjection') {
        let salary = 0;
        switch (career) {
          case 'Engineering':
            salary = 60000;
            break;
          case 'Teaching':
            salary = 40000;
            break;
          case 'Business':
            salary = 50000;
            break;
          default:
            salary = 0;
        }
        return res.status(200).json({ salary });
      }
  
      // Handle debt repayment calculation
      if (action === 'debtRepayment') {
        if (!debt || !interestRate || !term) {
          return res.status(400).json({ error: 'Please provide debt, interest rate, and term.' });
        }
        const monthlyRate = interestRate / 12 / 100;
        const payment = (debt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        return res.status(200).json({ monthlyPayment: payment });
      }
  
      // Handle cost of living comparison
      if (action === 'costOfLiving') {
        if (!cityA || !cityB) {
          return res.status(400).json({ error: 'Please provide living costs for both cities.' });
        }
        const comparison = cityA < cityB ? 'City A is cheaper' : 'City B is cheaper';
        return res.status(200).json({ comparison });
      }
  
      // Invalid action
      return res.status(400).json({ error: 'Invalid action.' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  