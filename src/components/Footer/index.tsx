import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', textAlign: 'center' }}>
      <div>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          Facebook
        </a>
        <a href="https://www.tiktok.com/@amsha_gen" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          Tiktok
        </a>
        <a href="https://www.instagram.com/amsha_gen/?_pwa=1#" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          Instagram
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          LinkedIn
        </a>
      </div>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
        &copy; {new Date().getFullYear()} Amsha Generation. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
