import React from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const PrivacySettings: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="privacy-settings-section">
        <h1>Privacy Settings</h1>
        <p>Manage your privacy settings and control data sharing.</p>

        <div className="setting-card">
          <h4>Data Sharing</h4>
          <label>
            <input type="checkbox" />
            Allow Data Sharing
          </label>
        </div>

        <div className="setting-card">
          <h4>Profile Visibility</h4>
          <label>
            <input type="checkbox" />
            Make Profile Public
          </label>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .privacy-settings-section {
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

export default PrivacySettings;
