const Header = () => {
  return (
    <header className="header">
      <h1> .</h1>

      {/* Notification Icon */}
      <div className="notification-icon" onClick={() => alert('Notifications clicked!')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 22c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zm6-6V10a6 6 0 10-12 0v6l-2 2h16l-2-2z"
          />
        </svg>
      </div>

      {/* Styles */}
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 250px; /* Adjust left to match the sidebar's width */
          right: 0;
          height: 40px; /* Reduce height to make it narrower */
          background: linear-gradient(to right, royalblue, orange);
          color: white;
          padding: 5px 10px; /* Adjust padding for smaller height */
          border-radius: 0 0 8px 8px;
          z-index: 900; /* Lower z-index so sidebar is above */
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-icon {
          cursor: pointer;
          width: 24px; /* Adjusted width for smaller icon */
          height: 24px; /* Adjusted height for smaller icon */
        }

        .icon {
          width: 100%;
          height: 100%;
        }

        /* Optional: Adjust content margin to avoid overlap */
        main {
          margin-top: 40px; /* Adjust margin for new header height */
        }
      `}</style>
    </header>
  );
};

export default Header;
