import './index.css';
import {
    authorizationToken,
    baseUrl,
    selectorCardsTemplate,
    selectorCardsContainer,
    selectorPopupWithImage,
    selectorPopupWithError,
    selectorPopupWithConfirmation,
    selectorPopupAvatarEdit,
    selectorPopupProfileEdit,
    selectorPopupAddCard,
    selectorProfileUsername,
    selectorProfileDescription,
    selectorProfileAvatar,
    selectorInput,
    selectorInputError,
    selectorSubmitButton,
} from './utils/constants';

import Api from './components/Api';
import Card from './components/Card';
import Section from './components/Section';
import PopupWithImage from './components/PopupWithImage';
import PopupWithError from './components/PopupWinthError';
import PopupWithConfirmation from './components/PopupWithConfirmation';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from './components/UserInfo';
import FormValidator from './components/FormValidator';

const validationParams = {
    selectorInput,
    selectorInputError,
    selectorSubmitButton,
};

const cards = [];

const api = new Api(baseUrl, authorizationToken);
const userInfo = new UserInfo({ selectorProfileUsername, selectorProfileDescription, selectorProfileAvatar });

const popupWithImage = new PopupWithImage(selectorPopupWithImage);
const popupWithError = new PopupWithError(selectorPopupWithError);
const popupWithConfirmation = new PopupWithConfirmation(selectorPopupWithConfirmation);

const updateProfileAvatar = (formData) => {
    return api.updateAvatar(formData.get('avatarImageUrl'))
        .then(userData => userInfo.setUserInfo(userData))
        .catch(error => popupWithError.open(error));
}

const popupAvatarEdit = new PopupWithForm(selectorPopupAvatarEdit, updateProfileAvatar);
const validatorAvatarEdit = new FormValidator(validationParams, popupAvatarEdit.getFormElement());
validatorAvatarEdit.enableValidation();

const avatarImageButton = document.querySelector('.profile__avatar-button');
avatarImageButton.addEventListener('click', () => {
    validatorAvatarEdit.resetValidation();
    popupAvatarEdit.open()
});

const updateProfile = (formData) => {
    return api.updateProfile(formData.get('name'), formData.get('about'))
        .then(userData => userInfo.setUserInfo(userData))
        .catch(error => popupWithError.open(error));
}

const popupProfileEdit = new PopupWithForm(selectorPopupProfileEdit, updateProfile);
const validatorProfileEdit = new FormValidator(validationParams, popupProfileEdit.getFormElement());
validatorProfileEdit.enableValidation();

const buttonProfileEdit = document.querySelector('.profile__edit-button');
buttonProfileEdit.addEventListener('click', () => {
    validatorProfileEdit.resetValidation();
    popupProfileEdit.open(userInfo.getUserInfo())
});

const addCardSubmit = (formData) => {
    return api.addCard(formData.get('elementName'), formData.get('elementImageUrl'))
        .then(cardData => sectionCards.renderItem(cardData, false))
        .catch(error => popupWithError.open(error));
}

const popupAddCard = new PopupWithForm(selectorPopupAddCard, addCardSubmit);
const validatorAddCard = new FormValidator(validationParams, popupAddCard.getFormElement());
validatorAddCard.enableValidation();

const addNewCardButton = document.querySelector('.profile__add-photo-button');
addNewCardButton.addEventListener('click', () => {
    validatorAddCard.resetValidation();    
    popupAddCard.open();
});

const getCardRenderer = (cardData) => {
    const newCard = new Card(cardData,
        selectorCardsTemplate,
        () => popupWithImage.open(cardData.link, cardData.name),
        () => userInfo.checkInUserList(cardData.likes),
        () => userInfo.usersEqual(cardData.owner),
        () => api.setLike(cardData._id),
        () => api.unsetLike(cardData._id),
        api.removeCard,
        (error) => popupWithError.open(error),
        (actionAfterConfirm) => popupWithConfirmation.open(actionAfterConfirm),
        () => popupWithConfirmation.close(),
        () => popupWithConfirmation.renderLoading(true, 'Удаляем...'));
    return newCard;
}

const sectionCards = new Section({
    items: cards,
    renderer: (cardData) => {
        const item = getCardRenderer(cardData);
        const itemElement = item.getElement();
        return itemElement;
    },
}, selectorCardsContainer);

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        userInfo.setUserInfo(userData);
        sectionCards.updateItems(cardsData);
        sectionCards.renderItems();
    })
    .catch(error => popupWithError.open(error));