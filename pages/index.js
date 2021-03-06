// Add to close buttons event listener for closing popups

function closePopup(popup) {

    popup.classList.remove('popup_opened');

}

function openPopup(popup) {

    popup.classList.add('popup_opened');

}

const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach(closeButton => {

    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closePopup(popup));

});

// PROFILE EDIT FORM
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const profileEditForm = document.querySelector('.form_profile-edit');
const inputUserName = document.querySelector('.form__item_user-name');
const inputUserDescription = document.querySelector('.form__item_user-description');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');

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

profileEditButton.addEventListener('click', openProfileEditForm);
profileEditForm.addEventListener('submit', closeProfileEditForm);


// ADD ELEMENT FORM
const addElementButton = document.querySelector('.profile__add-photo-button');

const popupAddElement = document.querySelector('.popup_add-element');
const inputElementName = document.querySelector('.form__item_element-name');
const inputElementImageURL = document.querySelector('.form__item_element-image-url');

const addElementForm = document.querySelector('.form_add-element');

function addElement(event) {
    event.preventDefault();

    elements.prepend(getElement(inputElementName.value, inputElementImageURL.value))

    addElementForm.reset();

    closePopup(popupAddElement);

}

addElementButton.addEventListener('click', () => openPopup(popupAddElement));
addElementForm.addEventListener('submit', addElement);

//  RENDER INITIAL ELEMENTS
const elementTemplate = document.querySelector('template');
const elements = document.querySelector('.elements');
const elementsDB = [
    {
        name: '??????????',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: '?????????????????????? ??????????????',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: '??????????????',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: '????????????????',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: '???????????????????????? ??????????',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: '????????????',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function toggleLikeState(event) {
    event.target.classList.toggle('element__like-button_liked');
}

function deleteElement(event) {

    const element = event.target.closest('.element');

    if (!element) return;

    element.remove();

}

function getElement(name, imageURL) {

    const template = elementTemplate.content.cloneNode(true);

    const img = template.querySelector('.element__image');
    img.setAttribute('src', imageURL);
    img.setAttribute('alt', name);
    img.addEventListener('click', openShowroom);

    const h2 = template.querySelector('.element__title');
    h2.textContent = name;

    const buttonLike = template.querySelector('.element__like-button');
    buttonLike.addEventListener('click', toggleLikeState);

    const buttonDelete = template.querySelector('.element__delete-button');
    buttonDelete.addEventListener('click', deleteElement);

    return template;
}

function renderElements() {

    elements.innerHTML = '';

    elementsDB.forEach(element => elements.append(getElement(element.name, element.link)));

}

renderElements();

// SHOWROOM

const showroomImage = document.querySelector('.showroom__image');
const showroomCaption = document.querySelector('.showroom__caption');
const popupShowroom = document.querySelector('.popup_with-image');

function openShowroom(event) {

    const image = event.target;
    showroomImage.setAttribute('src', image.src);
    showroomImage.setAttribute('alt', image.alt);
    showroomCaption.textContent = image.alt;

    openPopup(popupShowroom);

}