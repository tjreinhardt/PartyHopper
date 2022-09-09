import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';

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
    if (password === repeatPassword) {
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
    if (email.trim().length === 0) errors.push("Enter your email")
    if (email.trim().length > 255) errors.push("Email is too long")
    if (username.trim().length === 0) errors.push("Enter a username")
    if (username.trim().length > 40) errors.push("Username is too long")
    if (password.trim().length === 0) errors.push("Enter a password")
    // if (!password.includes("!" || "@" || "#" || "$" || "%" || "^" || "&" || "*" || "(" || ")" || "{" || "}" || "+" || "=" || "_" || "-" || "?" || "/" || ">" || "." || "," || "<" || "~" || "`" || "[" || "]" || "'" || "'" || ";" || ":")) errors.push("Password must include 1 special character (!, @, #, etc..)")
    if (password.trim().length < 8) errors.push("Password must be at least 8 characters")
    if (password.trim().length > 255) errors.push("Password exceeds max limit")
    if (password !== repeatPassword) errors.push("Passwords must match")
    // if (startDate < todays_date) errors.push("Fix your date fool")
    setErrors(errors)
  }, [email, username, password, repeatPassword])
  if (user) {
    return <Redirect to='/' />;
  }




  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
      <form onSubmit={onSignUp}
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
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: '#333333',
            flexWrap: 'wrap',
            textAlign: 'center',
            fontSize: '12px',
            width: '300px',
            marginBottom: '22px',
            marginTop: '6px'
          }}>By continuing, you agree to PartyHopper's <NavLink style={{ color: '#0073bb', marginRight: '4px' }} to='/tos'> Terms of Service </NavLink> and acknowledge PartyHopper's <NavLink style={{ color: '#0073bb' }} to='/privacy'>Privacy Policy</NavLink>
        </div> */}
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
            required={true}
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

    </div >
  );
};

export default SignUpForm;
