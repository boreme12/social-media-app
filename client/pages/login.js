import React from 'react'
import Link from 'next/link'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Router from 'next/router'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: false,
      errorInfo: []
    }
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token)
  }

  onSubmit  = async () => {
    const token = window.sessionStorage.getItem('token')
    const tokenItem = token && {'Authorization': token}

    const settings = {
      headers: {
        'Content-Type':'application/json',
        ...tokenItem
      },
      method: 'POST',
      body: JSON.stringify({
        'email': this.state.email,
        'password': this.state.password,
      })
    }

    const fetchResponse = await fetch('http://localhost:443/login', settings)
    const data = await fetchResponse.json()
    if(data.status === 'fail'){
      this.setState({
        error: true,
        errorInfo: [data.message]
      })
    } else if(data.status === 'error') {
      this.setState({
        error: true,
        errorInfo: ['Internal server error']
      })
    } else if (fetchResponse.status === 201 && data.status === 'success' && data.token) {
      this.saveAuthTokenInSession(data.token)
      console.log('success created')
      Router.push('/index')
    } else if (fetchResponse.status === 202){
      console.log('success exists')
      Router.push('/index')
    }
  }

  updateInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              {this.state.error &&
                <Message
                  negative
                  header='Error'
                  list={this.state.errorInfo}
                />
              }
              <Form.Input 
                onChange={this.updateInput.bind(this)} 
                name='email'
                fluid 
                icon='user' 
                iconPosition='left' 
                placeholder='E-mail address' 
              />
              <Form.Input
                onChange={this.updateInput.bind(this)} 
                name='password'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button onClick={() => this.onSubmit()} color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link href='/register'><a>Sign Up</a></Link>
          </Message>
          </Grid.Column>
        </Grid>
    )
  }
}

export default Login
