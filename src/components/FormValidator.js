export default class FormValidator {

    constructor({ selectorInput, selectorInputError, selectorSubmitButton }, formElement) {

        this._formElement = formElement;
        this._inputs = [...this._formElement.querySelectorAll(selectorInput)];
        this._inputsErrors = new Map;
        this._inputs.forEach(input => {
            const inputError = this._formElement.querySelector(`.${input.id}-error`);
            this._inputsErrors.set(input, inputError);
        });
        this._formSubmitButton = this._formElement.querySelector(selectorSubmitButton);
    }

    _hasInvalidInput = () => {

        return this._inputs.some(input => !input.validity.valid);
    }

    _toggleFormButtonState = () => {

        this._hasInvalidInput(this._inputs) ? this._formSubmitButton.setAttribute('disabled', true) : this._formSubmitButton.removeAttribute('disabled', false);
    }

    _checkInputValidity = (input, inputError) => {

        if (!input.validity.valid) {
            input.setCustomValidity(input.validity.patternMismatch ? input.dataset.errorMessage : "");
            inputError.textContent = input.validationMessage;
        } else {
            inputError.textContent = '';
        }
    }

    enableValidation() {
        
        this._toggleFormButtonState();
        this._inputs.forEach(input => input.addEventListener('input', () => {
            this._checkInputValidity(input, this._inputsErrors.get(input));
            this._toggleFormButtonState();
        }));

        this._formElement.addEventListener('reset', () => this._toggleFormButtonState());
    }
}