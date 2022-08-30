
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreateEventModal from './modals/CreateEventModal';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <div onClick={() => setCreateModal(true)}>
          <div>Create Event</div>
        </div>
        {createModal && <CreateEventModal setShowModal={setCreateModal} />}
      </ul>
    </nav >
  );
}

export default NavBar;
