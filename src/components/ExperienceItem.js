import React from 'react';

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

export default ExperienceItem;