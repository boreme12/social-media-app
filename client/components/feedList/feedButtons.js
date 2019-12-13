import React from 'react'
import { Feed, Icon, Label} from 'semantic-ui-react'
import apiRequest from '../../helpers/apiRequest'

const onClickComment = (e) => {
  const button = e.target.parentElement
  if(button.classList.contains('extra')){
    button.nextSibling.style.display === 'none'
      ? button.nextSibling.style.display = 'inline'
      : button.nextSibling.style.display = 'none'
  } else {
    button.parentElement.nextSibling.style.display === 'none'
    ? button.parentElement.nextSibling.style.display = 'inline'
    : button.parentElement.nextSibling.style.display = 'none'
  }
}

const onClickLike = (e, id, token, userId, username) => {
  let like = e.target.tagName === 'I'
    ? e.target
    : e.target.firstElementChild
  let likeCount = like.nextSibling

  const isLiked = like.classList.contains('red') === true

  if (isLiked) {
    like.classList.remove('red')
    likeCount.textContent--
  } else {
    like.classList.add('red')
    likeCount.textContent++
  }
  sendLikeRequest(isLiked, id, token, userId, username)
}

const sendLikeRequest = async (isLiked, id, token, userId, username) => {
  let method, body

  if (isLiked === true) {
    method = 'DELETE'
    body = {
      'userId': userId,
    }
  } else {
    method = 'PUT'
    body = {
      'userId': userId,
      'username': username
    }
  }

  try {
    const fetchResponse = await apiRequest(method, token, `http://localhost:443/posts/like/${id}`, body)
    const res = await fetchResponse.json()

    if(res.status !== 'success'){
      console.log('error like request')
    }
  } catch (err) {
    console.log(err)
  }
}


export default ({likes, likeCount, postId, commentCount, userId, token, username}) => (
  <>
    <Feed.Like>
      <Label onClick={(e) => onClickLike(e, postId, token, userId, username)}>
        <Icon 
          name='like' 
          className={likes.some(item => item.userId === userId) ? 'red' : null}
        />{likeCount}
      </Label>
    </Feed.Like>
    <Feed.Extra 
      style={{display: 'inherit', cursor: 'pointer'}} 
      onClick={(e) => onClickComment(e)}
    >
      <Label>
        <Icon link className='commentContainer' 
          name='comment' 
        />{commentCount}
      </Label>
    </Feed.Extra>
  </>
)