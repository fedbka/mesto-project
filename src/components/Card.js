export default class Card {
    _cardData;
    _templateSelector;
    _element;
    _selectorCardElement = '.element';
    _selectorCardImage = '.element__image';
    _selectorCardTitle = '.element__title';
    _selectorCardLikeButton = '.element__like-button';
    _selectorCardDeleteButton = '.element__delete-button';
    _selectorCardLikesCount = '.element__likes-count';
    _cssClassCardLiked = 'element__like-button_liked';
    _cssClassCardDeleteButtonHidden = 'element__like-button_hidden';
    _imageClickHandler;
    _checkInUserListHandler;
    _checkOwnerHandler;
    _addLikeHandler;
    _removeLikeHandler;
    _removeCardHandler;
    _showErrorHandler;
    _deleteConfirmHandler;
    _closeDeleteConfirmAction;
    _setConfirmButtonStateHandler;
    constructor(data,
        templateSelector,
        imageClickHandler,
        checkInUserListHandler,
        checkOwnerHandler,
        addLikeHandler,
        removeLikeHandler,
        removeCardHandler,
        showErrorHandler,
        deleteConfirmHandler,
        closeDeleteConfirmAction,
        setConfirmButtonStateHandler) {
            
        this._templateSelector = templateSelector;
        this._cardData = data;
        this._imageClickHandler = imageClickHandler;
        this._checkInUserListHandler = checkInUserListHandler;
        this._checkOwnerHandler = checkOwnerHandler;
        this._addLikeHandler = addLikeHandler;
        this._removeLikeHandler = removeLikeHandler;
        this._removeCardHandler = removeCardHandler;
        this._showErrorHandler = showErrorHandler;
        this._deleteConfirmHandler = deleteConfirmHandler;
        this._closeDeleteConfirmAction = closeDeleteConfirmAction;
        this._setConfirmButtonStateHandler = setConfirmButtonStateHandler;
    }

    _getCardElement() {

        const element = document
            .querySelector(this._templateSelector)
            .content.querySelector(this._selectorCardElement)
            .cloneNode(true);

        return element;

    }

    getElement = () => {

        this._element = this._getCardElement();

        const cardImage = this._element.querySelector(this._selectorCardImage);
        cardImage.setAttribute('src', this._cardData.link);
        cardImage.setAttribute('alt', this._cardData.name);
        cardImage.addEventListener('click', this._imageClickHandler);

        const cardTitle = this._element.querySelector(this._selectorCardTitle);
        cardTitle.textContent = this._cardData.name;

        const cardLikesCount = this._element.querySelector(this._selectorCardLikesCount);
        cardLikesCount.textContent = this._cardData.likes.length;

        const cardLikeButton = this._element.querySelector(this._selectorCardLikeButton);
        cardLikeButton.addEventListener('click', () => {
            const updatedCard = cardLikeButton.classList.contains(this._cssClassCardLiked)
                ? this._removeLikeHandler()
                : this._addLikeHandler();

            updatedCard.then(updatedCardData => {
                cardLikesCount.textContent = updatedCardData.likes.length;
                cardLikeButton.classList.toggle(this._cssClassCardLiked)
            }).catch((error) => this._showErrorHandler(error));

        });

        if (this._checkInUserListHandler()) {
            cardLikeButton.classList.add(this._cssClassCardLiked);
        }

        if (this._checkOwnerHandler()) {
            const cardDeleteButton = this._element.querySelector(this._selectorCardDeleteButton);
            cardDeleteButton.classList.remove(this._cssClassCardDeleteButtonHidden);
            cardDeleteButton.addEventListener('click', () => this._deleteConfirmHandler(() => {
                this._setConfirmButtonStateHandler();
                this._removeCardHandler(this._cardData._id)
                    .then(() => {
                        this._element.remove();                        
                        this._closeDeleteConfirmAction();
                    })
                    .catch((error) => this._showErrorHandler(error))
            }));
        }

        return this._element;
    }

}