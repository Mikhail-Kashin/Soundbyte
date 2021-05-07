import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  if (sessionUser)
  {
    return (
      <div>
        <span>{user.username}</span>
        <span id="dropButton" className='fas fa-user-circle icon' onClick={openMenu}>

        </span>
          <span  className="profile-dropdown"></span>
          <span className='fas fa-sign-out-alt' onClick={logout}></span>

      </div>
    );
  } else {
    return (
      <div>sign in</div>
    )
  }
}

export default ProfileButton;
