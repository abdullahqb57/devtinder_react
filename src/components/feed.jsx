import React, {useEffect} from 'react'
import {fetchFeeds} from '../api/api'
import {useDispatch, useSelector} from 'react-redux'
import {setFeeds} from '../store/feedSlice'
import {sendConnectionRequest} from '../api/api'
import '../styles/feed.css'

const Feed = () => {
    const dispatch = useDispatch()
    const feeds = useSelector((state) => state.feed.feeds);

    const getFeeds = async () => {
        const data = await fetchFeeds();
        dispatch(setFeeds(data?.connections || []));
    }

    const respondToConnectionRequest = async (action, toUserId) => {
        try {
            const response = await sendConnectionRequest(action, toUserId);
            console.log('Response from server:', response);
            if (response?.status === 200) {
                getFeeds();
            } else {
                console.error('Failed to update connection request status:', response?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error updating connection request status:', error);
        }
    };

    useEffect(() => {
        getFeeds();
    }, []);

  return (
    <>
    {feeds?.length === 0 && <p className='no-feeds'>No new connections in your feed. Please check back later.</p>}
    {feeds?.length > 0 && <div className='feed'>
        <img src={feeds[0]?.photoUrl || undefined} alt="Feed" className='feed-image' />
        <h2>{feeds[0]?.firstName} {feeds[0]?.lastName}</h2>
        <h3>{feeds[0]?.about}</h3>
        <div className='feed-buttons'>
            <button className='feed-button' onClick={() => respondToConnectionRequest('ignored', feeds[0]?._id)}>
                Ignore
            </button>
            <button className='feed-button' onClick={() => respondToConnectionRequest('interested', feeds[0]?._id)}>
                Interested
            </button>
        </div>
    </div>}
    </>
    
  )
}

export default Feed
