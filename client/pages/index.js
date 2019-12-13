import React from 'react'
import Router from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import Nav from '../components/nav'
import AuthenticateSession from '../helpers/authenticateSession'
import FeedList from '../components/feedList/feedList'
import { Grid } from 'semantic-ui-react'
import apiRequest from '../helpers/apiRequest'
import UpdateStatus from '../components/updateStatus'


class index extends React.Component{
  constructor(){
    super()
    this.state = {
      id: '',
      token: '',
      avatar: '',
      email: '',
      username: '',
      isLoaded: false,
      isPostsLoaded: false,
      posts: {},
    }
  }

  loadPosts = async () => {
    try {
      const fetchResponse = await apiRequest('GET', this.state.token, 'http://localhost:443/posts')
      const res = await fetchResponse.json()
      const posts = Object.values(res.data)
      this.setState({
        posts: posts,
        isPostsLoaded: true
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount(){
    AuthenticateSession().then( userData => {
      if(!userData.success){
        Router.push('/login')
      } else {
        this.setState({ 
          id: userData.id, 
          token:userData.token, 
          avatar: userData.avatar, 
          email: userData.email,
          username: userData.username,
          isLoaded: true
        })
        this.loadPosts()
      }
    })
  }

  render() {
    const { posts, id, token, username, avatar, isLoaded, isPostsLoaded} = this.state
    { return isLoaded &&
      (
        <>
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column>
                <Nav page='home' username={username} avatar={avatar}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ maxWidth: 600 }}>
                <UpdateStatus token={token} id={id} loadPosts={this.loadPosts}/>
                { 
                  isPostsLoaded && 
                    <FeedList posts={posts} userId={id} token={token} username={username} avatar={avatar}/>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      )
    }
  }
}

export default index
