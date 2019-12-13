import React from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'
import apiRequest from '../helpers/apiRequest'

class UpdateStatus extends React.Component{
  constructor(){
    super()
    this.state = {
      message: ''
    }
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  onStatusChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  savePost = async () => {
    const { message } = this.state
    const { token, id, loadPosts } = this.props
    const body = { 
      'message': message
    }

    try {
      const fetchResponse = await apiRequest('POST', token, `http://localhost:443/posts/${id}`, body)
      const res = await fetchResponse.json()
      
      if(res.status === 'success'){
        this.setState({message: ''})
        loadPosts()
      } else {
        console.log('error getting posts')
      }
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return(
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
    )
  }
}

export default UpdateStatus