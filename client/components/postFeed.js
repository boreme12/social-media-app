import React from 'react'
import { Feed, Icon, Label, Comment, Button, Form, Header } from 'semantic-ui-react'
import apiRequest from '../helpers/apiRequest'
import Comments from './comments'
import timeSincePost from '../helpers/timeSincePost'

class PostFeed extends React.Component {

  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    return div.firstChild; 
  }

  sendLikeRequest = async (isLiked, id) => {
    const { token, userId, username } = this.props
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

    const fetchResponse = await apiRequest(method, body, token, `http://localhost:443/posts/like/${id}`)
    const res = await fetchResponse.json()
  }

  onClickLike = (e, id) => {
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
    this.sendLikeRequest(isLiked, id)
  }

  onClickComment = (e) => {
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
  onCommentRequest = async (postId, comment) => {
    const { token, userId, username, avatar} = this.props
    const body = {
      'userId': userId,
      'username': username,
      'avatar': avatar,
      'comment': comment
    }

    const fetchResponse = await apiRequest('PUT', body, token, `http://localhost:443/posts/comment/${postId}`)
    const res = await fetchResponse.json()
  
    return res
  }

  onCommentClick = async (e, postId, commentCount) => {
    const { username, avatar } = this.props
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
    const commentElement = this.createElementFromHTML(htmlString)
    const commentInt = button.parentElement.parentElement.parentElement.previousSibling.firstChild.lastChild
    
    this.onCommentRequest(postId, comment.value).then(resp => {
      if(resp.status === 'success'){
        commentCount === 0 
          ? button.parentElement.insertAdjacentElement('afterbegin', commentElement)
          : button.parentElement.previousSibling.appendChild(commentElement)

        comment.value = ''
        commentInt.textContent++
      }
    })
  }

  render(){
    const { posts, userId } = this.props
    return(
      <Feed size='large'>
      { posts.data &&
          posts.data.map((post, key) => (
            <Feed.Event key={key}>
                <Feed.Label image={`http://localhost:443/images/avatars/${post.avatar}`} />
                <Feed.Content>
                  <Feed.Summary>
                    <a>{post.username}</a> updated their status
                    <Feed.Date>{timeSincePost(post.createdAt)}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    {post.message}
                  </Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <Label onClick={(e) => this.onClickLike(e, post._id)}>
                        <Icon 
                          name='like' 
                          className={post.likes.some(item => item.userId === userId) ? 'red' : null}
                        />{post.likeCount}
                      </Label>
                    </Feed.Like>
                    <Feed.Extra 
                      style={{display: 'inherit', cursor: 'pointer'}} 
                      onClick={(e) => this.onClickComment(e)}
                    >
                      <Label>
                        <Icon link className='commentContainer' 
                          name='comment' 
                        />{post.commentCount}
                      </Label>
                    </Feed.Extra>
                    <Feed.Extra style={{marginLeft: 0, display: 'none'}}>
                      <Comment.Group style={{ width: 350, marginTop: 15}}>
                        <Header as='h3' dividing>
                          Comments
                        </Header>
                        {
                          post.comments.length > 0 && <Comments comments={post.comments}/>
                        }
                        <Form reply>
                          <Form.TextArea />
                          <Button 
                            content='Add Reply' 
                            labelPosition='left' 
                            icon='edit' 
                            primary 
                            onClick={(e) => this.onCommentClick(e, post._id, post.commentCount)}
                          />
                        </Form>
                      </Comment.Group>
                    </Feed.Extra>
                  </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
          ))
      }
    </Feed>
    )
  }
}

export default PostFeed
