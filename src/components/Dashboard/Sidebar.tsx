/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from 'next/router';
import React, { CSSProperties } from 'react';

const Sidebar: React.FC = () => {
    const router = useRouter();

    const handleSignOut = () => {
        router.push('/signin');
    };

    return (
        <div style={sidebarStyle}>
            {/* Logo Section with Link to Dashboard Index */}
            <Link href="/dashboard">
                <div style={logoStyle}>
                    <img
                        src="/images/team/logo.jpeg"
                        alt="Logo"
                        style={{ width: '100%', height: '100%', borderRadius: '20%', cursor: 'pointer' }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = '/images/team/default-logo.jpeg';
                        }}
                    />
                </div>
            </Link>

            {/* Navigation Links */}
            <ul style={listStyle}>
                {['Transaction History', 'Savings Plan', 'budget', 'Wallet', 'Settings'].map((item, index) => {
                    const path = `/dashboard/${item.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                        <li
                            key={index}
                            onClick={() => router.push(path)}
                            style={{
                                ...linkStyle,
                                ...(router.pathname === path ? activeLinkStyle : {}),
                            }}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && router.push(path)}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>

            {/* Sign Out Button */}
            <button onClick={handleSignOut} style={signOutButtonStyle} tabIndex={0}>
                Sign Out
            </button>
        </div>
    );
};

// Sidebar and style definitions remain unchanged...
const sidebarStyle: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '180px',
    backgroundColor: '#0070f3',
    padding: '20px',
    color: '#ffffff',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
};

const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80px',
    marginBottom: '20px',
};

const listStyle: CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    flex: 1,
};

const linkStyle: CSSProperties = {
    cursor: 'pointer',
    margin: '10px 0',
    color: '#ffffff',
    textDecoration: 'none',
    textAlign: 'left',
    fontFamily: 'sans-serif',
};

const activeLinkStyle: CSSProperties = {
    backgroundColor: '#005bb5',
    borderRadius: '4px',
};

const signOutButtonStyle: CSSProperties = {
    backgroundColor: '#ff4d4d',
    color: '#ffffff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '20px',
    alignSelf: 'center',
};

export default Sidebar;
