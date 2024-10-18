import type { NextApiRequest, NextApiResponse } from 'next';


const savingsPlansData = [
  {
    id: 1,
    title: 'Emergency Fund Plan',
    description: 'Start saving for emergencies with a goal of 3 to 6 months of living expenses.',
    goal: 60000,
    current: 20000,
    duration: '3 months',
  },
  {
    id: 2,
    title: 'Vacation Savings Plan',
    description: 'Save for your next vacation. Enjoy peace of mind knowing you have funds ready for travel.',
    goal: 100000,
    current: 30000,
    duration: '6 months',
  },
  {
    id: 3,
    title: 'Home Down Payment Plan',
    description: 'Set aside money for a down payment on your future home. Start your journey towards homeownership.',
    goal: 300000,
    current: 50000,
    duration: '12 months',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(savingsPlansData);
}
