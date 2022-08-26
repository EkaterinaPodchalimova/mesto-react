import React from "react";
class PopupWithForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={`popup popup_type_${this.props.name} ${this.props.isOpen ? ' popup_opened' : ''}`}>
                <div className={`popup__container popup__container_type_${this.props.name}`}>
                    <form className={`popup__form popup__form_type_${this.props.name}`} name={this.props.name} noValidate>
                        <h2 className="popup__label">{this.props.title}</h2>
                        {this.props.children}
                        <button type="submit" className={`popup__button popup__button_type_${this.props.name}`}>{this.props.button}</button>
                    </form>
                    <button className={`popup__close popup__close_type_${this.props.name}`} type="button" aria-label="Закрыть" onClick={this.props.onClose}/>
                </div>
            </div>
        )
    }
}

export default PopupWithForm;