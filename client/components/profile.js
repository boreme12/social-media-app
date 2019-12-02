import { Button, Form, Grid, Header, Segment, Image } from 'semantic-ui-react'
const Profile = ({isProfileOpen, toggleModal, avatar}) => {
  return(
    <div className='modal'>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, minWidth:300 }}>
        <Image src={`http://localhost:443/images/avatars/${avatar}`} size='small' circular centered />
          <Header as='h2' color='teal' textAlign='center'>
            Edit Profile
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.TextArea label='Bio'/>
              <Button color='teal'>
                Save
              </Button>
              <Button onClick={() => toggleModal()}>Cancel</Button>
            </Segment>
          </Form>
          </Grid.Column>
        </Grid>
      <style jsx>{`
        .modal {
          background-color: rgba(255,255,255, 0.8);
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center; 
        }
      `}</style>
    </div>
  )
}

export default Profile

