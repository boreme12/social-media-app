import React from 'react'
import fetch from 'isomorphic-unfetch'
import { throws } from 'assert';

class Add extends React.Component {
  onSubmit  = async () => {
    const settings = {
      headers: new Headers({'content-type':'application/json'}),
      method: 'POST',
      body: JSON.stringify({
        'username': this.username.value,
        'email': this.email.value,
        'bio': this.bio.value,
        'image': this.image.value,
        'password': this.password.value
      })
    }
    const response = await fetch('http://localhost:3030/register', settings)
    console.log(response)
  }

  render() {
    return (
      <>
        <h1>Add User</h1>
        <form>
          <input ref={node => (this.username = node)} placeholder='username' type='text' />
          <input ref={node => (this.email = node)} placeholder='email' type='email' />
          <input ref={node => (this.bio = node)} placeholder='bio' type='text' />
          <input ref={node => (this.image = node)} placeholder='image' type='text' />
          <input ref={node => (this.password = node)} placeholder='password' type='password' />
          <button type='button' onClick={() => this.onSubmit()}>save</button>
        </form>
      </>
    )
  }
}

export default Add