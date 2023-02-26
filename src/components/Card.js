export default class Card {
    _cardData;
    _templateSelector;
    _element;
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
        setConfirmButtonStateHandler,
        cardImage,
        cardLikeButton,
        cardElement,
        cardTitle,
        cardDeleteButton,
        cardLikesCount,
        cssClassCardLiked,
        cssClassCardDeleteButtonHidden) {
        this._cardElement = cardElement;
        this._cardTitle = cardTitle;
        this._cardDeleteButton = cardDeleteButton;
        this._cardLikesCount = cardLikesCount;
        this._cssClassCardLiked = cssClassCardLiked;
        this._cssClassCardDeleteButtonHidden = cssClassCardDeleteButtonHidden;
        this._cardLikeButton = cardLikeButton;
        this._cardImage =  cardImage;   
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
            .content.querySelector(this._cardElement)
            .cloneNode(true);

        return element;
    }

    getElement = () => {
        this._element = this._getCardElement();

        this._cardImage.setAttribute('src', this._cardData.link);
        this._cardImage.setAttribute('alt', this._cardData.name);        

        this._cardTitle.textContent = this._cardData.name;

        this._cardLikesCount.textContent = this._cardData.likes.length;
        
        if (this._checkInUserListHandler()) {
            this._cardLikeButton.classList.add(this._cssClassCardLiked);
        }

        if (this._checkOwnerHandler()) {
            this._cardDeleteButton.classList.remove(this._cssClassCardDeleteButtonHidden);
        }

        return this._element;
    }


    _setEventlisteners () {
        this._cardImage.addEventListener('click', this._imageClickHandler);

        this._cardDeleteButton.addEventListener('click', () => this._deleteConfirmHandler(() => {
            this._setConfirmButtonStateHandler();
            this._removeCardHandler(this._cardData._id)
                .then(() => {
                    this._element.remove();                        
                    this._closeDeleteConfirmAction();
                })
                .catch((error) => this._showErrorHandler(error))
        }));

        this._cardLikeButton.addEventListener('click', () => {
            const updatedCard = this._cardLikeButton.classList.contains(this._cssClassCardLiked)
                ? this._removeLikeHandler()
                : this._addLikeHandler();

            updatedCard.then(updatedCardData => {
                this._cardLikesCount.textContent = updatedCardData.likes.length;
                this._cardLikeButton.classList.toggle(this._cssClassCardLiked)
            }).catch((error) => this._showErrorHandler(error));

        });
      }

}