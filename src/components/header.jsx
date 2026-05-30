import React from 'react'
import smile from '../assets/smile.png'
import '../styles/header.css'
import { useSelector } from 'react-redux';

const Header = () => {
    const {userDetails} = useSelector((state) => state.user);
    console.log('User details from Redux store:', userDetails);
    return (
        <div className='header'>
            <h2 className='header-name'> Dev Tinder</h2>
            <div className='user-info'>
            <h2 className='header-name'>Welcome {userDetails?.firstName || 'Guest' }</h2>
            <img src={userDetails?.photoUrl || smile} alt="hero" className='hero-img' />
            </div>
        </div>
    )
}

export default Header