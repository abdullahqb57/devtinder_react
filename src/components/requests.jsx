import React, {useState, useEffect, useRef } from 'react'
import '../styles/connections.css'
import { useSelector } from 'react-redux';
import {userRequests} from '../api/api'
import { useDispatch } from 'react-redux';
import {reviewConnectionRequest} from '../api/api';
import Toaster from './toaster';

const Requests = () => {
    const timerRef = useRef(null);
    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const user = useSelector((state) => state.user);

    const getConnections = async () => {
        try {
            const data = await userRequests();
            setRequests(data?.connectionRequests || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleToaster = (message) => {
        setToasterMessage(message);
        setShowToaster(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setShowToaster(false);
        }, 3000);
    };

    const reqButton = async (status, requestId) => {
        try {
            const response = await reviewConnectionRequest(status, requestId);
            console.log('Response from server:', response);
            if (response?.status === 200) {
                getConnections();
                setToasterMessage('Request status updated successfully.');
                handleToaster('Request status updated successfully.');
            } else {
                console.error('Failed to update request status:', response?.message || 'Unknown error');
                setToasterMessage('Failed to update request status.');
                handleToaster('Failed to update request status.');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
            handleToaster('An error occurred while updating request status.');
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    return (
        <div>
            <h2>Requests</h2>
            {showToaster && <Toaster message={toasterMessage} />}
            {requests?.length === 0 && <p className='no-connections'>You have no connection requests at the moment. Please check back later.</p>}
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