import React from 'react';
import { NavLink } from 'react-router-dom';
import './splashPage.css';

export function SideBar(){
    return (
      <span>
        <div class="navbar">
            <div i class="fas fa-home" id='homeIcon'>  <NavLink exact to="/">Home</NavLink></div>
        </div>
      </span>
    );
}
export default SideBar;
