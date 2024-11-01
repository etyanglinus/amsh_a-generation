import React from 'react';

interface NavbarProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
    return (
        <nav style={navbarStyle}>
            <button onClick={onToggleTheme} style={toggleButtonStyle}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
};

// Updated Navbar styling with lower z-index
const navbarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'linear-gradient(90deg, #0070f3, orange)',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    color: '#ffffff',
    zIndex: 1, // Lower z-index than the sidebar
};

const toggleButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    color: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
};

export default Navbar;
