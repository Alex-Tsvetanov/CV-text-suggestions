import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image, { propTypes } from 'react-bootstrap/Image'

import './CV.css';
import userphoto from './icons/user photo.svg'
import phone from './icons/phone.svg'
import website from './icons/website.svg'
import email from './icons/email.svg'
import location from './icons/location.svg'
import date from './icons/date.svg'
import plus from './icons/plus.svg'
import trash from './icons/trash.svg'

import { render, unstable_renderSubtreeIntoContainer } from 'react-dom';

const SectionTitle = ({ children }) => (
    <>
        <div className="sectionTitle">
            {children}
        </div>
    </>
)

const Section = (props) => (
    <>
        <Col sm="6" className="section">
            <SectionTitle>{props.name}</SectionTitle>
            {props.children}
        </Col>
    </>
)

const ExperienceItem = React.forwardRef((props, ref) => {
    return (
    <>
    {
    props.className != 'experienceDescription' ?
            <input onClick={props.onClick} type="text" name={props.name} onChange={evt => props.callback(evt)} className={props.className} ref={ref} placeholder={props.children}></input>
        :
            <textarea onClick={props.onClick} type="text" name={props.name} onChange={evt => props.callback(evt)} className={props.className} ref={ref} placeholder={props.children}></textarea>
    }
    </>
)})

const ExperienceItemValue = (props) => {
    return (
    <>
    {props.value == '' || props.value === undefined ?
        <div onClick={props.onClick} className={props.className}>
            {props.children}
        </div>
    :
        <div onClick={props.onClick} className={props.className}>
            {props.value}
        </div>
    }
    </>
)}

