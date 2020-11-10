import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'

import './css/CV.css';
import userphoto from './icons/user photo.svg'
import phone from './icons/phone.svg'
import website from './icons/website.svg'
import email from './icons/email.svg'
import location from './icons/location.svg'
import date from './icons/date.svg'
import plus from './icons/plus.svg'
import trash from './icons/trash.svg'

import newId from './utils/newid';

import Section from './components/Section';
import ExperienceItem from './components/ExperienceItem';
import ExperienceItemValue from './components/ExperienceItemValue';

class ExperienceEntity extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.data = props.data;
        this.state = {
            isFocused: false,
            title: this.data().title,
            company: this.data().company,
            period: this.data().period,
            location: this.data().location,
            description: this.data().description,
            titleValue: this.f(this.data().title, 'Title'),
            companyValue: this.f(this.data().company, 'Company name'),
            periodValue: this.f(this.data().period, 'Date period'),
            locationValue: this.f(this.data().location, 'Location'),
            descriptionValue: this.f(this.data().description, 'Company description'),
        };
        this.id = props.data().id;
        this.setState (this.state);
        this.focus = this.focus.bind(this);
        this.unfocus = this.unfocus.bind(this);
        this.styles = this.styles.bind(this);
        this.save = this.save.bind(this);
        this.deleteElement = props.deleteElement;
        this.onInputchange = this.onInputchange.bind(this);
        //console.log ("EXP ID", props.data().id, this.id, 'DATA', this.data(), props.data());
    }
    f = function (x, y, z) {
        //console.log ('F ', x, y, z);
        if (y == 'value') {
            if (x == undefined || x == null || x.length == 0)
                return z;
            else
                return x;
        }
        else if (x != undefined && x != null && x.current != undefined && x.current != null && x.current.value != undefined && x.current.value != null && x.current.value.length > 0)
            return x.current.value;
        else
            return y;
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
            /*console.log (
                this.state.title       .current.value,'|',
                this.state.company     .current.value,'|',
                this.state.period      .current.value,'|',
                this.state.location    .current.value,'|',
                this.state.description .current.value,'|',
            );*/
            this.state.isFocused = true;
            this.setState({
                isFocused: true,
                titleValue: this.f(this.state.title, 'Title'),
                companyValue: this.f(this.state.company, 'Company name'),
                periodValue: this.f(this.state.period, 'Date period'),
                locationValue: this.f(this.state.location, 'Location'),
                descriptionValue: this.f(this.state.description, 'Company description'),
            });
            this.forceUpdate();
            //console.log (this.state);
        }
    }
    unfocus = function () {
        if (this.state.isFocused) {
            this.props.onClick();
            /*console.log (
                this.state.title       .current.value,'|', 
                this.state.company     .current.value,'|',
                this.state.period      .current.value,'|',
                this.state.location    .current.value,'|',
                this.state.description .current.value,'|',
            );*/
            this.state.isFocused = false;     
            this.setState({
                isFocused: false,
                titleValue: this.f(this.state.title, 'Title'),
                companyValue: this.f(this.state.company, 'Company name'),
                periodValue: this.f(this.state.period, 'Date period'),
                locationValue: this.f(this.state.location, 'Location'),
                descriptionValue: this.f(this.state.description, 'Company description'),
            });  
            this.forceUpdate();
            //console.log (this.state);
        }
    }

    onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    save = function () {
        this.unfocus();
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
            <ExperienceItemValue value={()=>this.state.titleValue} onClick={this.focus} className="experienceTitle"></ExperienceItemValue>
            <ExperienceItemValue value={()=>this.state.companyValue} onClick={this.focus} className="experienceCompany"></ExperienceItemValue>
            <Image src={date}></Image> <ExperienceItemValue value={()=>this.state.periodValue} onClick={this.focus} className="experiencePeriod"></ExperienceItemValue>
            <Image src={location}></Image> <ExperienceItemValue value={()=>this.state.locationValue} onClick={this.focus} className="experienceLocation"></ExperienceItemValue>
            <ExperienceItemValue value={()=>this.state.descriptionValue} className="experienceDescription"></ExperienceItemValue>
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
                    <Button onClick={this.save} variant="success"><Image src={plus} /> New entry</Button>
                    <Button onClick={()=>this.props.deleteElement(this.id)} variant="secondary"><Image src={trash} /> </Button>
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

class CV extends React.Component {
    constructor (props)
    {
        super (props);
        this.focus = props.focus;
        this.state = {
            ExperienceEntities: [],
        };
        this.addExperience = this.addExperience.bind(this);
    }

    addExperience = function () {
        this.setState({
            ExperienceEntities: this.state.ExperienceEntities.concat([{
                id: newId(),
                title: React.createRef(),
                company: React.createRef(),
                period: React.createRef(),
                location: React.createRef(),
                description: React.createRef(),
            }])
        });
    }

    deleteElement = function (id) {
        document.getElementById(id).remove(document.getElementById(id));
    }

    render() {
        //console.log (this.focus)
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
                        <Section name="Experience" add={this.addExperience}>
                            {this.state.ExperienceEntities.map((_, index) => (
                                <div id={this.state.ExperienceEntities[index].id}>
                                    <ExperienceEntity deleteElement={(x)=>{this.focus(); this.deleteElement(x);}} data={(obj) => {
                                        return this.state.ExperienceEntities[index]
                                    }} onClick={this.focus}></ExperienceEntity>
                                </div>
                            ))}
                        </Section>
                    </Row>
                </Container>
            </>
        );
    }
}

export default CV;
