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
      <ProfileBadge />
    </div>
  )
}

export default Navbar;