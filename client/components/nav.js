import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Modal from '../components/modal'
import Profile from '../components/profile'
import { Menu, Dropdown, Image } from 'semantic-ui-react'

class Nav extends React.Component{
  constructor() {
    super()
    this.state = {
      isProfileOpen: false,
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  signOut = () => {
    window.sessionStorage.removeItem('token')
    Router.push('/login')
  }

  handleOnChange = (e, data) => {
    console.log(data.value)
    data.value === 'account'
      ? this.toggleModal()
      : this.signOut()
  }

  render() {
    const { isProfileOpen } = this.state
    const { page, avatar} = this.props

    const options = [
      { key: 'user', text: 'Account', icon: 'user', value: 'account', },
      { key: 'signOut', text: 'Sign Out', icon: 'sign out', value: 'signOut' },
    ]
    
    const trigger = (
      <span>
        <Image avatar src={`http://localhost:443/images/avatars/${avatar}`} />
      </span>
    )
    
    return (
      <>
        <Menu pointing secondary>
          <Link href='/' passHref>
            <Menu.Item name='home' active={page === 'home'} />
          </Link>
          <Link href='/messages' passHref>
            <Menu.Item name='messages' active={page === 'messages'} />
          </Link>
          <Link href='/friends' passHref>
           <Menu.Item name='friends' active={page === 'friends'} />
          </Link>       
          <Menu.Menu position='right'>
          <Dropdown
            trigger={trigger}
            options={options}
            pointing='top left'
            icon={null}
            onChange={this.handleOnChange}
          />
          </Menu.Menu>
        </Menu>
        { isProfileOpen && 
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} avatar={avatar}/>
          </Modal>
        }
        
      </>
    )
  }
}


export default Nav
