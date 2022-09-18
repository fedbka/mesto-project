import './index.css';
import * as validation from './components/validate';
import * as cards from './components/cards';
import * as modal from './components/modal';

cards.renderInitialCards();

const validationParametrs = {
    formSelector: '.form',
    inputSelector: '.form__item',
    inputErrorSelector: 'form__input-error',
    submitButtonSelector: '.form__submit-button',
}

validation.enableValidation(validationParametrs);

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', modal.openProfileEditPopup);

const addNewCardButton = document.querySelector('.profile__add-photo-button');
addNewCardButton.addEventListener('click', modal.openAddNewCardPopup);

const overlays = [...document.querySelectorAll('.popup')];
overlays.forEach(overlay => overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        modal.closePopup(evt.target);
    }
}));