import Popup from "./Popup";

export default class PopupWithForm extends Popup {

    _selectorFormSubmitButton = '.form__submit-button';
    _buttonFormSubmit;
    _textFormSubmitButton = '';

    constructor(selectorPopup, submitHandler) {
        super(selectorPopup);
        this._form = this._elementPopup.querySelector('.form');
        this._submitHandler = this._getSubmitHandler(submitHandler);
        this._buttonFormSubmit = this._elementPopup.querySelector(this._selectorFormSubmitButton);
        this._textFormSubmitButton = this._buttonFormSubmit ? this._buttonFormSubmit.textContent : '';

    }

    _getSubmitHandler(submitHandler) {

        return (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            submitHandler(this._getInputValues())
                .then(() => this.close())
                .finally(() => this.renderLoading(false));
        }
    }

    _getInputValues() {

        const { elements } = this._form;

        const formValues = Array.from(elements)
            .map((element) => {
                const { name, type } = element
                const value = type === 'checkbox' ? element.checked : element.value

                return { name, value }
            })
            .filter((item) => !!item.name);

        const newMap = new Map(formValues.map(formValue => [formValue.name, formValue.value]));

        return newMap;
    }

    _setInputValues(inputValues) {

        const { elements } = this._form;
        Array.from(elements).map((element => {
            const { name, type } = element;
            if (!name || !inputValues[name]) return;
            element.value = type === 'checkbox' ? !!inputValues[name] : inputValues[name];
        }));
    }

    renderLoading(isLoading, loadingText = 'Отправляем...') {

        if (isLoading) {
            this._buttonFormSubmit.textContent = loadingText;
        } else {
            this._buttonFormSubmit.textContent = this._textFormSubmitButton;
        }

    }

    getFormElement() {

        return this._form;
    }

    setEventListeners() {

        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    removeEventListeners() {

        this._form.removeEventListener('submit', this._submitHandler);
        super.removeEventListeners();
    }

    open(inputValues) {
        if (!!inputValues) this._setInputValues(inputValues);
        super.open();
    }

    close() {
        this._form.reset();
        super.close();
    }
}