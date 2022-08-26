import Api from '../utils/Api';
import Card from "./Card";
import React from 'react';

function Main(props) {
    const [userId, setUserId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, createCards] = React.useState([]);

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
                    <Card i={el._id} card={el} user={userId} handleButtonClickLike={handleButtonClickLike}
                          onCardClick={props.handleCardClick}/>
                ))}
            </section>
        </main>
    )
}

export default Main;