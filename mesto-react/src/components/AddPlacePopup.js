import React from "react";
function AddPlacePopup(props)  {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleClear() {
        props.onClose();
        setName('');
        setLink('')
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name, link});
        setName('');
        setLink('')
    }

    return(
        <div className={`popup popup_type_add-card ${props.isOpen ? ' popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_add-card`}>
                <form className={`popup__form popup__form_type_add-card`} name='add-card' noValidate onSubmit={handleSubmit}>
                    <h2 className="popup__label">Новое место</h2>
                    <input value={name} onChange={handleChangeName} type="text" placeholder="Название" className="popup__input popup__input_value_place"
                           name="name" id="place-input" required pattern="^[^\s]+(\s.*)?$" minLength="2"
                           maxLength="30"/>
                    <span className="place-input-error popup__error"></span>
                    <input value={link} onChange={handleChangeLink} type="url" placeholder="Ссылка на картинку"
                           className="popup__input popup__input_value_photo"
                           name="link" id="photo-input" required pattern="^[^\s]+(\s.*)?$"/>
                    <span className="photo-input-error popup__error"/>
                    <button type="submit" className={`popup__button popup__button_type_add-card`}>Создать</button>
                </form>
                <button className={`popup__close popup__close_type_add-card`} type="button" aria-label="Закрыть" onClick={handleClear}/>
            </div>
        </div>
    )
}

export default AddPlacePopup;