class ExperienceEntity extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isFocused: false,
            title: React.createRef(),
            company: React.createRef(),
            period: React.createRef(),
            location: React.createRef(),
            description: React.createRef(),
            titleValue: '',
            companyValue: '',
            periodValue: '',
            locationValue: '',
            descriptionValue: '',
          };
        this.setState (this.state);
        this.focus = this.focus.bind(this);
        this.unfocus = this.unfocus.bind(this);
        this.styles = this.styles.bind(this);
        this.onInputchange = this.onInputchange.bind(this);
    }
    f = function (x) {
        if (x !== undefined)
        {
            if (x.current !== undefined)
            {
                if (x.current.value !== undefined)
                {
                    return x.current.value;
                }
                return x.current;
            }
            return x;
        }
        return '';
    }
    styles = function () {
        if (this.state.isFocused) {
            return {
                border: '1px solid #2DC08D',
                boxSizing: 'border-box',
                borderRadius: '9px',
                position: 'relative',
                zIndex:2,
                backgroundColor:'white'
            };
        }
        else
            return {};
    }
    focus = function () {
        if (!this.state.isFocused) {
            this.props.onClick();
            console.log (
                this.state.title       .current.value,'|',
                this.state.company     .current.value,'|',
                this.state.period      .current.value,'|',
                this.state.location    .current.value,'|',
                this.state.description .current.value,'|',
            );
            this.state.isFocused = true;
            this.setState({
                isFocused: true,
                title: this.state.title,
                titleValue: this.f(this.state.title),
                company: this.state.company,
                companyValue: this.f(this.state.company),
                period: this.state.period,
                periodValue: this.f(this.state.period),
                location: this.state.location,
                locationValue: this.f(this.state.location),
                description: this.state.location,
                descriptionValue: this.f(this.state.description),
            });
            console.log (this.state);
        }
    }
    unfocus = function () {
        if (this.state.isFocused) {
            this.props.onClick();
            console.log (
                this.state.title       .current.value,'|', 
                this.state.company     .current.value,'|',
                this.state.period      .current.value,'|',
                this.state.location    .current.value,'|',
                this.state.description .current.value,'|',
            );
            this.state.isFocused = false;     
            this.setState({
                isFocused: false,
                title: this.state.title,
                titleValue: this.f(this.state.title),
                company: this.state.company,
                companyValue: this.f(this.state.company),
                period: this.state.period,
                periodValue: this.f(this.state.period),
                location: this.state.location,
                locationValue: this.f(this.state.location),
                description: this.state.location,
                descriptionValue: this.f(this.state.description),
            });  
            console.log (this.state);
        }
    }

    onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    render = function () {
        let items = <>
            <ExperienceItem name="titleValue" callback={this.onInputchange} onClick={this.focus} className="experienceTitle" ref={this.state.title}>Title</ExperienceItem>
            <ExperienceItem name="companyValue" callback={this.onInputchange} onClick={this.focus} className="experienceCompany" ref={this.state.company}>Company name</ExperienceItem>
            <Image src={date}></Image> <ExperienceItem name="periodValue" callback={this.onInputchange} onClick={this.focus} className="experiencePeriod" ref={this.state.period}>Date period</ExperienceItem>
            <Image src={location}></Image> <ExperienceItem name="locationValue" callback={this.onInputchange} onClick={this.focus} className="experienceLocation" ref={this.state.location}>New York, NY</ExperienceItem>
            <ExperienceItem name="descriptionValue" callback={this.onInputchange} onClick={this.focus} className="experienceDescription" ref={this.state.description}>Company description</ExperienceItem>
        </>
        let values = <>
            <ExperienceItemValue value={this.f(this.state.titleValue)} onClick={this.focus} className="experienceTitle">Title</ExperienceItemValue>
            <ExperienceItemValue value={this.f(this.state.companyValue)} onClick={this.focus} className="experienceCompany">Company name</ExperienceItemValue>
            <Image src={date}></Image> <ExperienceItemValue value={this.f(this.state.periodValue)} onClick={this.focus} className="experiencePeriod">Date period</ExperienceItemValue>
            <Image src={location}></Image> <ExperienceItemValue value={this.f(this.state.locationValue)} onClick={this.focus} className="experienceLocation">New York, NY</ExperienceItemValue>
            <ExperienceItemValue value={this.f(this.state.descriptionValue)} onClick={this.focus} className="experienceDescription">Company description</ExperienceItemValue>
        </>
        return (
            <>
            <div className="entity" style={this.state.isFocused ? {
                    border: '1px solid #2DC08D',
                    boxSizing: 'border-box',
                    borderRadius: '9px',
                    position: 'relative',
                    zIndex:2,
                    backgroundColor:'white'
                }:{
                    border: '0px solid #2DC08D',
                    boxSizing: 'border-box',
                    borderRadius: '0px',
                    position: 'relative',
                    zIndex:0,
                    backgroundColor:'transperant'
                }}>
                <ButtonGroup className="actions" style={this.state.isFocused ? {visibility: 'visible'} : {visibility: 'hidden'} } aria-label="Basic example">
                    <Button onClick={this.unfocus} variant="success"><Image src={plus} /> New entry</Button>
                    <Button onClick={this.unfocus} variant="secondary"><Image src={trash} /> </Button>
                </ButtonGroup>
                <div style={this.state.isFocused ? {display: 'none'} : {display: 'block'} }>
                    {values}
                </div>
                <div style={this.state.isFocused ? {display: 'block'} : {display: 'none'} }>
                    {items}
                </div>
            </div>
            </>
        )
    }
}

const CV = function (props) {
    const focus = props.focus;
  return (
    <>
        <Container className="cv">
            <Row className="personal">
                <Col md="10">
                    <input className="name" placeholder="Your name" />
                    <input className="subtext" placeholder="Your next desired role?" />
                    <Row>
                        <Col sm="4">
                            <img src={phone} alt="Phone" /> <input className="contact" placeholder="Phone" />
                        </Col>
                        <Col sm="4">
                            <img src={email} alt="Email" /> <input className="contact" placeholder="Email" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="4">
                            <img src={website} alt="Website/Link" /> <input className="contact" placeholder="Website/Link" />
                        </Col>
                        <Col sm="4">
                            <img src={location} alt="Location" /> <input className="contact" placeholder="Location" />
                        </Col>
                    </Row>
                </Col>
                <Col md="2">
                    <Image className="circled profiel-iamge" src={userphoto} alt="User picture" fluid />
                </Col>
            </Row>
            <Row className="sectionContainer">
                <Section name="Experience">
                    <ExperienceEntity onClick={focus}></ExperienceEntity>
                </Section>
            </Row>
        </Container>
    </>
  );
}

export default CV;
