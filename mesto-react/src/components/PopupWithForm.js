import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? ' popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <form className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate
                      onSubmit={props.onSubmit}>
                    <h2 className="popup__label">{props.title}</h2>
                    {props.children}
                    <button type="submit"
                            className={`popup__button popup__button_type_${props.name}`}>{props.button}</button>
                </form>
                <button className={`popup__close popup__close_type_${props.name}`} type="button" aria-label="Закрыть"
                        onClick={props.onClick}/>
            </div>
        </div>
    )
}

export default PopupWithForm;