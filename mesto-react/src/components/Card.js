import React from "react";

function Card (props) {
    const [cardState, editCardState] = React.useState(true);
    const [like, setLike] = React.useState(false);
    const [likeNumber, editLikeNumber] = React.useState(props.card.likes.length);
    const classListLike = `element__like ${like ? 'element__like_active' : ''}`;

    if (props.card.likes.some(el => el._id === props.user)) {
        setLike(true);
    }

    const deleteCard = () => {
        editCardState(false);
    }

    const setLikes = () => {
        props.handleButtonClickLike(
            classListLike.includes('element__like_active'),
            props.card._id,
            (likesNumber) => {
                editLikeNumber(likesNumber);
                setLike(!like)
            });
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

    if (cardState) {
        return (
            <article className="element" key={props.i}>
                <img className="element__photo" src={props.card.link} alt={`Изображение ${props.card.name}`} onClick={handleClick}/>
                {(!(props.user === props.card.owner)) && (
                    <button key={'button'} className="element__trash" type="button" aria-label="Удалить фото"
                            onClick={deleteCard}/>)}
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like-block">
                    <button className={classListLike} type="button" aria-label="Поставить лайк" onClick={setLikes}/>
                    <p className="element__like-number">{likeNumber}</p>
                </div>
            </article>)

    }
}

export default Card;