import '../index.css';
import React from "react";
import Header from './ Header';
import Main from './Main';
import Footer from './Footer';

function App() {
    const [isEditAvatarPopupOpen,handleEditAvatarClick] = React.useState(false);
    const [isAddPlacePopupOpen, handleAddCardClick] = React.useState(false);
    const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);

    function closeAllPopups () {
        handleEditAvatarClick(false);
        handleAddCardClick(false);
        handleEditProfileClick(false);
    }



    return (
        <div className="page">
            <Header/>
            <Main onEditProfile={() => handleEditProfileClick(true)} onAddCard={() => handleAddCardClick(true)}
                  onEditAvatar={() => handleEditAvatarClick(true)} isEditProfilePopupOpen={isEditProfilePopupOpen} isAddPlacePopupOpen={isAddPlacePopupOpen} isEditAvatarPopupOpen={isEditAvatarPopupOpen} closeAllPopups={ closeAllPopups}/>
            <Footer/>
        </div>)
}

export default App;
