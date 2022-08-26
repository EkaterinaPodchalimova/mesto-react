import React from "react";
class PopupWithAgreement extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={`popup popup_type_${this.props.name}`}>
                <div className={`popup__container popup__container_type_${this.props.name}`}>
                    <form className={`popup__form popup__form_type_${this.props.name}`} name={this.props.name} noValidate>
                        <h2 className="popup__label">{this.props.title}</h2>
                        <button type="submit" className="popup__button popup__button_type_delete-card">Да</button>
                    </form>
                    <button className="popup__close popup__close_type_delete-card" type="button" aria-label="Закрыть" />
                </div>
            </div>
        )
    }
}

export default PopupWithAgreement;