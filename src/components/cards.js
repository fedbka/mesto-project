import * as modal from './modal';
import * as profile from './profile';
import * as api from './api';

export const cards = [];
const selectorCardTemplate = '#element__template';
const selectorCardsContainer = '.elements';
const selectorCardImage = '.element__image';
const selectorCardTitle = '.element__title';
const selectorCardLikeButton = '.element__like-button';
const selectorCardDeleteButton = '.element__delete-button';
const selectorCardElement = '.element';
const selectorCardLikesCount = '.element__likes-count';

const cardsContainer = document.querySelector(selectorCardsContainer);
const cardMarkupTemplate = document.querySelector(selectorCardTemplate); 

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
        updatedCard
            .then(updatedCardData => {
            cardLikesCount.textContent = updatedCardData.likes.length
            cardLikeButton.classList.toggle('element__like-button_liked')
            })
            .catch((error) => modal.showErrorPopup(error));
    });


    const cardDeleteButton = cardMarkup.querySelector(selectorCardDeleteButton);
    
    if (!profile.usersEqual(card.owner, profile.currentUser)) {
        cardDeleteButton.classList.add('element__like-button_hidden');
    } else {
        const cardNode = cardMarkup.querySelector(selectorCardElement);
        cardDeleteButton.addEventListener('click', () => modal.showConfirmActionPopup(() => {
            removeCard(card._id, cardNode)
                .then(() => {
                    modal.closeConfirmPopup();
                });
        }));
    }
    return cardMarkup;
}

const removeCard = (cardID, cardNode) => {
    return api.removeCard(cardID)
    .then(()=> cardNode.remove())
    .catch((error) => modal.showErrorPopup(error));
} 

export const renderCard = (cardMarkup, toBegining = true) => {
    
    toBegining ? cardsContainer.prepend(cardMarkup) : cardsContainer.append(cardMarkup);
    
}

export const renderCards = function(requestCards) {

    cards.forEach(card => renderCard(createCardMarkup(card), false));

}

