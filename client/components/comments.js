import React from 'react'
import timeSincePost from '../helpers/timeSincePost'
import { Comment } from 'semantic-ui-react'

export default (comments) => {
  return comments.comments.map((data, key) => (
    <Comment key={key}>
      <Comment.Avatar src={`http://localhost:443/images/avatars/${data.avatar}`} />
      <Comment.Content>
        <Comment.Author as='a'>{data.username}</Comment.Author>
        <Comment.Metadata>
        <div>{timeSincePost(data.createdAt)}</div>
        </Comment.Metadata>
        <Comment.Text>{data.comment}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  ))
}