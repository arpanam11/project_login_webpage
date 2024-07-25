import React, { useState } from 'react';
import axios from 'axios';
import '../style/login.css';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const validateCredentials = () => {

    if (username.trim() === '') {
      setErrorMessage('Username cannot be empty.');
      return false;
    }
    if (password.trim() === '') {
      setErrorMessage('Password cannot be empty.');
      return false;
    }

    const validUser = {
      username: 'Admin',
      password: 'Admin@2024'
    };

    if (username !== validUser.username || password !== validUser.password) {
      setErrorMessage('Invalid username or password.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCredentials()) {
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.get('http://localhost:5000/users', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      navigate('/home');

    } catch (err) {
      console.error(err.message);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <div className='landing_head'>Login</div>
      <div className='landing_h'></div>
      <div className='landing_window p-1'>
        <img src="./login.png" alt="Login Logo" class="img-fluid w-25 mx-auto d-block" />

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className='px-5 pt-5'>
          <div class="form-group">
            <label >Username:</label>
            <input type="username" class="form-control" id="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" id="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          <div className='d-flex'>
            <Link to="/register" >Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
