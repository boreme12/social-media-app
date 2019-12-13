import React from 'react'
import { Feed } from 'semantic-ui-react'
import timeSincePost from '../../helpers/timeSincePost'

export default ({ username, createdAt, message }) => (
  <>
    <Feed.Summary>
      <a>{username}</a> updated their status
      <Feed.Date>{timeSincePost(createdAt)}</Feed.Date>
    </Feed.Summary>
    <Feed.Extra text>
      {message}
    </Feed.Extra>
  </>
)