import React, {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {fetchUser} from '../api/api';
import {useSelector} from 'react-redux';

const Body = () => {
  const navigate = useNavigate();
  const {userDetails} = useSelector((state) => state.user);

  const fetchUserData = async () => {
    try {
      const userData = await fetchUser();
      if(userData?.status === 401) {
        navigate('/login'); // Redirect to login page if unauthorized
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      
    }
  }

  useEffect(() => {
    if(!userDetails?.firstName) {
      fetchUserData();
    }
  },[])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Body;