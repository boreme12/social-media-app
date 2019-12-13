import React from 'react'
import CommentList from './commentList'
import apiRequest from '../../../helpers/apiRequest'
import { Feed, Comment, Button, Form, Header } from 'semantic-ui-react'

const createElementFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild; 
}

const onCommentRequest = async (postId, comment, token, userId, username, avatar) => {
  const body = {
    'userId': userId,
    'username': username,
    'avatar': avatar,
    'comment': comment
  }

  const fetchResponse = await apiRequest('PUT', token, `http://localhost:443/posts/comment/${postId}`, body)
  const res = await fetchResponse.json()
  return res
}

const onCommentClick = async (e, postId, commentCount, avatar, username, token, userId) => {
  const button = e.target
  const comment = button.previousSibling.firstElementChild
  const htmlString = `
  <div class="comment">
    <div class="avatar">
      <img src="http://localhost:443/images/avatars/${avatar}">
    </div>
    <div class="content">
      <a class="author">${username}</a>
      <div class="metadata">
        <div>Just now</div>
      </div>
      <div class="text">${comment.value}</div>
      <div class="actions">
        <a class="">Reply</a>
      </div>
    </div>
  </div>`
  const commentElement = createElementFromHTML(htmlString)
  const commentInt = button.parentElement.parentElement.parentElement.previousSibling.firstChild.lastChild
  
  onCommentRequest(postId, comment.value, token, userId, username, avatar).then(resp => {
    if(resp.status === 'success'){
      commentCount === 0 
        ? button.parentElement.insertAdjacentElement('afterbegin', commentElement)
        : button.parentElement.previousSibling.appendChild(commentElement)

      comment.value = ''
      commentInt.textContent++
    }
  })
}

export default ({commentCount, comments, PostId, avatar, username, token, userId}) => (
  <Feed.Extra style={{marginLeft: 0, display: 'none'}}>
    <Comment.Group style={{ width: 350, marginTop: 15}}>
      <Header as='h3' dividing>
        Comments
      </Header>
      {
        commentCount > 0 && 
          <CommentList comments={comments}/>
      }
      <Form reply>
        <Form.TextArea />
        <Button 
          content='Add Reply' 
          labelPosition='left' 
          icon='edit' 
          primary 
          onClick={(e) => onCommentClick(e, PostId, commentCount, avatar, username, token, userId)}
        />
      </Form>
    </Comment.Group>
  </Feed.Extra>
)