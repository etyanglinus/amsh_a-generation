import React from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const NotificationPreferences: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="notification-settings-section">
        <h1>Notification Preferences</h1>
        <p>Set your preferences for receiving notifications.</p>

        <div className="setting-card">
          <h4>Email Notifications</h4>
          <label>
            <input type="checkbox" />
            Enable Email Notifications
          </label>
        </div>

        <div className="setting-card">
          <h4>Push Notifications</h4>
          <label>
            <input type="checkbox" />
            Enable Push Notifications
          </label>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .notification-settings-section {
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
      `}</style>
    </DashboardLayout>
  );
};

export default NotificationPreferences;
