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
      console.log('Fetched user data:', userData);
      if(userData?.status === 401) {
        navigate('/login'); // Redirect to login page if unauthorized
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      
    }
  }

  useEffect(() => {
    console.log('User details from Redux:', userDetails);
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