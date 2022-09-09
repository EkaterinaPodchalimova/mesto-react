import React from "react";
function PopupWithAgreement(props){

    function handleSubmit(e) {
        e.preventDefault();
        console.log(props.card);
        props.onDeleteCard(props.card);
        props.onClose()
    }
        return(
            <div className={`popup popup_type_delete-card ${props.isOpen ? ' popup_opened' : ''}`}>
                <div className={`popup__container popup__container_type_delete-card`}>
                    <form className={`popup__form popup__form_type_delete-card`} name='delete-card' noValidate onSubmit={handleSubmit}>
                        <h2 className="popup__label">Вы уверены?</h2>
                        <button type="submit" className="popup__button popup__button_type_delete-card">Да</button>
                    </form>
                    <button className="popup__close popup__close_type_delete-card" type="button" aria-label="Закрыть" onClick={props.onClose}/>
                </div>
            </div>
        )
}

export default PopupWithAgreement;