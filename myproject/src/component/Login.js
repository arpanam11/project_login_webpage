import React, { useState } from 'react';
import axios from 'axios';
import '../style/login.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    const empData = { username, password };
    try {
      await axios.post('http://localhost:5000/users', empData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className='landing_head'>a</div>
      <div className='landing_h'>Login</div>
      <div className='landing_window'>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type='text' value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type='password' value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
