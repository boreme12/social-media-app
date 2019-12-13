import React from 'react'
import { Feed } from 'semantic-ui-react'
import FeedItem from './feedItem';

export default ({ posts, userId, token, username }) => {
  if (!posts) {
    return <h1>Error getting posts</h1>
  } 

  return(
    <Feed size='large'>
      {
        posts.map((post, key) => 
          <FeedItem
            key={key} 
            post={post} 
            userId={userId} 
            token={token} 
            username={username}
          />
        )
      }
    </Feed>
  )
}
  

