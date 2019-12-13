import React from 'react'
import { Feed } from 'semantic-ui-react'
import CommentContainer from './comment/commentContainer';
import FeedButtons from './feedButtons';
import Heading from './heading'

export default ({ post, userId, token, username}) => (
  <Feed.Event>
    <Feed.Label image={`http://localhost:443/images/avatars/${post.avatar}`} />
    <Feed.Content>
      <Heading 
        username={post.username} 
        createdAt={post.createdAt} 
        message={post.message}
      />
      <Feed.Meta>
        <FeedButtons 
          likes={post.likes} 
          likeCount={post.likeCount} 
          postId={post._id}
          commentCount={post.commentCount} 
          userId={userId}
          token={token} 
          username={username}
        />
        <CommentContainer 
          commentCount={post.commentCount} 
          comments={post.comments} 
          PostId={post._id}
          avatar={post.avatar}
          username={post.username}
          token={token}
          userId={userId}
        />
      </Feed.Meta>
    </Feed.Content>
  </Feed.Event>
)