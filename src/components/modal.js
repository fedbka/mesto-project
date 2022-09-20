import * as cards from './cards';
import * as api from './api';
import * as profile from './profile';

const showPopupCssClassName = 'popup_opened';

export function closePopup(popup) {
    popup.classList.remove(showPopupCssClassName);
    document.removeEventListener('keydown', closePopupOnEsc);
}

export function openPopup(popup) {
    popup.classList.add(showPopupCssClassName);
    document.addEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
    
    if (evt.key !== 'Escape') return;
    const openPopup = document.querySelector('.popup_opened');
    if (!openPopup) return;
    closePopup(openPopup)
}

function setSavingStatus(element) {
    element.textContent = 'Сохранение...';
}

function setNormalStatus(element) {
    element.textContent = 'Сохранить';
}

// Image Showroom Modal

const showroomImage = document.querySelector('.showroom__image');
const showroomTitle = document.querySelector('.showroom__caption');
const showroomPopup = document.querySelector('.popup_with-image');

export function openShowroomPopup(name, imageURL) {
    showroomImage.setAttribute('src', imageURL);
    showroomImage.setAttribute('alt', name);
    showroomTitle.textContent = name;
    openPopup(showroomPopup);
}


// Profile Edit Modal

const formEditProfile = document.forms.userProfile;
const formEditProfileSubmitButton = formEditProfile.querySelector('.form__submit-button');
formEditProfile.addEventListener('submit', submitFormUserProfile);

const profileEditPopup = document.querySelector('.popup_profile-edit');

function submitFormUserProfile() {
    setSavingStatus(formEditProfileSubmitButton);
    api.updateProfile(formEditProfile.elements.username.value, formEditProfile.elements.userDescription.value)
        .then(profileData => {
            profile.setProfile(profileData);
            profile.renderProfile();
            closePopup(profileEditPopup);
            formEditProfile.reset();
        })
        .catch(err => {
            showErrorPopup(err);
        })
        .finally(() => {
            setNormalStatus(formEditProfileSubmitButton);
        });
    
}

export function openProfileEditPopup() {
    formEditProfile.reset();
    formEditProfile.elements.username.value = profile.currentUser.name;
    formEditProfile.elements.userDescription.value = profile.currentUser.about;
    openPopup(profileEditPopup);
}

// New Card Modal

const formNewCard = document.forms.newCard;
const formNewCardSubmitButton = formNewCard.querySelector('.form__submit-button');

const newCardPopup = document.querySelector('.popup_add-element');

formNewCard.addEventListener('submit', submitFormNewCard);

function submitFormNewCard() {
    setSavingStatus(formNewCardSubmitButton);
    api.addCard(formNewCard.elements.elementName.value, formNewCard.elements.elementImageUrl.value)
        .then(card => {
            cards.cards.unshift(card);
            cards.renderCard(cards.createCardMarkup(card), true);
            closePopup(newCardPopup);
            formNewCard.reset();
        })
        .catch(err => {
            showErrorPopup(err);
        })
        .finally(() => {
            setNormalStatus(formNewCardSubmitButton);
        });
}

export function openAddNewCardPopup() {
    formNewCard.reset();
    openPopup(newCardPopup);
}

// Update Avatar Modal

const formUpdateAvatar = document.forms.updateAvatar;
const formUpdateAvatarSubmitButton = formUpdateAvatar.querySelector('.form__submit-button');

const updateAvatarPopup = document.querySelector('.popup_avatar-edit');

formUpdateAvatar.addEventListener('submit', submitFormUpdateAvatar);

function submitFormUpdateAvatar() {
    setSavingStatus(formUpdateAvatarSubmitButton);
    api.updateAvatar(formUpdateAvatar.elements.avatarImageUrl.value)
        .then(profileData => {
            profile.setProfile(profileData);
            profile.renderProfile();
            closePopup(updateAvatarPopup);
            formUpdateAvatar.reset();
        })
        .catch(err => {
            showErrorPopup(err);
        })
        .finally(() => {
            setNormalStatus(formUpdateAvatarSubmitButton);
        });
}

export function openUpdateAvatarPopup() {
    formUpdateAvatar.elements.avatarImageUrl.value = profile.currentUser.avatar;
    openPopup(updateAvatarPopup);
}

// Show Error Modal
const errorPopup = document.querySelector('.popup_show-error');
const errorTextElement = errorPopup.querySelector('.popup__error');
const errorSubmitButton = errorPopup.querySelector('.form__submit-button');

export const showErrorPopup = (errorText) => {
    errorTextElement.textContent = errorText;
    openPopup(errorPopup);
}

errorSubmitButton.addEventListener('click', () => {
    errorTextElement.textContent = '';
    closePopup(errorPopup);
});

// Confirm Modal

const formConfirm = document.forms.confirm;
const confirmPopup = document.querySelector('.popup_confirm');

export const confirmAction = (actionAfterConfirm) => {
    formConfirm.addEventListener('submit', actionAfterConfirm);
    openPopup(confirmPopup);
}

export const closeConfirmPopup = () => {
    closePopup(confirmPopup);
}