import React from 'react';
import '../styles/Footer.css';

function Footer() {

  return (
    <div className='footer-div'>
      <div className="footer">
        <div className="footer-content" style={{ fontWeight: '600' }}>Designed By Tim Reinhardt:
          <a className="about-links" style={{ textDecoration: 'none', marginLeft: '60px', marginRight: '25px' }} href={'https://github.com/tjreinhardt'}>Github</a>
          <a className="about-links" style={{ textDecoration: 'none', marginLeft: '60px', marginRight: '25px' }} href={'https://www.linkedin.com/in/tim-reinhardt-55716b146/'}>LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
