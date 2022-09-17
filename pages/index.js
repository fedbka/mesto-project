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
const elementTemplate = document.querySelector('template');
const elements = document.querySelector('.elements');
const elementsDB = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }];
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

function addElement(event) {
    event.preventDefault();
    elements.prepend(getElement(inputElementName.value, inputElementImageURL.value))
    addElementForm.reset();
    closePopup(popupAddElement);
}

function getElement(name, imageURL) {
    const template = elementTemplate.content.cloneNode(true);
    const element = template.querySelector('.element');
    const img = template.querySelector('.element__image');
    img.setAttribute('src', imageURL);
    img.setAttribute('alt', name);
    img.addEventListener('click', () => openShowroom(name, imageURL));
    const h2 = template.querySelector('.element__title');
    h2.textContent = name;
    const buttonLike = template.querySelector('.element__like-button');
    buttonLike.addEventListener('click', () => buttonLike.classList.toggle('element__like-button_liked'));
    const buttonDelete = template.querySelector('.element__delete-button');
    buttonDelete.addEventListener('click', () => element.remove());
    return template;
}

function openShowroom(name, imageURL) {
    showroomImage.setAttribute('src', imageURL);
    showroomImage.setAttribute('alt', name);
    showroomCaption.textContent = name;
    openPopup(popupShowroom);
}

elementsDB.forEach(element => elements.append(getElement(element.name, element.link)));
document.querySelectorAll('.popup__close-button').forEach(button => button.addEventListener('click', () => closePopup(button.closest('.popup'))));
profileEditButton.addEventListener('click', openProfileEditForm);
profileEditForm.addEventListener('submit', closeProfileEditForm);
addElementButton.addEventListener('click', () => openPopup(popupAddElement));
addElementForm.addEventListener('submit', addElement);
