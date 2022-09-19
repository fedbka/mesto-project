import * as modal from './modal';
import * as utils from './utils';
import * as profile from './profile';

export const cards = [];
export const selectorCardTemplate = '#element__template';
export const selectorCardsContainer = '.elements';
export const selectorCardImage = '.element__image';
export const selectorCardTitle = '.element__title';
export const selectorCardLikeButton = '.element__like-button';
export const selectorCardDeleteButton = '.element__delete-button';
export const selectorCardElement = '.element';

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
    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('element__like-button_liked'));

    const cardDeleteButton = cardMarkup.querySelector(selectorCardDeleteButton);
    
    if (card.owner._id != profile.userData._id) {
        cardDeleteButton.classList.add('element__like-button_hidden');
    } else {
        const cardNode = cardMarkup.querySelector(selectorCardElement);
        cardDeleteButton.addEventListener('click', () => cardNode.remove());
    }
    return cardMarkup;
}

export const renderCard = (cardMarkup) => {
    cardsContainer.prepend(cardMarkup);
}

export const renderCards = function(requestCards) {
    if (!requestCards) {
        cards.forEach(card => renderCard(createCardMarkup(card)));
        return;
    }

    cards.splice(0, cards.length);
    fetch(utils.urlCards, utils.fetchHeaders)
        .then(res => {
            if (res.ok) return res.json();
            return utils.processError(res);
        })
        .then(json => json.forEach(card => {
            cards.push(card);
            renderCard(createCardMarkup(card));
        }))
        .catch(error => console.log(error));

}

