import React, {useState, useEffect } from 'react'
import '../styles/connections.css'
import { useSelector } from 'react-redux';
import {userConnections} from '../api/api'
import { useDispatch } from 'react-redux';
import { setUserConnections } from '../store/userSlice';


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.user.userConnections);

    const getConnections = async () => {
        try {
            const data = await userConnections();
            console.log('Connections data:', data);
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
            <ul>
                {connections.map((connection) => (
                    <div className='connection-card' key={connection?._id}>
                        <img src={connection?.photoUrl} alt={`${connection?.firstName} ${connection?.lastName}`} className='connection-image' />
                        <div className='connection-info'>
                            <h3>{connection?.firstName} {connection?.lastName}</h3>
                            <h4>{connection?.age} years old, {connection?.gender}</h4>
                            <p>{connection?.about}</p>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
  )
}

export default Connections