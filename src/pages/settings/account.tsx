import React from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const AccountSettings: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="account-settings-section">
        <h1>Account Settings</h1>
        <p>Manage your account settings, including username and email.</p>
        
        {/* Additional functionalities can be added here */}
        <div className="setting-card">
          <h4>Change Username</h4>
          <input type="text" placeholder="New Username" className="input-field" />
          <button className="save-button">Save Changes</button>
        </div>
        
        <div className="setting-card">
          <h4>Change Email</h4>
          <input type="email" placeholder="New Email" className="input-field" />
          <button className="save-button">Save Changes</button>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .account-settings-section {
          padding: 20px;
          padding-left: 240px; /* Padding from the sidebar */
        }

        h1 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
          font-family: 'sans-serif';
        }

        p {
          font-size: 16px;
          color: #555;
          margin-bottom: 30px;
          font-family: 'sans-serif';
        }

        .setting-card {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        h4 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
          color: #2c3e50;
          font-family: 'sans-serif';
        }

        .input-field {
          padding: 10px;
          width: 100%;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .save-button {
          padding: 10px 15px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .save-button:hover {
          background-color: darkblue;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AccountSettings;
