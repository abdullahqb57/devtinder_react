import React, {useEffect} from 'react'
import {fetchFeeds} from '../api/api'
import {useDispatch, useSelector} from 'react-redux'
import {setFeeds} from '../store/feedSlice'
import '../styles/feed.css'

const Feed = () => {
    const dispatch = useDispatch()
    const feeds = useSelector((state) => state.feed.feeds);

    const getFeeds = async () => {
        const data = await fetchFeeds();
        dispatch(setFeeds(data?.connections || []));
        console.log('Feeds data:', data);
        console.log('Feeds from Redux:', feeds);
    }
    useEffect(() => {
        getFeeds();
    }, [])
  return (
    <>
    {feeds?.length > 0 && <div className='feed'>
        <img src={feeds[0]?.photoUrl} alt="Feed" className='feed-image' />
        <h2>{feeds[0]?.firstName} {feeds[0]?.lastName}</h2>
        <h3>{feeds[0]?.about}</h3>
        <div className='feed-buttons'>
            <button className='feed-button'>Ignore</button>
            <button className='feed-button'>Interested</button>
        </div>
    </div>}
    </>
    
  )
}

export default Feed
