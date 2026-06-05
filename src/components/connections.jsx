import React, {useState, useEffect } from 'react'
import '../styles/connections.css'
import { useSelector } from 'react-redux';
import {userConnections} from '../api/api'
import { useDispatch } from 'react-redux';
import { setUserConnections } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.user.userConnections);
    const navigate = useNavigate();

    const getConnections = async () => {
        try {
            const data = await userConnections();
            dispatch(setUserConnections(data?.connections || []));
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    return (
        <div>
            <h2>Connections</h2>
            {connections?.length === 0 && <p className='no-connections'>You have no connections yet. Please check back later.</p>}
            <ul>
                {connections.map((connection) => (
                    <div className='connection-card' key={connection?._id}>
                        <img src={connection?.photoUrl} alt={`${connection?.firstName} ${connection?.lastName}`} className='connection-image' />
                        <div className='connection-info'>
                            <h3>{connection?.firstName} {connection?.lastName}</h3>
                            <h4>{connection?.age} years old, {connection?.gender}</h4>
                            <p>{connection?.about}</p>
                        </div>
                        <button className='chat-button' onClick={() => navigate(`/chat/${connection?._id}`)}>
                            Chat
                        </button>
                    </div>
                ))}
            </ul>
        </div>
  )
}

export default Connections