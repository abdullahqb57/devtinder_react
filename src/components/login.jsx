import React, {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import '../styles/login.css'
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { handleLogin, handleSignup } from '../api/api';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      if(data?.status === 200) {
        dispatch(addUser(data?.user));
        navigate('/'); 
      } else if (data?.status === 400) {
        setError(data?.message || 'Login failed. Please check your credentials and try again.');
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setError(error?.message || 'An error occurred during login.');
    },
  });

  const onSubmit = () => {
    loginMutation.mutate({email, password});
  }

  const onSignup = async () => {
    try {
      const data = await handleSignup({firstName, lastName, age, gender, email, password});
      if (data?.status === 201) {
        setIsLogin(true);
        setError('');
        dispatch(addUser(data?.result));
        navigate('/profile'); 
      } else {
        setError(data?.message || 'Signup failed. Please check your details and try again.');
      }
    } catch (error) {
      setError(error?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className='login'>
        <h2 className='login-title'>{isLogin ? 'Login' : 'Sign Up'} Page</h2>
        {!isLogin && (
          <>
            <div>
                <span>First Name</span>
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className='login-input' 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <span>Last Name</span>
                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className='login-input' 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <span>Age</span>
                <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    className='login-input' 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div>
                <span>Gender</span>
                <input 
                    type="text" 
                    id="gender" 
                    name="gender" 
                    className='login-input' 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
            </div>
            {/* <div>
                <span>Email ID</span>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className='login-input' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div> */}
            </>
        )}
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
            {error && <p className='error-message'>{error}</p>}
            <button className='login-button' onClick = {isLogin ? onSubmit : onSignup}>
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            <p className='toggle-text' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </p>
    </div>
  )
}

export default Login;