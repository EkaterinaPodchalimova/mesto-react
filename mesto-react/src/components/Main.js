// noinspection BadExpressionStatementJS

import PopupWithForm from "./PopupWithForm";
import PopupWithAgreement from "./PopupWithAgreement";
import PopupWithImage from "./PopupWithImage";
import Api from '../utils/Api';
import Card from "./Card";
import React from 'react';

function Main(props) {
    const [userId, setUserId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, createCards] = React.useState([]);
    const [selectedCard, handleCardClick] = React.useState({});

    const handleButtonClickLike = async (result, id, func) => {
        if (!result) {
            await Api.addLike(id)
                .then(res => {
                    func(res.likes.length)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await Api.deleteLike(id)
                .then(res => {
                    func(res.likes.length)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    React.useEffect(() => {
        Promise.all([
            Api.getUserInformation(),
            Api.getInitialCards()
        ])
            .then(([resUser, resCards]) => {
                setUserId(`${resUser.id}`)
                setUserName(`${resUser.name}`);
                setUserDescription(`${resUser.about}`);
                setUserAvatar(resUser.avatar);
                createCards(resCards)
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <main>
            <section className="profile">
                <div className="avatar-block" onClick={props.onEditAvatar}>
                    <img className="avatar" src={userAvatar} alt="Аватaр"/>
                    <div className="avatar-edit"></div>
                </div>
                <div className="profile__info">
                    <p className="profile__name">{userName}</p>
                    <button className="profile__edit-button" type="button"
                            aria-label="Изменить информацию" onClick={props.onEditProfile}/>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить"
                        onClick={props.onAddCard}/>
            </section>
            <section className="elements">
                {cards.map((el, i) => (
                    <Card i={i} card={el} user={userId} handleButtonClickLike={handleButtonClickLike}
                          onCardClick={handleCardClick}/>
                ))}
            </section>
            <PopupWithForm name={'edit-user'} title={'Редактировать профиль'} button={'Сохранить'}
                           isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups}>
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
                           isOpen={props.isAddPlacePopupOpen} onClose={props.closeAllPopups}>
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
                           isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups}>
                <input type="url" placeholder="Ссылка" className="popup__input popup__input_value_link"
                       name="link" id="avatar-input" required pattern="^[^\s]+(\s.*)?$"/>
                <span className="avatar-input-error popup__error"/>
            </PopupWithForm>
            <PopupWithAgreement name={'delete-card'} title={'Вы уверены?'} onClose={props.closeAllPopups}/>
            <PopupWithImage card={selectedCard} onClose={() => {handleCardClick({})}}/>
        </main>
    )
}

export default Main;