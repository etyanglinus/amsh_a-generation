/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Logic for logout, redirect to login page
    router.push('/signin');
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/images/logo/logo-2.svg" alt="Logo" className="logo-image" /> {/* Replace with your actual logo path */}
      </div>
      <nav className="menu">
        <ul>
          <li><Link href="/dashboard"><span>Dashboard</span></Link></li>
          <li><Link href="/dashboard/saving"><span>Saving Plans</span></Link></li>
          <li><Link href="/dashboard/budgeting"><span>Budgeting Tools</span></Link></li>
          <li><Link href="/dashboard/career"><span>Career Related</span></Link></li>
          <li><Link href="/dashboard/resources"><span>Financial Education</span></Link></li>
          <li><Link href="/dashboard/support"><span>Community</span></Link></li>
          <li><Link href="/dashboard/settings"><span>Settings</span></Link></li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <style jsx>{`
        .sidebar {
          background-color: royalblue;
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 250px;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'sans-serif';
        }

        .logo {
          text-align: center;
          padding: 10px;
          background-color: royalblue;
          margin-bottom: 20px; /* Space below the logo */
        }

        .logo-image {
          background-color: white;
          padding: 10px;
          width: 150px; /* Width set to control the size */
          height: 60px; /* Fixed height for a rectangular appearance */
          border-radius: 12px
          display: block;
          margin: 0 auto; /* Center the image */
          object-fit: contain; /* Maintains the aspect ratio */
        }
        
        .menu {
          flex-grow: 1;
          padding-left: 0;
        }

        .menu ul {
          list-style: none;
          padding: 0;
        }

        .menu li {
          margin-bottom: 20px;
          padding-left: 20px;
        }

        .menu a {
          color: white; /* Ensures the links are white */
          text-decoration: none;
          font-size: 18px;
          transition: color 0.3s ease, background-color 0.3s ease; /* Transition for hover */
        }

        .menu a:hover {
          color: #f0f0f0; /* Slightly lighter on hover */
          background-color: rgba(255, 255, 255, 0.1); /* Adds a subtle background effect on hover */
          padding-left: 30px; /* Adds slight padding for hover effect */
        }

        .menu a span {
          color: white; /* Ensure text inside the span is white */
        }

        .logout-button {
          background-color: orange;
          border: none;
          padding: 10px 20px; /* Increased padding for better button appearance */
          color: white;
          font-weight: bold;
          cursor: pointer;
          border-radius: 12px;
          transition: background-color 0.3s ease;
          margin: 20px auto;
        }

        .logout-button:hover {
          background-color: white;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
