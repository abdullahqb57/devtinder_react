import React, {useState, useEffect } from 'react'
import '../styles/connections.css'
import { useSelector } from 'react-redux';
import {userRequests} from '../api/api'
import { useDispatch } from 'react-redux';
import {sendConnectionRequest} from '../api/api';


const Requests = () => {
    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);

    const getConnections = async () => {
        try {
            const data = await userRequests();
            console.log('Requests data:', data);
            setRequests(data?.connectionRequests || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const reqButton = async (status, requestId) => {
        try {
            const response = await sendConnectionRequest(status, requestId);
            console.log('Response from server:', response);
            if (response?.status === 200) {
                getConnections();
            } else {
                console.error('Failed to update request status:', response?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    return (
        <div>
            <h2>Requests</h2>
            <ul>
                {requests.map((request) => (
                    <div className='connection-card' key={request?.fromUserId?._id}>
                        <img src={request?.fromUserId?.photoUrl} alt={`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`} className='connection-image' />
                        <div className='connection-info'>
                            <h3>{request?.fromUserId?.firstName} {request?.fromUserId?.lastName}</h3>
                            <h4>{request?.fromUserId?.age} years old, {request?.fromUserId?.gender}</h4>
                            <p>{request?.fromUserId?.about}</p>
                        </div>
                        <div>
                            <button className='req-button' onClick={() => reqButton('accepted', request?._id)}>Accept</button>
                            <button className='req-button' onClick={() => reqButton('rejected', request?._id)}>Decline</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
  )
}

export default Requests