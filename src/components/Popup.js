export default class Popup {
    
    _cssClassShowPopup = 'popup_opened';
    _cssClassPopup = 'popup';
    _cssClassPopupCloseButton = 'popup__close-button';

    constructor(selectorPopup) {

        this._selectorPopup = selectorPopup;
        this._elementPopup = document.querySelector(this._selectorPopup);
    }

    _handleEscClose = (evt) => {

        if (evt.key !== 'Escape' || !this._elementPopup.classList.contains(this._cssClassShowPopup)) return;
        this.close();
    }

    _handleClickClose = (evt) => {

        if (evt.target.classList.contains(this._cssClassPopup) || evt.target.classList.contains(this._cssClassPopupCloseButton)) {
            this.close();
        }
    }

    open() {
        this.setEventListeners();
        this._elementPopup.classList.add(this._cssClassShowPopup);        
    }

    close() {

        this.removeEventListeners();
        this._elementPopup.classList.remove(this._cssClassShowPopup);
    }

    setEventListeners() {
        this._elementPopup.addEventListener('mousedown', this._handleClickClose);
        document.addEventListener('keydown', this._handleEscClose);        
    }

    removeEventListeners() {
        this._elementPopup.removeEventListener('mousedown', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }
}