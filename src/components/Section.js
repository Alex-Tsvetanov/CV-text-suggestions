import SectionTitle from "./SectionTitle"

import React from 'react';
import Col from 'react-bootstrap/Col'

const Section = (props) => (
    <>
        <Col sm="6" className="section">
            <SectionTitle add={props.add}>{props.name}</SectionTitle>
            {props.children}
        </Col>
    </>
)

export default Section;