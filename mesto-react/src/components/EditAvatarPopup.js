import React from "react";
function EditAvatarPopup(props)  {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    }

    function cleanInput() {
        props.onClose();
        avatarRef.current.value = ''
    }

    return(
        <div className={`popup popup_type_edit-avatar ${props.isOpen ? ' popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_edit-avatar`}>
                <form className={`popup__form popup__form_type_edit-avatar`} name='edit-avatar' noValidate onSubmit={handleSubmit}>
                    <h2 className="popup__label">Обновить аватар</h2>
                    <input type="url" placeholder="Ссылка" className="popup__input popup__input_value_link"
                           name="link" id="avatar-input" required pattern="^[^\s]+(\s.*)?$" ref={avatarRef}/>
                    <span className="avatar-input-error popup__error" />
                    <button type="submit" className={`popup__button popup__button_type_edit-avatar`}>Сохранить</button>
                </form>
                <button className={`popup__close popup__close_type_edit-avatar`} type="button" aria-label="Закрыть" onClick={cleanInput}/>
            </div>
        </div>
    )
}

export default EditAvatarPopup;