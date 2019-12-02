import React, { Component } from 'react'
import Router from 'next/router'
import { Form, Button, Image, Segment, Label, Icon, Message } from 'semantic-ui-react'

class userBio extends Component {
  constructor(){
    super()
    this.state = {
      bio: '',
      avatar: null,
      error: false,
      errorInfo: []
    }
    this.updateInput = this.updateInput.bind(this)
  }

  validateForm = () => {
    return this.state.bio.length < 20 ? true : false
  }

  onSubmit = () => {
    const isError = this.validateForm()

    if(!this.state.error && !isError){
      this.handleBioRequest()
    } else {
      this.setState({
        error: true,
        errorInfo: ['Bio must contain atleast 20 characters']
      })
    }
  }

  handleBioRequest = async () => {
    const { bio } = this.state
    const token = window.sessionStorage.getItem('token')
    const settings = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'PUT',
      body: JSON.stringify({ bio })
    }

    const fetchResponse = await fetch(`http://localhost:443/users/bio/${this.props.id}`, settings)
    const resp = await fetchResponse;
    const respObj = await resp.json()

    if(respObj.status === 'fail'){
      this.setState({
        error: true,
        errorInfo: [respObj.message]
      })
    } else if(respObj.status === 'error') {
      this.setState({
        error: true,
        errorInfo: 'Internal server error'
      })
    } else if (respObj.status === 'success') {
      await this.handleAuthRevokeRequest()
    }
  }

  handleAuthRevokeRequest = async () => {
    const token = window.sessionStorage.getItem('token')
    const settings = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST'
    }

    const fetchResponse = await fetch(`http://localhost:443/auth/revoke`, settings)
    const resp = await fetchResponse;
    const respObj = await resp.json()

    if (respObj.status === 'success') {
      window.sessionStorage.removeItem('token')
      Router.push('/login')
    } else {
      this.setState({
        error: true,
        errorInfo: 'Internal server error'
      })
    }
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false
    })
  }

  render(){
    return(
      <>
        <Segment basic>
          <Image src={'http://localhost:443/images/avatars/'+this.props.image} size='small' circular centered/>
        </Segment>
        <Segment basic>
          <Label size='big'>
            <Icon name='at' size='large' style={{ marginRight: '5px' }} />
            {this.props.username}
          </Label>
        </Segment>
        <Segment basic>
          {this.state.error &&
            <Message
              negative
              header='Error'
              list={this.state.errorInfo}
            />
          }
          <Form.TextArea
            onChange={this.updateInput} 
            name='bio'
            placeholder='Enter bio information'
          />
          <Button onClick={() => this.onSubmit()} color='teal' fluid size='large'>
            Finish
          </Button>
        </Segment>
      </>
    )
  }

} 

export default userBio