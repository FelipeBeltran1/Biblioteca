import { Button } from 'antd'
import React from 'react'
import './../Modal.css';

const Modal = ({ url, isOpen, closeModal}) => {
    return (
        <article className= {`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container">
                <Button className="modal-close" type="danger" onClick={closeModal}>X</Button>
                <img src={url} alt="" />
            </div>
        </article>
    )
}

export default Modal
