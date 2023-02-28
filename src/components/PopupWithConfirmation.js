import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    
    _selectorFormSubmitButton = '.form__submit-button';
    _buttonFormSubmit;
    _textFormSubmitButton = '';
   
    constructor(selectorPopup) {
        
        super(selectorPopup);
        this._buttonFormSubmit = this._elementPopup.querySelector(this._selectorFormSubmitButton);
        this._textFormSubmitButton = this._buttonFormSubmit ? this._buttonFormSubmit.textContent : '';

    }

    _handleSubmitPreventDefault = (evt) => evt.preventDefault();
    
    renderLoading(isLoading, loadingText = 'Отправляем...') {

        if (isLoading) {
            this._buttonFormSubmit.textContent = loadingText;
        } else {
            this._buttonFormSubmit.textContent = this._textFormSubmitButton;
        }

    }

    setEventListeners() {
        super.setEventListeners();
        this._elementPopup.addEventListener('submit', this._handleSubmitPreventDefault);
    }

    removeEventListeners() {
        this._elementPopup.removeEventListener('submit', this._handleSubmitPreventDefault);
        super.removeEventListeners();
    }
    
    open(actionAfterConfirm) {
        this.renderLoading(false);
        this._actionAfterConfirm = actionAfterConfirm;
        this._elementPopup.addEventListener('submit', this._actionAfterConfirm);
        super.open();
    }

    close() {

        this._elementPopup.removeEventListener('submit', this._actionAfterConfirm);
        super.close();
    }

}