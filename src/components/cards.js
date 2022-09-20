import * as modal from './modal';
import * as profile from './profile';
import * as api from './api';

export const cards = [];
export const selectorCardTemplate = '#element__template';
export const selectorCardsContainer = '.elements';
export const selectorCardImage = '.element__image';
export const selectorCardTitle = '.element__title';
export const selectorCardLikeButton = '.element__like-button';
export const selectorCardDeleteButton = '.element__delete-button';
export const selectorCardElement = '.element';
export const selectorCardLikesCount = '.element__likes-count';

export const cardsContainer = document.querySelector(selectorCardsContainer);
export const cardMarkupTemplate = document.querySelector(selectorCardTemplate); 

export const createCardMarkup = (card) => {
    const cardMarkup = cardMarkupTemplate.content.cloneNode(true);
    
    const cardImage = cardMarkup.querySelector(selectorCardImage);
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    cardImage.addEventListener('click', () => modal.openShowroomPopup
    (card.name, card.link));

    const cardTitle = cardMarkup.querySelector(selectorCardTitle);
    cardTitle.textContent = card.name;

    const cardLikeButton = cardMarkup.querySelector(selectorCardLikeButton);
    if (profile.checkMeIn(card.likes)) {
        cardLikeButton.classList.add('element__like-button_liked');
    }
    const cardLikesCount = cardMarkup.querySelector(selectorCardLikesCount);
    cardLikesCount.textContent = card.likes.length;
    
    cardLikeButton.addEventListener('click', () => {
        const updatedCard = cardLikeButton.classList.contains('element__like-button_liked') ? api.unsetLike(card._id) : api.setLike(card._id);
        updatedCard.then(updatedCardData => cardLikesCount.textContent = updatedCardData.likes.length);

        cardLikeButton.classList.toggle('element__like-button_liked')
    });


    const cardDeleteButton = cardMarkup.querySelector(selectorCardDeleteButton);
    
    if (!profile.usersEqual(card.owner, profile.currentUser)) {
        cardDeleteButton.classList.add('element__like-button_hidden');
    } else {
        const cardNode = cardMarkup.querySelector(selectorCardElement);
        cardDeleteButton.addEventListener('click', () => {
            api.removeCard(card._id)
                .then(cardNode.remove());
        });
    }
    return cardMarkup;
}

export const renderCard = (cardMarkup, toBegining = true) => {
    
    toBegining ? cardsContainer.prepend(cardMarkup) : cardsContainer.append(cardMarkup);
    
}

export const renderCards = function(requestCards) {
    if (!requestCards) {
        cards.forEach(card => renderCard(createCardMarkup(card), false));
        return;
    }

    cards.splice(0, cards.length);
    api.getInitialCards()
        .then(json => json.forEach(card => {
            cards.push(card);
            renderCard(createCardMarkup(card), false);
        }))
        .catch(error => console.log(error));

}

