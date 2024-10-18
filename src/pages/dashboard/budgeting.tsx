import 'chart.js/auto';
import Cookies from 'js-cookie'; // Import js-cookie for token management
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const BudgetPlanner = (props) => {
  const [budgetCategories, setBudgetCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', planned: '', actual: '' });
  const token = Cookies.get('token'); // Retrieve the token from cookies

  // Fetch existing budget categories from the backend
  const fetchBudgetCategories = async () => {
    try {
      const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/budget/all', {
        headers: {
          Authorization: `Bearer ${token}`, // Add bearer token to the request headers
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove('token'); // Remove token if unauthorized
          // Redirect to login page or handle accordingly
          console.warn('Unauthorized access. Please log in again.');
        }
        throw new Error('Failed to fetch budget categories');
      }

      const data = await response.json();
      setBudgetCategories(data);
    } catch (error) {
      console.error('Error fetching budget categories:', error);
    }
  };

  // Add new category to the backend
  const addCategory = async () => {
    if (newCategory.name && newCategory.planned && newCategory.actual) {
      console.log("Adding category:", newCategory); // Debugging log

      try {
        const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/budget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add bearer token
          },
          body: JSON.stringify({
            name: newCategory.name,
            planned: parseInt(newCategory.planned),
            actual: parseInt(newCategory.actual),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add category');
        }

        const addedCategory = await response.json();
        setBudgetCategories([...budgetCategories, addedCategory]);
        setNewCategory({ name: '', planned: '', actual: '' }); // Clear form after submission
      } catch (error) {
        console.error('Error adding category:', error);
      }
    } else {
      console.warn('Please fill out all fields.'); // Warning log
    }
  };

  // Delete category from the backend
  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`https://amsha-gen-96609f863a46.herokuapp.com/api/budget/archive/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Add bearer token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setBudgetCategories(budgetCategories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Spending data for the pie chart
  const spendingData = {
    labels: budgetCategories.map((category) => category.name),
    datasets: [
      {
        label: 'Actual Spending',
        data: budgetCategories.map((category) => category.actual),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
      },
    ],
  };

  useEffect(() => {
    fetchBudgetCategories();
  }, []);

  return (
    <DashboardLayout>
      <div className="budget-planner-container">
        <h3>Budget Planner</h3>

        {/* Add new category */}
        <div className="add-category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Planned Amount"
            value={newCategory.planned}
            onChange={(e) => setNewCategory({ ...newCategory, planned: e.target.value })}
          />
          <input
            type="number"
            placeholder="Actual Amount"
            value={newCategory.actual}
            onChange={(e) => setNewCategory({ ...newCategory, actual: e.target.value })}
          />
          <button onClick={addCategory}>Add Category</button>
        </div>

        {/* Display budget categories */}
        <div className="budget-categories">
          {budgetCategories.map((category) => (
            <div className="category-card" key={category.id}>
              <h4>{category.name}</h4>
              <p>Planned: Ksh {category.planned}</p>
              <p>Actual: Ksh {category.actual}</p>
              <div className="budget-vs-actual">
                <div
                  className="progress-bar planned"
                  style={{ width: `${(category.planned / 20000) * 100}%` }}
                ></div>
                <div
                  className="progress-bar actual"
                  style={{ width: `${(category.actual / 20000) * 100}%`, backgroundColor: 'orange' }}
                ></div>
              </div>
              <button onClick={() => deleteCategory(category.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Spending insights (Pie Chart) */}
        <div className="spending-insights">
          <h4>Spending Insights</h4>
          <div className="chart-container">
            <Pie data={spendingData} />
          </div>
        </div>
      </div>

      {/* Inline styling */}
      <style jsx>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        h3 {
          color: black;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .budget-planner-container {
          padding: 20px;
          padding-left: calc(250px + 20px); /* Adjust padding from the sidebar width (250px assumed) */
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .add-category-form {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }

        .add-category-form input {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .add-category-form button {
          padding: 10px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .budget-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .category-card {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          color: black;
        }

        .budget-vs-actual {
          display: flex;
          margin-top: 10px;
          gap: 5px;
        }

        .progress-bar {
          height: 15px;
          border-radius: 7px;
          background-color: royalblue;
        }

        .spending-insights {
          margin-top: 30px;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .spending-insights h4 {
          margin-bottom: 20px;
          color: black;
        }

        .chart-container {
          width: 300px;
          height: 300px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default BudgetPlanner;
