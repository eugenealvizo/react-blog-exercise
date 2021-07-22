import React from 'react';
import App from '../App.css'

const Modal = ({ content, clickConfirm, clickCancel})=> {

    return (
        <div className="modal">
            <div className="modal__content">
                <h1>{content}</h1>
                <div className="modal__controls">
                    <button onClick={ clickCancel } className="btn">No</button>
                    <button onClick={ clickConfirm } className="btn">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Modal
