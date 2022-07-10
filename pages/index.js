// PROFILE EDIT FORM
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const profileEditForm = document.querySelector('.form_profile-edit');
const inputUserName = document.querySelector('.form__item_user-name');
const inputUserDescription = document.querySelector('.form__item_user-description');
const popupProfileEditFormCloseButton = document.querySelector('.popup__close-button_profile-edit');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');

function getProfile() {

    return {
        name: profileUserName.textContent,
        description: profileUserDescription.textContent,
    }

}

function setProfile(userProfile) {

    profileUserName.textContent = userProfile.name;
    profileUserDescription.textContent = userProfile.description;

}

function openProfileEditForm() {

    let userProfile = getProfile();

    inputUserName.setAttribute('value', userProfile.name);
    inputUserDescription.value = userProfile.description;

    popupProfileEdit.classList.add('popup_opened');

}

function closeProfileEditForm() {

    popupProfileEdit.classList.remove('popup_opened');

}

function saveProfile(evt) {
    evt.preventDefault();

    let userProfile = {
        name: inputUserName.value,
        description: inputUserDescription.value,
    };

    setProfile(userProfile);
    closeProfileEditForm();
}

profileEditButton.addEventListener('click', openProfileEditForm);
popupProfileEditFormCloseButton.addEventListener('click', closeProfileEditForm);
profileEditForm.addEventListener('submit', saveProfile);


// ADD ELEMENT FORM
const addElementButton = document.querySelector('.profile__add-photo-button');

const popupAddElement = document.querySelector('.popup_add-element');
const inputElementName = document.querySelector('.form__item_element-name');
const inputElementImageURL = document.querySelector('.form__item_element-image-url');

const addElementForm = document.querySelector('.form_add-element');

const popupAddElementCloseButton = document.querySelector('.popup__close-button_add-element');

function openAddElementForm() {

    popupAddElement.classList.add('popup_opened');

}

function closeAddElementForm() {

    popupAddElement.classList.remove('popup_opened');

}

function addElement(evt) {
    evt.preventDefault();

    element = {
        name: inputElementName.value,
        link: inputElementImageURL.value,
    };

    elementsDB.unshift(element);

    inputElementName.value = "";
    inputElementImageURL.value = "";

    closeAddElementForm();
    renderElements();
}

addElementButton.addEventListener('click', openAddElementForm);
popupAddElementCloseButton.addEventListener('click', closeAddElementForm);
addElementForm.addEventListener('submit', addElement);

//  RENDER ELEMENTS
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
    }
];

function toggleLikeState() {
    this.classList.toggle('element__like-button_liked');
}

function deleteElement() {

    if (!this.hasAttribute('index')) {
        return;
    }

    i = Number(this.getAttribute('index'));

    console.log(i);
    elementsDB.splice(i, 1);
    renderElements();
}

function renderElements() {

    elements.innerHTML = '';

    i = 0;
    while (i < elementsDB.length) {
        elements.insertAdjacentHTML('beforeend', `
            <article class="element">
                <img src="${elementsDB[i].link}" alt="${elementsDB[i].name}" class="element__image" />
                <div class="element__caption">
                    <h2 class="element__title">${elementsDB[i].name}</h2>
                    <button class="button element__like-button" type="button" aria-label="Добавить лайк"></button>
                </div>
                <button class="button element__delete-button" type="button" aria-label="Удалить место" index="${i}"></button>
            </article>
        `);

        likeButtons = document.querySelectorAll('.element__like-button');

        likeButtons.forEach(likeButton => {
            likeButton.addEventListener('click', toggleLikeState);
        });

        deleteButtons = document.querySelectorAll('.element__delete-button');
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', deleteElement);
        });

        i += 1;
    }

}

renderElements();