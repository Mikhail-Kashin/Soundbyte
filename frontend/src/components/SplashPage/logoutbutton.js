import React from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './splashPage.css';

export function LogOutComponent(){
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      history.push('/');
    }

  return (
    <div>
      <span id='logoutButton' className='fas fa-sign-out-alt' onClick={logout}></span>
    </div>
  )
}

export default LogOutComponent;
