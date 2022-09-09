import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {
    const [name, setName] = React.useState('');
    const [description,setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleClear() {
        props.onClose();
        setName(currentUser.name);
        setDescription(currentUser.about)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
            <div className={`popup popup_type_edit-user ${props.isOpen ? ' popup_opened' : ''}`}>
                <div className={`popup__container popup__container_type_edit-user`}>
                    <form className={`popup__form popup__form_type_edit-user`} name='edit-user'
                          noValidate onSubmit={handleSubmit}>
                        <h2 className="popup__label">Редактировать профиль</h2>
                        <input type="text" placeholder="Имя" className="popup__input popup__input_value_name"
                               id="name-input" name="name"
                               required pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="40" value={name} onChange={handleChangeName}/>
                        <span className="name-input-error popup__error"></span>
                        <input type="text" placeholder="О себе"
                               className="popup__input popup__input_value_about"
                               id="job-input" required
                               name="about" pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="400" value={description} onChange={handleChangeDescription}/>
                        <span className="job-input-error popup__error"></span>
                        <button type="submit"
                                className={`popup__button popup__button_type_edit-user`}>Сохранить</button>
                    </form>
                    <button className={`popup__close popup__close_type_edit-user`} type="button"
                            aria-label="Закрыть" onClick={handleClear}/>
                </div>
            </div>
        )
}

export default EditProfilePopup;