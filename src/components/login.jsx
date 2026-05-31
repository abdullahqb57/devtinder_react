import React, {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import '../styles/login.css'
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../api/api';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      console.log('Login successful:', data?.user);
      dispatch(addUser(data?.user));
      navigate('/'); // Redirect to home page after successful login
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const onSubmit = () => {
    loginMutation.mutate({email, password});
  }
  return (
    <div className='login'>
        <h2 className='login-title'>Login Page</h2>
            <div>
                <span>Email ID</span>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className='login-input' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <span>Password</span>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className='login-input' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> 
            </div>
            <button className='login-button' onClick = {onSubmit}>Login</button>
    </div>
  )
}

export default Login;