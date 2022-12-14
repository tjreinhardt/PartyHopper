import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';
import '../../styles/SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!errors.length) {
      const data = await dispatch(signUp(username.trim(), email.trim(), password.trim()));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    let errors = [];
    if (email.trim().length > 255) errors.push("Email is too long")
    if (!email.includes("@") || !email.includes(".")) errors.push("Email must contain '@' and ' . '")
    if (username.trim().length > 40) errors.push("Username is too long")
    if (password.trim().length < 8) errors.push("Password must be at least 8 characters")
    if (password.trim().length > 255) errors.push("Password exceeds max limit")
    if (password !== repeatPassword) errors.push("Passwords must match")
    setErrors(errors)
  }, [email, username, password, repeatPassword])
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>

        <form onSubmit={onSignUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}><h2
            style={{
              fontSize: '22px',
              color: '#d32323',
              textAlign: 'center',
              marginBottom: '6px',
              marginTop: '0px'
            }}>Sign up for PartyHopper</h2>
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
          >Find the best local parties
          </div>
          <div>
            <input
              style={{
                border: '1px solid #999'
              }}
              type='text'
              name='username'
              onChange={updateUsername}
              placeholder="Username"
              value={username}
            ></input>
          </div>
          <div>
            <input
              style={{
                border: '1px solid #999'
              }}
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              style={{
                border: '1px solid #999'
              }}
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              style={{
                border: '1px solid #999'
              }}
              type='password'
              name='repeat_password'
              placeholder='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
          <button type='submit'
            style={{
              height: '40px',
              color: 'white',
              backgroundColor: '#d32323',
              border: 'transparent',
              borderRadius: '4px',
              width: '320px',
              fontWeight: '900'
            }}>Sign Up</button>
          <div style={{ textAlign: 'center' }}>
            <br />
            {errors.map((error, ind) => (
              <div style={{ color: 'red' }} key={ind}>* {error}</div>
            ))}
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
          >Already have an account?
            <NavLink to='/login' exact={true}>
              <div
                style={{
                  marginLeft: '4px',
                  color: '#0073bb'
                }}> Log In</div>
            </NavLink>
          </div>
        </form >
      </div>

    </div >
  );
};

export default SignUpForm;
