// src/pages/api/budgetCategories.ts

import type { NextApiRequest, NextApiResponse } from 'next';

let budgetCategories = [
  { id: 1, name: 'Housing', planned: 20000, actual: 19000 },
  { id: 2, name: 'Food', planned: 10000, actual: 12000 },
  { id: 3, name: 'Entertainment', planned: 5000, actual: 4000 },
  { id: 4, name: 'Transportation', planned: 3000, actual: 3200 },
];

// Handler function for API requests
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // GET: Fetch all budget categories
      res.status(200).json(budgetCategories);
      break;

    case 'POST':
      // POST: Add a new budget category
      const { name, planned, actual } = req.body;
      const newCategory = {
        id: budgetCategories.length + 1,
        name,
        planned,
        actual,
      };
      budgetCategories.push(newCategory);
      res.status(201).json(newCategory);
      break;

    case 'DELETE':
      // DELETE: Remove a budget category
      const { id } = req.query; // Get id from query params
      budgetCategories = budgetCategories.filter(
        (category) => category.id !== parseInt(id as string)
      );
      res.status(204).end(); // Send 204 No Content response
      break;

    default:
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
