import React from 'react'
import Link from 'next/link'
import { Form, Grid, Header, Message, Segment, Step } from 'semantic-ui-react'
import stepData from '../components/register/step.json'
import 'semantic-ui-css/semantic.min.css'
import UserDetails from '../components/register/userDetails'
import UserAvatar from '../components/register/userAvatar'
import UserBio from '../components/register/userBio'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      step: 1,
      id: '',
      username: '',
      image: ''
    }
  }

  nextPage = (dataObj) => {
    this.setState(prevState => ({ 
      step: prevState.step+1
      , ...dataObj
    }))
  }

  stepMobileData = () => {
    let stepMobileData = Object.values(stepData.map(a =>({...a})))

    for (let index = 0; index < 3; index++) {
      delete stepMobileData[index].icon
    }
    return stepMobileData
  }

  updateStep = () => {
    this.state.step === 2 && (
      stepData[0].active = false,
      stepData[0].completed = true,
      stepData[1].active = true,
      stepData[1].disabled = false
    )
    this.state.step === 3 && (
      stepData[0].active = false,
      stepData[0].completed = true,
      stepData[1].active = false,
      stepData[1].disabled = false,
      stepData[1].completed = true,
      stepData[2].active = true,
      stepData[2].disabled = false
    )
  }

  render() {
    const { id, username, image } = this.state
    this.updateStep()
    return (
      <>
        <Grid textAlign='center' style={{ maxWidth: 500, height: '100vh', marginLeft: 'auto', marginRight: 'auto' }}>
          <Grid.Row only='computer tablet' style={{ padding: '2em'}} >
            <Grid.Column>
              <Step.Group widths={3} items={stepData}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column>
              <Step.Group items={this.stepMobileData()} style={{ marginTop: '1em' }} unstackable widths={3}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1' textAlign='center'>
                Register
              </Header>
              <Form size='large'>
                <Segment stacked>
                  { this.state.step === 1 && <UserDetails nextPage={this.nextPage} />}     
                  { this.state.step === 2 && <UserAvatar id={id} nextPage={this.nextPage} /> }
                  { this.state.step === 3 && <UserBio username={username} id={id} image={image} /> }        
                </Segment>
              </Form>
              { 
                this.state.step === 1 && (
                <Message>
                  Already have an account? <Link href='/login'><a>Login</a></Link>
                </Message>)
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default Register
