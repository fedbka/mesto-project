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

    _likeClickHandler = () => {
        const updatedCard = this._cardLikeButton.classList.contains(this._cssClassCardLiked)
        ? this._removeLikeHandler()
        : this._addLikeHandler();

        updatedCard.then(updatedCardData => {
            this._cardLikesCount.textContent = updatedCardData.likes.length;
            this._cardLikeButton.classList.toggle(this._cssClassCardLiked)
        }).catch((error) => this._showErrorHandler(error));

    }

    _deleteCardHandler = () => {
        this._deleteConfirmHandler(() => {
            this._setConfirmButtonStateHandler();
            this._removeCardHandler(this._cardData._id)
                .then(() => {
                    this._element.remove();                        
                    this._closeDeleteConfirmAction();
                })
                .catch((error) => this._showErrorHandler(error))
        })
    }

    _setEventListeners = () => {
        this._cardImage.addEventListener('click', this._imageClickHandler);
        this._cardLikeButton.addEventListener('click', this._likeClickHandler);
        this._cardDeleteButton.addEventListener('click', this._deleteCardHandler);        
    }


    getElement = () => {

        this._element = this._getCardElement();

        this._cardImage = this._element.querySelector(this._selectorCardImage);
        this._cardImage.setAttribute('src', this._cardData.link);
        this._cardImage.setAttribute('alt', this._cardData.name);

        this._cardTitle = this._element.querySelector(this._selectorCardTitle);
        this._cardTitle.textContent = this._cardData.name;

        this._cardLikesCount = this._element.querySelector(this._selectorCardLikesCount);
        this._cardLikesCount.textContent = this._cardData.likes.length;

        this._cardLikeButton = this._element.querySelector(this._selectorCardLikeButton);

        this._owned = this._checkOwnerHandler(); 
        this._isLiked = this._checkInUserListHandler(); 
        
        this._cardDeleteButton = this._element.querySelector(this._selectorCardDeleteButton);
        
        if (this._owned) this._cardDeleteButton.classList.remove(this._cssClassCardDeleteButtonHidden);

        if (this._isLiked) this._cardLikeButton.classList.add(this._cssClassCardLiked);

        this._setEventListeners();

        return this._element;
    }

}