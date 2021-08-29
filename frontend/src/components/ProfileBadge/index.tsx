// @Packages
import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { JsxElement } from 'typescript';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

// @Project
import { useClickOutside } from 'hooks/useClickOutside';
import { disconnect } from 'actions/session';
import { selectProfile } from 'selectors/profile';
import Avatar from 'components/Avatar';

// @Own
import './styles.scss';
import { IThunkDispatch } from 'interfaces';

interface Option {
  title: string
  action: () => void
  icon?: ReactElement | JsxElement | ReactNode
}

const Menu: React.FC<any> = () => {
  const dispatch: IThunkDispatch = useDispatch();
  const history = useHistory();

  const options: Option[] = [
    {
      title: 'Cerrar sesión',
      action: () => {
        dispatch(disconnect())
        history.push('/auth')
      },
      icon: <IoLogOutOutline />
    },
  ]

  return (
    <div className="profilebadge__menu">
      {options.map((opt) => (
        <div className="profilebadge__menu-item" onClick={opt.action}>
          {opt.icon}
          <p className="profilebadge__menu-item-text">{opt.title}</p>
        </div>
      ))}
    </div>
  )
}

const ProfileBadge: React.FC<any> = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const profileBadgeRef = useRef<any>();
  const profile = useSelector(selectProfile);

  useClickOutside(profileBadgeRef, () => { 
    setMenuVisible(false)
  });

  return (
    <div
      className={cn("profilebadge", { "profilebadge--active": menuVisible })}
      onClick={() => setMenuVisible(!menuVisible)}
      ref={profileBadgeRef}
    >
      {menuVisible && <Menu />}
      <p className="profilebadge__username">{profile.first_name} {profile.last_name}</p>
      <Avatar userId={profile.id} height={30} width={30} />
    </div>
  )
}

export default ProfileBadge;