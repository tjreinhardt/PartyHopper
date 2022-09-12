import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import '../../styles/LoginForm.css'
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email.trim(), password.trim()));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  const demoLogIn = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }



  // useEffect(() => {
  //   let errors = [];
  //   if (email.trim().length === 0) errors.push("Please enter your email")
  //   if (password.trim().length === 0) errors.push("Please enter your password")
  //   setErrors(errors)
  // }, [email, password])

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className='header-login-signup'>
        <div style={{ marginLeft: '0px' }}>
          partyhopper
        </div>
        <img alt='' style={{
          height: '60px',
          width: 'auto',
          border: 'none',
          marginLeft: '0px',
          zIndex: '1'
        }} src={"https://www.svgrepo.com/show/349576/yelp.svg"} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px'
        }}>
        <form onSubmit={onLogin}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}><h2
            style={{
              fontSize: '22px',
              color: '#d32323',
              textAlign: 'center',
              marginBottom: '6px',
              marginTop: '0px'
            }}>Log in to PartyHopper</h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#333333',
              fontSize: '14px'
            }}
          >New to PartyHopper?
            <NavLink to='/sign-up' exact={true}>
              <div
                style={{
                  marginLeft: '4px',
                  color: '#0073bb'
                }}> Sign up</div>
            </NavLink>
          </div>
          {/* <div
            style={{
              textAlign: 'center',
              fontSize: '12px',
              width: '300px',
              marginBottom: '22px',
              marginTop: '6px'
            }}>By logging in, you agree to PartyHopper's <NavLink style={{ color: '#0073bb' }} to='/tos'>Terms of Service</NavLink> and <NavLink style={{ color: '#0073bb' }} to='/privacy'>Privacy Policy</NavLink>
          </div> */}
          <div style={{ textAlign: 'center' }}>
            {errors.map((error, ind) => (
              <div style={{ color: 'red', maxWidth: '300px', wordBreak: 'break-word' }} key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              // required
              // onInvalid={e => e.target.setCustomValidity(errors)}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              // required
              // onInvalid={e => e.target.setCustomValidity(errors)}
              onChange={updatePassword}
            />
          </div>
          <div className='login-form-demologin-button-wrapper'>
            <button type='submit' className='login-form-login-button'>Log In</button>
            <button type='submit' className='login-form-login-button' onClick={demoLogIn}>Demo</button>

          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: '12px',
              color: '#999',
              fontSize: '12px'
            }}
          >New to PartyHopper?
            <NavLink to='/sign-up' exact={true}>
              <div
                style={{
                  marginLeft: '4px',
                  color: '#0073bb'
                }}> Sign up</div>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
