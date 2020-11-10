import API from './API.js';

import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import newId from '../utils/newid';

class ExperienceItemValue extends React.Component {
    constructor (props) {
        super(props);
        this.props = props;
        this.state = {
            text: '',
            errors: [],
            elements: []
        };
    }
    ignore (x) {
        let new_state = JSON.parse(JSON.stringify(this.state));
        console.log (new_state, this.state);
        new_state['errors'].splice(x,1);//[x]['ignore'] = true;
        new_state = this.getElements(this.state.text, this.props.className, false, new_state['errors']);
        console.log (new_state, this.state);
        this.setState (new_state);
    }
    getElements (text, type, new_errors, my_errors) {
        let errors;
        if (new_errors)
            errors = API(text, type)
                            .map ((x) => { x ['ignore'] = false; return x; })
                            .sort((x, y) => (x.range[0] != y.range[0]) ? (x.range[0] - y.range[0]) : (y.range[1] - x.range[1]));
        else
            errors = my_errors;
        let elements = [];
        let indexText = 0, indexError = 0;
        while (indexText < text.length) {
            if (indexError < errors.length) { // still there are mistakes
                if (errors [indexError].range [0] < indexText) {
                    indexError += 1;
                }
                else if (errors [indexError].range [0] == indexText && errors [indexError]['ignore']) { // skipping mistake
                    indexError += 1;
                }
                else if (errors [indexError].range [0] == indexText && !errors [indexError]['ignore']) { // starting letter of a mistake
                    let string = '';
                    for ( ; indexText < text.length && indexText < errors [indexError].range[1] ; indexText += 1)
                        string += text [indexText];
                    let x = indexError;
                    elements [elements.length] = <>
                        <OverlayTrigger
                            trigger={['click']}
                            placement='bottom'
                            overlay={
                            <Popover id={newId()}>
                                <Popover.Title>
                                    <Row>
                                        <Col className="alerttexttitle" sm="8">
                                            Content Improvement
                                        </Col>
                                        <Col className="alerttextignore" sm="4">
                                        <input type="checkbox" onChange={()=>{this.ignore(x);}}></input> Ignore
                                        </Col>
                                    </Row>
                                </Popover.Title>
                                <Popover.Content className="alerttextcontent">
                                <>
                                    {errors[indexError].message}
                                </>
                                </Popover.Content>
                            </Popover>
                            }
                        >
                            <span className='error'>
                                {string}
                            </span>
                        </OverlayTrigger>
                    </>
                    indexError += 1;
                }
                else {
                    elements [elements.length] = <span>{text [indexText]}</span>
                    indexText += 1;
                }
            }
            else {
                elements [elements.length] = <span>{text [indexText]}</span>
                indexText += 1;
            }
        }
        return {
            text: text,
            errors: errors,
            elements: elements
        };
    }
    componentDidMount () {
        this.setState (this.getElements(this.props.value(), this.props.className, true));
        //console.log (this.state);
    }
    componentDidUpdate (prevProps) {
        //console.log (JSON.stringify(this.props), JSON.stringify(prevProps));
        /*if (prevProps === undefined) {}
        console.log (this.props.value(), prevProps.text);
        if (this.props.value() !== prevProps.text) {
            this.setState(this.getElements(this.props.value(), this.props.className));
        }*/
        if ((JSON.stringify(this.state.text) !== JSON.stringify(prevProps.value())) || 
            (JSON.stringify(this.props.value()) !== JSON.stringify(prevProps.value())) ||
            (JSON.stringify(this.props.className) !== JSON.stringify(prevProps.className))
            ) {
                this.setState (this.getElements(this.props.value(), this.props.className, true));
        }
    }
    componentWillUnmount() {

    }
    componentDidCatch(error, info) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        //console.log (JSON.stringify(this.props), JSON.stringify(nextProps));
        //console.log (JSON.stringify(this.state.text), JSON.stringify(nextState.text));
        //console.log (JSON.stringify(this.props.value()), JSON.stringify(nextProps.value()));
        if ((JSON.stringify(this.state.text) !== JSON.stringify(nextProps.value())) || 
            (JSON.stringify(this.props.value()) !== JSON.stringify(nextState.text)) ||
            (JSON.stringify(this.state.text) !== JSON.stringify(nextState.text)) ||
            (JSON.stringify(this.props.value()) !== JSON.stringify(nextProps.value()))
            ) {
            return true;
        }
        if (JSON.stringify(this.props.className) !== JSON.stringify(nextProps.className)) {
            return true;
        }
        if (JSON.stringify(this.state.errors) != JSON.stringify(nextState.errors)) {
            return true;
        }
        if (JSON.stringify(this.state.elements) != JSON.stringify(nextState.elements)) {
            return true;
        }
        return false;
    }
    render () {
        return (
            <div onClick={this.props.onClick} className={this.props.className}>
                {this.state.elements}
            </div>
        )
    }
}

export default ExperienceItemValue;

/*const ExperienceItemValue = (props) => {
    return (
    <>
    <Correction onClick={props.onClick} value={props.value} placeholder={props.children} className={props.className}></Correction>
    </>
    {props.value == '' || props.value === undefined ?
        <div onClick={props.onClick} className={props.className}>
            {props.children}
        </div>
    :
        <div onClick={props.onClick} className={props.className}>
            {props.value}
        </div>
    }
)}*/