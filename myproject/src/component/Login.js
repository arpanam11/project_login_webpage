import React, { useState } from 'react'
import '../style/login.css';
const Login = () => {
const [username , setUsername]= useState('')
const [password , setPassword]= useState('')

  return (
    <div>
    <div className='landing_head'>a</div>
    <div className='landing_h'>Login</div>
    <div className='landing_window'>From </div>
    </div>
  )
}

export default Login