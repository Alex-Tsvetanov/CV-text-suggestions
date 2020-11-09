import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MistakeTrigger from './Mistake.js'

import logo from './icons/logo.svg'
import profile from './icons/profile.svg'
import bell from './icons/bell.svg'
import success from './icons/success.svg'

import './App.css';
import CV from './CV'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFocused: false
    };
    this.initBlurScreen();
    this.blur = this.blur.bind(this);
    this.unblur = this.unblur.bind(this);
  }
  initBlurScreen() {
      this.blurScreen = <div className="blur"></div>;
  }
  blur () {
    this.setState({
        isFocused: true
    })
  }
  unblur () {
    this.setState({
        isFocused: false
    })
  }
  componentDidUpdate() {
    this.initBlurScreen();
  }
  focus = () => {
    console.log ('state changed', this.state.isFocused);
    if (!this.state.isFocused)
      this.blur();
    else
      this.unblur();
  }
  render () {
    return (
      <>
        {this.state.isFocused ?
        <div className="blur" style={{display: 'block'}}></div>
        :
        <div className="blur" style={{display: 'none'}}></div>
        }
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="#home"><img src={logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#link">Help</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <img src={bell} alt='notifications' />
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} className="icon"><img src={profile} alt='profile' /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Hello there!</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="system-box">
          <Row>
            <Col className="system-left" sm="6">
              <span className="system-text bold">Resume name:</span> <input className="system-text system-input" placeholder="Your resume" />
            </Col>
            <Col className="system-right" sm="6">
            <span className="system-text">Saved</span> <img src={success} /> <span className="system-text">Last editted just now</span>
            </Col>
          </Row>
        </Container>
        <CV focus={this.focus}/>
        <div style={{height:'60px'}}></div>
      </>
    )
  }
};

export default App;
