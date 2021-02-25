import React from 'react';

const Footer = (props) => {
  const currenTime = new Date();
  const year = currenTime.getFullYear()

  return(
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Mesto Russia</p>
    </footer>
  )
};

export default Footer;