import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
        document.body.style.backgroundColor = isDarkMode ? 'white' : '#1a1a1a';
        document.body.style.color = isDarkMode ? 'black' : 'white';
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={contentStyle}>
                <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
                <div style={{ marginTop: '60px' }}> {/* Offset for the Navbar height */}
                    {children}
                </div>
            </div>
        </div>
    );
};

// Styles for content container, with space for sidebar
const contentStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: '200px', // Matches sidebar width
    padding: '20px',
    position: 'relative',
};

export default Layout;
