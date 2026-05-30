import React from 'react'
import facebook from '../assets/facebook.png'
import twitter from '../assets/twitter.png'
import youtube from '../assets/youtube.png'
import '../styles/footer.css'
const Footer = () => {
  return (
    <div className='footer'>
        <div># Copyright © 2023 Your Company. All rights reserved.</div>
        <div>
            <img src={facebook} alt="facebook" className='social-icon' />
            <img src={twitter} alt="twitter" className='social-icon' />
            <img src={youtube} alt="youtube" className='social-icon' />
        </div>
    </div>
  )
}

export default Footer