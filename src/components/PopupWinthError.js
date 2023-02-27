import Popup from "./Popup";

export default class PopupWithError extends Popup {

    _selectorCaption = '.popup__error';

    constructor(selectorPopup) {

        super(selectorPopup);
        this._elementCaption = this._elementPopup.querySelector(this._selectorCaption);

    }

    _handleSubmitPreventDefault = (evt) => evt.preventDefault();

    open(errorText) {
        
        this._elementCaption.textContent = errorText;
        console.log(errorText);
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._elementPopup.addEventListener('submit', this._handleSubmitPreventDefault);
    }

    removeEventListeners() {
        this._elementPopup.removeEventListener('submit', this._handleSubmitPreventDefault);
        super.removeEventListeners();
    }
}