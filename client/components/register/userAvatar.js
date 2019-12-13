import React, { Component } from 'react'
import { Button, Segment, Header, Icon, Message } from 'semantic-ui-react'

class ProfilePicture extends Component {
  constructor(){
    super()
    this.state = {
      image: null,
      error: false,
      errorInfo: []
    }
    this.fileInputRef = React.createRef();
  }

  validateImage = () => {
    const { image } = this.state
    const fileName = image.name,
          fileExt = fileName.substring(fileName.lastIndexOf(".") + 1),
          ImageSizeMB = image.size / Math.pow(1024,2)

    if(image === null) {
      this.setState({
        error: true, 
        errorInfo: ['Image must be selected']
      })
    }

    if(!["jpg", "jpeg", "png"].includes(fileExt)) {
      this.setState({
        error: true, 
        errorInfo: ['Image format must be JPEG or PNG']
      })
    }

    if(ImageSizeMB >= 10) {
      this.setState(prevState => ({
        error: true, 
        errorInfo: [...prevState.errorInfo, 'Image size must be less than 10mb']
      }))
    }
  }

  onSubmit = () => {
    this.setState({error: false})
    this.validateImage()
    !this.state.error && this.handleRequest()
  }

  handleRequest = async () => {
    const { id } = this.props
    const { image } = this.state
    const token = window.sessionStorage.getItem('token')

    let formData = new FormData()
    formData.append("avatar", image)
    formData.append('type', 'file')
    formData.append('enctype', 'multipart/form-data')

    const settings = {
      method: 'PUT',
      headers: {
        'Authorization': token
      },
      body: formData
    }
    
    const fetchResponse = await fetch(`http://localhost:443/users/image/${id}`, settings)
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
      const stateObj = { image: respObj.image }
      this.props.nextPage(stateObj)
    }
  }

  onFileChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  onFileClick = () => {
    this.fileInputRef.current.click()
  }

  render(){
    const { nextPage } = this.props
    const { error, errorInfo } = this.state
    return(
      <>
        <Segment placeholder>
          {error &&
            <Message
              negative
              header='Error'
              list={errorInfo}
            />
          }
          <Header icon>
            <Icon name='picture' />
            Please upload a profile picture
          </Header>
          <Segment basic>
            <Button
              content="Choose Image"
              labelPosition="left"
              icon="file"
              fluid size='large'
              onClick={() => this.onFileClick()}
            />
          </Segment>
        </Segment>
        
        <input
          ref={this.fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg,"
          name='avatar'
          hidden
          onChange={this.onFileChange}
        />
        <Segment basic>
          <Button onClick={() => this.onSubmit()} color='teal'  size='large'>
            Continue
          </Button>
        </Segment>
      </>
    )
  }

} 

export default ProfilePicture