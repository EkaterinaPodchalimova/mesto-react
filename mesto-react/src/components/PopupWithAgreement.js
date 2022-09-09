import React from "react";
import PopupWithForm from './PopupWithForm';

function PopupWithAgreement(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard(props.card);
        props.onClose()
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name={'delete-card'} title={'Вы уверены?'}
                       button={'да'} onClick={props.onClose}/>
    )
}

export default PopupWithAgreement;