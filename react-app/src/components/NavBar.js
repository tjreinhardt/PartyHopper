
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
        <NavLink className="nav-partyhopper-logo" to={'/'} style={{ textDecoration: 'none', color: 'white', fontSize: '36px', position: 'absolute', left: '25px', fontWeight: '700' }}>PartyHopper
        </NavLink>
        {user && (
          <>
            <NavLink to='/' exact={true} activeClassName='active'>
              <button className='nav-buttons'>Home</button>
            </NavLink>
            <NavLink className="nav-buttons" to="/map">Map</NavLink>
            <div onClick={() => setCreateModal(true)}>
              <button className='nav-buttons'>Create Event</button>
            </div>
            {createModal && <CreateEventModal setShowModal={setCreateModal} />}
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
