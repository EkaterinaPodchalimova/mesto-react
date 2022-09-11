import '../index.css';
import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithImage from "./PopupWithImage";
import PopupWithAgreement from "./PopupWithAgreement";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);
    const [isAddPlacePopupOpen, handleAddCardClick] = React.useState(false);
    const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
    const [isAgreementPopupOpen, handleDeleteCardClick] = React.useState(false);
    const [selectedDeleteCard, handleDeleteClick] = React.useState({});
    const [selectedCard, handleCardClick] = React.useState({});
    const [currentUser, editUserInformation] = React.useState({});
    const [cards, createCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserInformation(),
            api.getInitialCards()
        ])
            .then(([resUser, resCard]) => {
                editUserInformation(resUser);
                createCards(resCard)
            })
            .catch((err) => console.log(err))
    }, []);

    function handleUpdateUser({name, about}) {
        api.setUserInformation({name, about})
            .then(() => {
                editUserInformation({...currentUser, name: name, about: about});
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar({avatar}) {
        api.editAvatar(avatar)
            .then((res) => {
                editUserInformation({...currentUser, avatar: res.avatar});
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                createCards((cards) => cards.map((card) => card._id === newCard._id ? newCard : card))
            })
            .catch((err) => console.log(err));
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                createCards(cards.filter(el => el._id !== card._id))
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit({name, link}) {
        api.postNewCard({name, link})
            .then(newCard => {
                createCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        handleEditAvatarClick(false);
        handleAddCardClick(false);
        handleEditProfileClick(false);
        handleDeleteCardClick(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header/>
            <Main cards={cards}
                  onCardLike={handleCardLike}
                  onEditProfile={() => handleEditProfileClick(true)}
                  onAddCard={() => handleAddCardClick(true)}
                  onEditAvatar={() => handleEditAvatarClick(true)}
                  onCardDelete={() => handleDeleteCardClick(true)}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  isAgreementPopupOpen={isAgreementPopupOpen}
                  closeAllPopups={closeAllPopups}
                  handleCardClick={handleCardClick}
                  handleDeleteClick={handleDeleteClick}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                              onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
            <PopupWithAgreement onClose={() => {
                closeAllPopups();
                handleDeleteClick({})
            }} onDeleteCard={handleCardDelete} card={selectedDeleteCard}
                                isOpen={isAgreementPopupOpen}/>
            <PopupWithImage card={selectedCard} onClose={() => {
                handleCardClick({})
            }}/>
            <Footer/>
        </div>
    </CurrentUserContext.Provider>)
}

export default App;
