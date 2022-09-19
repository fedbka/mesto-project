import * as modal from './modal';

const cardsDB = [
    {
        name: 'Архыз',
        imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }];

export const selectorCardTemplate = '#element__template';
export const selectorCardsContainer = '.elements';
export const selectorCardImage = '.element__image';
export const selectorCardTitle = '.element__title';
export const selectorCardLikeButton = '.element__like-button';
export const selectorCardDeleteButton = '.element__delete-button';
export const selectorCardElement = '.element';

export const cardsContainer = document.querySelector(selectorCardsContainer);
export const cardMarkupTemplate = document.querySelector(selectorCardTemplate); 

export const createCardMarkup = (cardName, cardImageUrl) => {
    
    const cardMarkup = cardMarkupTemplate.content.cloneNode(true);
    
    const cardImage = cardMarkup.querySelector(selectorCardImage);
    cardImage.setAttribute('src', cardImageUrl);
    cardImage.setAttribute('alt', cardName);
    cardImage.addEventListener('click', () => modal.openShowroomPopup
    (cardName, cardImageUrl));

    const cardTitle = cardMarkup.querySelector(selectorCardTitle);
    cardTitle.textContent = cardName;

    const cardLikeButton = cardMarkup.querySelector(selectorCardLikeButton);
    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('element__like-button_liked'));

    const cardDeleteButton = cardMarkup.querySelector(selectorCardDeleteButton);
    const cardNode = cardMarkup.querySelector(selectorCardElement);
    cardDeleteButton.addEventListener('click', () => cardNode.remove());

    return cardMarkup;
}

export const renderCard = (cardMarkup) => {
    cardsContainer.prepend(cardMarkup);
}

export const renderInitialCards = () => {
    
    cardsDB.forEach(cardData => renderCard(createCardMarkup(cardData.name, cardData.imageUrl)));

}

