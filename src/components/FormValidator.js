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

    _hasInvalidInput () {
        return this._inputs.some(input => !this._input.validity.valid);
    }

    _toggleFormButtonState () {
        this._hasInvalidInput(this._inputs) ? this._formSubmitButton.setAttribute('disabled', true) : this._formSubmitButton.removeAttribute('disabled', false);
    }

    _checkInputValidity () {
        if (!this._input.validity.valid) {
            this._input.setCustomValidity(this._input.validity.patternMismatch ? this._input.dataset.errorMessage : "");
            this._inputError.textContent = this._input.validationMessage;
        } else {
            this._inputError.textContent = '';
        }
    }

    enableValidation() {        
        this._toggleFormButtonState();
        this._input.addEventListener('input', () => {
            this._checkInputValidity(this._input, this._inputsErrors.get(this._input));
            this._toggleFormButtonState();
        });
        this._formElement.addEventListener('reset', () => this._toggleFormButtonState());
    }
}