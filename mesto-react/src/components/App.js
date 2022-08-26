import '../index.css';
import React from "react";
import Header from './ Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import PopupWithAgreement from "./PopupWithAgreement";

function App() {
    const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);
    const [isAddPlacePopupOpen, handleAddCardClick] = React.useState(false);
    const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
    const [selectedCard, handleCardClick] = React.useState({});

    function closeAllPopups() {
        handleEditAvatarClick(false);
        handleAddCardClick(false);
        handleEditProfileClick(false);
    }

    return (
        <div className="page">
            <Header/>
            <Main onEditProfile={() => handleEditProfileClick(true)} onAddCard={() => handleAddCardClick(true)}
                  onEditAvatar={() => handleEditAvatarClick(true)} isEditProfilePopupOpen={isEditProfilePopupOpen}
                  isAddPlacePopupOpen={isAddPlacePopupOpen} isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  closeAllPopups={closeAllPopups} handleCardClick={handleCardClick}/>
            <PopupWithForm name={'edit-user'} title={'Редактировать профиль'} button={'Сохранить'}
                           isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input type="text" placeholder="Имя" className="popup__input popup__input_value_name"
                       id="name-input" name="name"
                       required pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="40"/>
                <span className="name-input-error popup__error"></span>
                <input type="text" placeholder="О себе"
                       className="popup__input popup__input_value_about"
                       id="job-input" required
                       name="about" pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="400"/>
                <span className="job-input-error popup__error"></span>
            </PopupWithForm>
            <PopupWithForm name={'add-card'} title={'Новое место'} button={'Создать'}
                           isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input type="text" placeholder="Название" className="popup__input popup__input_value_place"
                       name="name" id="place-input" required pattern="^[^\s]+(\s.*)?$" minLength="2"
                       maxLength="30"/>
                <span className="place-input-error popup__error"></span>
                <input type="url" placeholder="Ссылка на картинку"
                       className="popup__input popup__input_value_photo"
                       name="link" id="photo-input" required pattern="^[^\s]+(\s.*)?$"/>
                <span className="photo-input-error popup__error"/>
            </PopupWithForm>
            <PopupWithForm name={'edit-avatar'} title={'Обновить аватар'} button={'Сохранить'}
                           isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input type="url" placeholder="Ссылка" className="popup__input popup__input_value_link"
                       name="link" id="avatar-input" required pattern="^[^\s]+(\s.*)?$"/>
                <span className="avatar-input-error popup__error"/>
            </PopupWithForm>
            <PopupWithAgreement name={'delete-card'} title={'Вы уверены?'} onClose={closeAllPopups}/>
            <PopupWithImage card={selectedCard} onClose={() => {
                handleCardClick({})
            }}/>
            <Footer/>
        </div>)
}

export default App;
