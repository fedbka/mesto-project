import Popup from "./Popup";

export default class PopupWithError extends Popup {

    _selectorCaption = '.popup__error';

    constructor(selectorPopup) {

        super(selectorPopup);
        this._elementCaption = this._elementPopup.querySelector(this._selectorCaption);
    }

    open(errorText) {
        
        this._elementCaption.textContent = errorText;
        console.log(errorText);
        super.open();
    }
}