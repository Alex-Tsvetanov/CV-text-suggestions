import React from 'react';
import Image from 'react-bootstrap/Image'
import plus from '../icons/plus.svg'

const SectionTitle = (props) => (
    <>
        <div className="sectionTitle">
            {props.children} <Image src={plus} style={{background: 'rgb(63, 156, 220)'}} onClick={props.add}></Image>
        </div>
    </>
)

export default SectionTitle;