
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
        <NavLink className="nav-partyhopper-logo" to={'/'}>PartyHopper
        </NavLink>
        {user && (
          <>
            <NavLink className={'navlinks'} to='/' exact={true} activeClassName='active'>
              <button className='navbar-buttons'>Home</button>
            </NavLink>
            <NavLink className={'navlinks'} to="/map"><button className="navbar-buttons">Create</button></NavLink>
            <NavLink className={'navlinks'} to="/explore"><button className="navbar-buttons">Explore</button></NavLink>
            {/* <div onClick={() => setCreateModal(true)}>
              <button className='nav-buttons'>Create Event</button>
            </div> */}
            {createModal && <CreateEventModal setShowModal={setCreateModal} />}
            <LogoutButton />
          </>

        )}
        {!user && (
          <>
            <NavLink to='/login' exact={true} activeClassName='active'>
              <button className='navbar-buttons'>Log In</button>
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
