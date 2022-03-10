import React from 'react';
import "./styles.css";

const Button = ({primary, secondary,tertiary, fullWidth, medium, text, onClick}) => {
    return (
        <div className='btn-wrap'>
            <button type='button' className={`btn ${primary} ${secondary} ${fullWidth} ${medium} ${tertiary}` } onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button;
