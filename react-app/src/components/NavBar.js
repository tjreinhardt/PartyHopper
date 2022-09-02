
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CreateEventModal from './modals/CreateEventModal';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const [createModal, setCreateModal] = useState(false);

  const user = useSelector(state => state.session.user)

  return (
    <nav
      style={{
        paddingTop: '24px'
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}>
        {user && (
          <>
            <NavLink to='/' exact={true} activeClassName='active'>
              <button
                style={{
                  width: '70px',
                  height: '40px',
                  marginRight: '12px'
                }}>Home</button>
            </NavLink>
            <div onClick={() => setCreateModal(true)}>
              <button
                style={{
                  width: '70px',
                  height: '40px',
                  marginRight: '12px'
                }}>Create Event</button>
            </div>
            {createModal && <CreateEventModal setShowModal={setCreateModal} />}
            <NavLink to='/users' exact={true} activeClassName='active'>
              <button
                style={{
                  width: '70px',
                  height: '40px',
                  marginRight: '12px'
                }}>Users</button>
            </NavLink>
            <LogoutButton />
          </>

        )}
        {!user && (
          <>
            <NavLink to='/login' exact={true} activeClassName='active'>
              <button
                style={{
                  width: '70px',
                  height: '40px',
                  marginRight: '12px'
                }}>Log In</button>
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              <button
                style={{
                  width: '70px',
                  height: '40px',
                  marginRight: '12px',
                  color: 'white',
                  backgroundColor: 'rgba(224,7,7,1)',
                  border: 'transparent',
                  borderRadius: '4px',
                  fontWeight: '700'
                }}>Sign Up</button>
            </NavLink>

          </>
        )}





      </div>
    </nav >
  );
}

export default NavBar;
