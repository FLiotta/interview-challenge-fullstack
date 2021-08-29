// @Packages
import React from 'react';
import { useSelector } from 'react-redux';

// @Project
import Logo from 'components/Logo';
import ProfileBadge from 'components/ProfileBadge';

// @Own
import './styles.scss';

const Navbar: React.FC<any> = () => {
  

  return (
    <div className="navbar">
      <Logo brandColor tag="h6" />
      <div className="navbar__ctas">
        <button className="btn btn-sm btn-link text-decoration-none">Nueva cuenta</button>
        <ProfileBadge />
      </div>
    </div>
  )
}

export default Navbar;