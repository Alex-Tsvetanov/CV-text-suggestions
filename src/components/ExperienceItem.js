import React from 'react';
import newId from '../utils/newid';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Parser from 'html-react-parser';

const ExperienceItem = React.forwardRef((props, ref) => {
    console.log (ref);
    let elementID = newId();
    return (
    <>
    {
    props.className != 'experienceDescription' ?
            <input onClick={props.onClick} type="text" name={props.name} onChange={evt => props.callback(evt)} className={props.className} ref={ref} placeholder={props.children}></input>
        :<>
            <div id={elementID} contentEditable="true" onClick={props.onClick} name={props.name} 
            onInput={() => {
                let element = document.getElementById(elementID);
                let element2 = document.getElementById('input'+elementID);
                element2.value = element.innerHTML;
            }} 
            onBlur={() => {
                let element = document.getElementById(elementID);
                let element2 = document.getElementById('input'+elementID);
                element2.value = element.innerHTML;
            }}
            className={props.className}>{Parser(props.value())}</div>
            <ButtonGroup>
                <button class="btn-normal btn btn-primary" onClick={()=>document.execCommand("italic",false,null)} title="Italicize Highlighted Text">
                    <i>I</i>
                </button>
                <button class="btn-normal btn btn-primary" onClick={()=>document.execCommand("bold",false,null)} title="Bold Highlighted Text">
                    <b>B</b>
                </button>
                <button class="btn-normal btn btn-primary" onClick={()=>document.execCommand("underline",false,null)} title="Underline Highlighted Text">
                    <u>U</u>
                </button>
            </ButtonGroup>
            <textarea onChange={evt => props.callback(evt)} id={'input'+elementID} style={{'display':'none'}} ref={ref}></textarea>
        </>
    }
    </>
)})

export default ExperienceItem;