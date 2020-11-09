import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import newId from './utils/newid';
import React, { useState } from 'react';

class MistakeTrigger extends React.Component {
    constructor(props) {
        super (props);
    }
    componentWillMount() {
        this.id = newId();
        this.key = newId();
    }
    render() {
        return (
            <OverlayTrigger
                trigger={['hover','focus']}
                placement='bottom'
                overlay={
                <Popover id={this.id}>
                    <Popover.Title as="h3">{this.props.reason}</Popover.Title>
                    <Popover.Content>
                    <>
                        {this.props.suggestion}
                    </>
                    </Popover.Content>
                </Popover>
                }
            >
                <span>
                    {this.props.text}
                </span>
            </OverlayTrigger>
        )
    }
}

const APIErrors = function (value, type) {
    if (type == 'experienceDescription') {
        if (value == 'I\'ve done many projects') {
            return [
                {
                    "range": [10,23],
                    "message": "This is vague. Instead of “Managed projects for many clients”, say “Managed projects for 10 clients including BlueBank.”"
                },
                {
                    "range": [0,23],
                    "message": "Include a valuable metric if possible. For example: \"Increased revenue by 20% within one month.\"."
                },
            ];
        }
        else {
            return [];
        }
    }
    else {
        return [];
    }
}

class Correction extends React.Component {
    constructor(props) {
        super (props);
        this.value = ((props.value == '' || props.value === undefined)?props.placeholder:props.value);
        this.type = props.className;
        this.errors = APIErrors(this.value, this.type).sort((x, y) => (x.range[0] != y.range[0]) ? (x.range[0] - y.range[0]) : (y.range[1] - x.range[1]));
        console.log (this.errors);
    } 
    render () {
        return <div className={this.props.className} onClick={this.props.onClick}>{this.value}</div>
    }
}

export default Correction;