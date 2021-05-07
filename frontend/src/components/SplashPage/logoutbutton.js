import React from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './splashPage.css';

export function LogOutComponent(){
    const dispatch = useDispatch();

    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
    }

  return (
    <span id='logoutButton' className='fas fa-sign-out-alt' onClick={logout}></span>
  )
}

export default LogOutComponent;
