
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CreateEventModal from './modals/CreateEventModal';
import LogoutButton from './auth/LogoutButton';
import '../styles/NavBar.css'

const NavBar = () => {
  const [createModal, setCreateModal] = useState(false);

  const user = useSelector(state => state.session.user)

  return (
    <nav className='navbar-nav'>
      <div className='nav-outer-wrapper'>
        {user && (
          <>
            <NavLink to='/' exact={true} activeClassName='active'>
              <button className='nav-buttons'>Home</button>
            </NavLink>
            <div onClick={() => setCreateModal(true)}>
              <button className='nav-buttons'>Create Event</button>
            </div>
            {createModal && <CreateEventModal setShowModal={setCreateModal} />}
            <NavLink to='/users' exact={true} activeClassName='active'>
              <button className='nav-buttons'>Users</button>
            </NavLink>
            <LogoutButton />
          </>

        )}
        {!user && (
          <>
            <NavLink to='/login' exact={true} activeClassName='active'>
              <button className='nav-buttons'>Log In</button>
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              <button className='nav-signup-button-red'>Sign Up</button>
            </NavLink>

          </>
        )}





      </div>
    </nav >
  );
}

export default NavBar;
