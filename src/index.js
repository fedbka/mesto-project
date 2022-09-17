import './index.css';
import {createCardMarkup, renderCard, renderInitialCards } from './components/card';

const cardsContainer = document.querySelector('.elements');
const cardMarkupTemplate = document.querySelector('#element__template');
renderInitialCards(cardsContainer, cardMarkupTemplate);


// code for refactoring

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const profileEditForm = document.querySelector('.form_profile-edit');
const inputUserName = document.querySelector('.form__item_user-name');
const inputUserDescription = document.querySelector('.form__item_user-description');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');
const addElementButton = document.querySelector('.profile__add-photo-button');
const popupAddElement = document.querySelector('.popup_add-element');
const inputElementName = document.querySelector('.form__item_element-name');
const inputElementImageURL = document.querySelector('.form__item_element-image-url');
const addElementForm = document.querySelector('.form_add-element');


const showroomImage = document.querySelector('.showroom__image');
const showroomCaption = document.querySelector('.showroom__caption');
const popupShowroom = document.querySelector('.popup_with-image');

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openProfileEditForm() {
    inputUserName.value = profileUserName.textContent;
    inputUserDescription.value = profileUserDescription.textContent;
    openPopup(popupProfileEdit);
}

function closeProfileEditForm(event) {
    event.preventDefault();
    profileUserName.textContent = inputUserName.value;
    profileUserDescription.textContent = inputUserDescription.value;
    closePopup(popupProfileEdit);
}

function openShowroom(name, imageURL) {
    showroomImage.setAttribute('src', imageURL);
    showroomImage.setAttribute('alt', name);
    showroomCaption.textContent = name;
    openPopup(popupShowroom);
}

function addElement(event) {
    event.preventDefault();
    
    const cardMarkup = createCardMarkup(inputElementName.value, inputElementImageURL.value, cardMarkupTemplate);
    renderCard(cardsContainer, cardMarkup);

    addElementForm.reset();
    closePopup(popupAddElement);
}

document.querySelectorAll('.popup__close-button').forEach(button => button.addEventListener('click', () => closePopup(button.closest('.popup'))));
profileEditButton.addEventListener('click', openProfileEditForm);
profileEditForm.addEventListener('submit', closeProfileEditForm);
addElementButton.addEventListener('click', () => openPopup(popupAddElement));
addElementForm.addEventListener('submit', addElement);