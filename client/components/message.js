import { Segment, Icon, Image, Item, Label, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Message = () => (
  <div>
    <Segment className='item' floated='left'>
      <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
      <span>Username</span>
    </Segment>

    <Segment className='item' floated='right'>
      <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
      <span>Username</span>
    </Segment>

    <Segment className='item' floated='left'>
      <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
      <span>Username</span>
    </Segment>
 
    <Segment className='item' floated='right'>
      <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
      <span>Username</span>
    </Segment>
    <style jsx>{`
        div.ui.segment {
          margin-top: 4em;
          color: red !important;
        }
      `}</style>
  </div>
)

export default Message
