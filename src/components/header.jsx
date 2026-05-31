import React, {useState} from 'react'
import smile from '../assets/smile.png'
import '../styles/header.css'
import { useSelector } from 'react-redux';
import {handleLogout} from '../api/api';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const {userDetails} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('User details from Redux store:', userDetails);
    const logout = async () => {
        try {
            const response =await handleLogout();
            if(response.status === 200) {
                dispatch(removeUser());
                navigate('/login');
                setToggleMenu(false);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }  
    }
    return (
        <div className='header'>
            <h2 className='header-name'> Dev Tinder</h2>
            <div className='user-info'>
            <h2 className='header-name'>Welcome {userDetails?.firstName || 'Guest' }</h2>
            <img src={userDetails?.photoUrl || smile} alt="hero" className='hero-img' onClick={() => setToggleMenu(!toggleMenu)} />
             {toggleMenu && userDetails && (
                <div className='logout-btn'>
                <ul>
                    <li><a >Profile</a></li>
                    <li><a >Settings</a></li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
             )}
            </div>
        </div>
    )
}

export default Header