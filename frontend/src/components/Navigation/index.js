import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export function Navigation(){
    return (
      <span>
        <div class="navbar">
            <div> stuffff <NavLink exact to="/">Home</NavLink></div>
        </div>
      </span>
    );
}
export default Navigation;
