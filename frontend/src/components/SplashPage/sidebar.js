import React from 'react';
import { NavLink } from 'react-router-dom';
import './splashPage.css';

export function SideBar(){
    return (
      <span>
        <div class="navbar">
            <div i class="fas fa-home" id='homeIcon'>  <NavLink exact to="/" id='homeText'>home</NavLink></div>
        </div>
        <div i class="far fa-compass" id='exploreIcon'>  <NavLink exact to="/explore" id='exploreText'>explore</NavLink></div>
      </span>
    );
}
export default SideBar;
