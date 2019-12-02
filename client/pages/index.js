import React from 'react'
import Router from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import Nav from '../components/nav'
import AuthenticateSession from '../helpers/authenticateSession'
import PostFeed from '../components/postFeed'
import { Form, Grid, Button, Segment } from 'semantic-ui-react'


class index extends React.Component{
  constructor(){
    super()
    this.state = {
      id: '',
      token: '',
      avatar: '',
      email: '',
      username: '',
      message: '',
      isPostsLoaded: false,
      posts: {},
    }
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  loadPosts = async () => {
    const settings = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      }
    }

    const fetchResponse = await fetch('http://localhost:443/posts', settings)
    const posts = await fetchResponse.json()

    this.setState({
      posts,
      isPostsLoaded: true
    })
  }

  savePost = async () => {
    const { token, message, id} = this.state
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        'message': message
      })
    }

    const fetchResponse = await fetch(`http://localhost:443/posts/${id}`, settings)
    const res = await fetchResponse.json()

    if(res.status === 'success'){
      this.setState({message: ''})
      this.loadPosts()
    } else {
      console.log('error getting posts')
    }
  }

  onStatusChange = (event) => {
    this.setState({
      message: event.target.value
    })
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
          username: userData.username
        })
        this.loadPosts()
      }
    })
  }

  render() {
    const { posts, id, token, username, avatar} = this.state
    return(
      <>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column>
              <Nav page='home' username={username} avatar={avatar}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 600 }}>
              <Form>
                <Segment>
                  <Form.Field 
                    label='Update your status!' 
                    control='textarea' 
                    rows='3'
                    value={this.state.message}
                    onChange={this.onStatusChange}/>
                  <Button onClick={() => this.savePost()}>Update Status</Button>
                </Segment>
              </Form>
              <PostFeed posts={posts} userId={id} token={token} username={username} avatar={avatar}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default index
