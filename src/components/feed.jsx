import React, { useEffect, useState } from 'react'
import { fetchFeeds, sendConnectionRequest } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import '../styles/feed.css'

const Feed = () => {
  const [feeds, setFeeds] = useState([])

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: true,
  })

  useEffect(() => {
    console.log('Feeds data:~~~~~~~~~~~~', data)
    if (data?.connections.length > 0) {
      setFeeds(Array.isArray(data.connections) ? data.connections : [])
    }
  }, [data])

  const respondToConnectionRequest = async (action, toUserId) => {
    try {
      const response = await sendConnectionRequest(action, toUserId)
      if (response?.status === 200) {
        refetch()
      }
    } catch (error) {
      console.error('Error updating connection request status:', error)
    }
  }

  if (isLoading) {
    return <p className='loading'>Loading feed...</p>
  }

  if (isError) {
    return <p className='error'>Unable to load feed. Please try again later.</p>
  }

  if (feeds.length === 0) {
    return <p className='no-feeds'>No new connections in your feed. Please check back later.</p>
  }

  return (
    <>
      {feeds.map((feed) => (
        <div className='feed' key={feed._id || feed.id}>
          <img src={feed.photoUrl || undefined} alt={`${feed.firstName} ${feed.lastName}`} className='feed-image' />
          <h2>{feed.firstName} {feed.lastName}</h2>
          <h3>{feed.about}</h3>
          <div className='feed-buttons'>
            <button className='feed-button' onClick={() => respondToConnectionRequest('ignored', feed._id)}>
              Ignore
            </button>
            <button className='feed-button' onClick={() => respondToConnectionRequest('interested', feed._id)}>
              Interested
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Feed
