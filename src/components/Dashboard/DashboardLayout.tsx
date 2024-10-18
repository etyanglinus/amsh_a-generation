import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>{children}</main>
      </div>

      {/* Styles */}
      <style jsx>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
        }
        .main-content {
          flex-grow: 1;
          padding: 20px;
          overflow-y: auto;
        }
        main {
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
