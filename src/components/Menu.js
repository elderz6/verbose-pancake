import React from 'react';
import { Sidebar, Menu, Button, Segment, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class MenuComp extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      visible:false,

    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
  }

  handleButtonClick()
  {
    this.setState({ visible: !this.state });
  }
  handleSidebarHide()
  {
    this.setState({ visible: false });
  }

  render () {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleButtonClick}>Toggle visibility</Button>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          > 
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

        </Sidebar.Pushable>
      </div>
    );
  }
}

export default MenuComp;
