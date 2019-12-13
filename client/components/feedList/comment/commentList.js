import React from 'react'
import CommentItem from './commentItem'

export default ({ comments }) => {
  const commentData = Object.values(comments)
    return commentData.map((data, key) => (
      <CommentItem 
        key={key} 
        avatar={data.avatar}
        username={data.username}
        createdAt={data.createdAt}
        comment={data.comment}
      />
    ))
}