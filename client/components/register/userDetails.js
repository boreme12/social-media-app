import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import userDetailsData from './userDetails.json'

class UserDetails extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      username: '',
      error: false,
      errorInfo: []
    }
    this.updateInput.bind(this)
  }

  validateForm = () => {
    const {email, password, username} = this.state
    let error = false

    const setError = (info) => {
      error = true
      this.setState(prevState => ({ 
        error,
        errorInfo: [...prevState.errorInfo, info]
      }))
    }

    this.setState({errorInfo: []})

    if(email === '' || password === '' || username === '') {
      const info = 'Please fill out all of the form fields'
      setError(info)
    }

    if(password.length < 8) {
      const info = 'Password must be atleast 8 characters long'
      setError(info)
    }

    if(!email.includes('@') || !email.includes('.')) {
      const info = 'Email address is not valid'
      setError(info)
    }

    if(!error) {
      this.setState({
        error: false
      })
    }
  }

  onSubmit = () => {
    this.validateForm()     
    if(!this.state.error){
      this.handleRequest()
    }
  }

  handleRequest = async () => {
    const { username, email, password } = this.state
    const settings = {
      headers: new Headers({'content-type':'application/json'}),
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      })
    }

    const fetchResponse = await fetch('http://localhost:443/users', settings).catch(err => console.log('error!: ',err))
    const resp = await fetchResponse
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
      window.sessionStorage.setItem("token", respObj.data.token)
      const stateData = {
        id: respObj.data.id,
        username: respObj.data.username
      }
      this.props.nextPage(stateData)
    }
  }

  updateInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  userDetailsList = () => {
    return userDetailsData.map((data, key) => (
      <Form.Input
        key={key}
        onChange={this.updateInput} 
        name={data.name}
        fluid
        icon={data.icon}
        iconPosition='left'
        placeholder={data.placeholder}
        type={data.type}
      />
    ))
  }

  render(){
    const { error, errorInfo } = this.state
    return(
      <>
      {error &&
        <Message
          negative
          header='Error'
          list={errorInfo}
        />
      }
        <this.userDetailsList />
        <Button onClick={() => this.onSubmit()} color='teal' fluid size='large'>
          Register
        </Button>
      </>
    )
  }

} 

export default UserDetails