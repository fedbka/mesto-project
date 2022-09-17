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

export const createCardMarkup = (cardName, cardImageUrl, cardMarkupTemplate) => {
    const cardMarkup = cardMarkupTemplate.content.cloneNode(true);
    
    const cardImage = cardMarkup.querySelector('.element__image');
    cardImage.setAttribute('src', cardImageUrl);
    cardImage.setAttribute('alt', cardName);
    //cardImage.addEventListener('click', () => modal.openShowroom(cardName, cardImageUrl));

    const cardTitle = cardMarkup.querySelector('.element__title');
    cardTitle.textContent = cardName;

    const cardLikeButton = cardMarkup.querySelector('.element__like-button');
    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('element__like-button_liked'));

    const cardDeleteButton = cardMarkup.querySelector('.element__delete-button');
    const cardNode = cardMarkup.querySelector('.element');
    cardDeleteButton.addEventListener('click', () => cardNode.remove());

    return cardMarkup;
}

export const renderCard = (cardsContainer, cardMarkup) => {
    cardsContainer.append(cardMarkup);
}

export const renderInitialCards = (cardsContainer, cardMarkupTemplate) => {
    cardsDB.forEach(cardData => {
        const cardMarkup = createCardMarkup(cardData.name, cardData.imageUrl, cardMarkupTemplate);
        renderCard(cardsContainer, cardMarkup);
    });
}

