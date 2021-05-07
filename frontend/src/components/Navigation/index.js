import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  if (sessionUser){
    return (
      <span>
        <span>
            <NavLink exact to="/">Home</NavLink>
        </span>
        <ProfileButton user={sessionUser} />
      </span>
    );
  } else {
    return (
      <LoginFormModal />
    )
  }

}

export default Navigation;
