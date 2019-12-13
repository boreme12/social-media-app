import React from 'react'
import timeSincePost from '../../../helpers/timeSincePost'
import { Comment } from 'semantic-ui-react'

export default ({ avatar, username, createdAt, comment }) => (
  <Comment>
    <Comment.Avatar src={`http://localhost:443/images/avatars/${avatar}`} />
    <Comment.Content>
      <Comment.Author as='a'>{username}</Comment.Author>
      <Comment.Metadata>
      <div>{timeSincePost(createdAt)}</div>
      </Comment.Metadata>
      <Comment.Text>{comment}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
)