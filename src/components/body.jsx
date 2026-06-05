import React, {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {fetchUser} from '../api/api';
import {useSelector, useDispatch} from 'react-redux';
import {addUser} from '../store/userSlice';

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userDetails} = useSelector((state) => state.user);

  const fetchUserData = async () => {
    try {
      const userData = await fetchUser();
      console.log('Fetched user data:', userData);
      if(userData?.status === 200 && userData?.data?.user) {
      dispatch(addUser(userData?.data?.user));
      }
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