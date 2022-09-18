import * as card from './cards';

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

const closePopupsButtons = [...document.querySelectorAll('.popup__close-button')];
closePopupsButtons.forEach(button => {
    button.addEventListener('click', () => closePopup(button.closest('.popup')));
});

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

const profileEditPopup = document.querySelector('.popup_profile-edit');
const profileUsername = document.querySelector('.profile__user-name')
const profileUserDescription = document.querySelector('.profile__user-description')

const formUserProfile = document.forms.userProfile;
formUserProfile.addEventListener('submit', submitFormUserProfile);

function getCurrentProfileData() {
    return {
        username: profileUsername.textContent,
        userDescription: profileUserDescription.textContent,
    }
}

function setCurrentProfileData() {

    profileUsername.textContent = formUserProfile.elements.username.value;
    profileUserDescription.textContent = formUserProfile.elements.userDescription.value;

}

function submitFormUserProfile() {
    setCurrentProfileData();
    closePopup(profileEditPopup);
}

export function openProfileEditPopup() {
    const currentProfile = getCurrentProfileData();
    formUserProfile.elements.username.value = currentProfile.username;
    formUserProfile.elements.userDescription.value = currentProfile.userDescription;
    openPopup(profileEditPopup);
}

// New Card Modal

const formNewCard = document.forms.newCard;
const newCardPopup = document.querySelector('.popup_add-element');

formNewCard.addEventListener('submit', submitFormNewCard);

function submitFormNewCard() {

    const cardMarkup = card.createCardMarkup(formNewCard.elements.elementName.value, formNewCard.elements.elementImageUrl.value);
    card.renderCard(cardMarkup);
    formNewCard.reset();
    closePopup(newCardPopup);

}

export function openAddNewCardPopup() {
    formNewCard.reset();
    openPopup(newCardPopup);
}

