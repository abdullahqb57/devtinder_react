import React from 'react'
import smile from '../assets/smile.png'
import '../styles/header.css'

const Header = () => {
    return (
        <div className='header'>
            <h2 className='header-name'> Dev Tinder</h2>
            <img src={smile} alt="hero" className='hero-img' />
        </div>
    )
}

export default Header