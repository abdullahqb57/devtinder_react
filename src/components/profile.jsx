import React, {useState, useEffect} from 'react';
import '../styles/profile.css'
import {useSelector} from 'react-redux'
import {updateProfile} from '../api/api'

// TODO: SHOW TOAST
const profile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        photoUrl: '',
        about: '',
        age: '',
        gender: ''
    });

    const userDetails = useSelector((state) => state.user.userDetails);

    useEffect(() => {
        if (userDetails) {
            setProfileData({
                firstName: userDetails.firstName || '',
                lastName: userDetails.lastName || '',
                photoUrl: userDetails.photoUrl || '',
                about: userDetails.about || '',
                age: userDetails.age || '',
                gender: userDetails.gender || ''
            });
        }
    }, [userDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile(profileData);
            if(response?.status >= 400) {
                setProfileData((prevData) => ({
                    ...prevData,
                    error: response?.error || 'An error occurred while updating the profile.'
                }));
            }
            console.log('Profile update response:', response);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        
    };

  return (
    <div className='profile'>
        <form action="" method="post" className='profile-form' onSubmit={handleSubmit}>
           <div><label htmlFor="firstName">First Name:</label> <input className='login-input' type="text" placeholder='First Name' name='firstName' value={profileData.firstName} onChange={handleChange} /> </div>
            <div><label htmlFor="lastName">Last Name:</label> <input className='login-input' type="text" placeholder='Last Name' name='lastName' value={profileData.lastName} onChange={handleChange} /></div>
            <div><label htmlFor="photoUrl">Photo URL:</label> <input className='login-input' type="text" placeholder='Photo URL' name='photoUrl' value={profileData.photoUrl} onChange={handleChange} /></div>
            <div><label htmlFor="about">About:</label> <input className='login-input' type="text" placeholder='About' name='about' value={profileData.about} onChange={handleChange} /></div>
            <div><label htmlFor="age">Age:</label> <input className='login-input' type="text" placeholder='Age' name='age' value={profileData.age} onChange={handleChange} /></div>
            <div><label htmlFor="gender">Gender:</label> <input className='login-input' type="text" placeholder='Gender' name='gender' value={profileData.gender} onChange={handleChange} /></div>
            Error: <span className='error-message'>{profileData.error}</span>
            <button type='submit' className='profile-button'>Submit</button>
        </form>
        <div className='feed'>
            <img src={profileData?.photoUrl || undefined} alt="Feed" className='feed-image' />
            <h2>{profileData?.firstName} {profileData?.lastName}</h2>
            <h3>{profileData?.about}</h3>
            <div className='feed-buttons'>
                <button className='feed-button'>Ignore</button>
                <button className='feed-button'>Interested</button>
            </div>
    </div>
    </div>
  )
}

export default profile