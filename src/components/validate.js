
export const enableValidation = (validationParams) => {

    const forms = [...document.querySelectorAll(validationParams.formSelector)];
    forms.forEach(form => enableFormValidation(form, validationParams));
}

const enableFormValidation = (form, validationParams) => {
    
    disableDefaultValidation(form);

    const formSubmitButton = form.querySelector(validationParams.submitButtonSelector);
    const inputs = [...form.querySelectorAll(validationParams.inputSelector)];
    const inputsErrors = new Map;
    inputs.forEach(input => {
        const inputError = form.querySelector(`.${input.id}-error`);
        inputsErrors.set(input, inputError);
    });

    toggleFormButtonState(inputs, formSubmitButton);

    inputs.forEach(input => input.addEventListener('input', () => {
        checkInputValidity(input, inputsErrors.get(input));
        toggleFormButtonState(inputs, formSubmitButton);
    }));

    form.addEventListener('reset', () => {
        toggleFormButtonState(inputs, formSubmitButton);
    })
}

const disableDefaultValidation = (form) => {
    form.setAttribute('novalidation', true);
    form.addEventListener('submit', (evt) => evt.preventDefault());
}

const checkInputValidity = (input, inputError) => {
    if (!input.validity.valid) {
        input.setCustomValidity(input.validity.patternMismatch ? input.dataset.errorMessage : "");    
        inputError.textContent = input.validationMessage;
    } else {
        inputError.textContent = '';
    }
}

const toggleFormButtonState = (inputs, formSubmitButton) => {
    hasInvalidInput(inputs) ? formSubmitButton.setAttribute('disabled', true) : formSubmitButton.removeAttribute('disabled', false);
}

const hasInvalidInput = (inputs) => {
    return inputs.some(input => !input.validity.valid);
}
