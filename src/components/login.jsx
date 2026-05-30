import React from 'react'
import '../styles/login.css'

const Login = () => {
  return (
    <div className='login'>
        <h2 className='login-title'>Login Page</h2>
            <div>
                <span>Email ID</span>
                <input type="text" id="username" name="username" className='login-input' />
            </div>
            <div>
                <span>Password</span>
                <input type="password" id="password" name="password" className='login-input' />
            </div>
            <button className='login-button'>Login</button>
    </div>
  )
}

export default Login