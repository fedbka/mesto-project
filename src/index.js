import "./index.css";
import {
  authorizationToken,
  baseUrl,
  selectorCardsTemplate,
  selectorCardsContainer,
  selectorPopupWithImage,
  selectorPopupWithError,
  selectorPopupWithConfirmation,
  selectorPopupAvatarEdit,
  selectorPopupProfileEdit,
  selectorPopupAddCard,
  selectorProfileUsername,
  selectorProfileDescription,
  selectorProfileAvatar,
  selectorInput,
  selectorInputError,
  selectorSubmitButton,
  selectorCardImage,
  selectorCardLikeButton,
  selectorCardElement,
  selectorCardTitle,
  selectorCardDeleteButton,
  selectorCardLikesCount,
  cssClassCardLiked,
  cssClassCardDeleteButtonHidden,
} from "./utils/constants";

import Api from "./components/Api";
import Card from "./components/Card";
import Section from "./components/Section";
import PopupWithImage from "./components/PopupWithImage";
import PopupWithError from "./components/PopupWinthError";
import PopupWithConfirmation from "./components/PopupWithConfirmation";
import PopupWithForm from "./components/PopupWithForm";
import UserInfo from "./components/UserInfo";
import FormValidator from "./components/FormValidator";

const validationParams = {
  selectorInput,
  selectorInputError,
  selectorSubmitButton,
};

const cards = [];

const api = new Api(baseUrl, authorizationToken);
const userInfo = new UserInfo({
  selectorProfileUsername,
  selectorProfileDescription,
  selectorProfileAvatar,
});

const popupWithImage = new PopupWithImage(selectorPopupWithImage);
const popupWithError = new PopupWithError(selectorPopupWithError);
const popupWithConfirmation = new PopupWithConfirmation(
  selectorPopupWithConfirmation
);

const updateProfileAvatar = (formData) => {
  return api
    .updateAvatar(formData.get("avatarImageUrl"))
    .then((userData) => userInfo.setUserInfo(userData))
    .catch((error) => popupWithError.open(error));
};

const popupAvatarEdit = new PopupWithForm(
  selectorPopupAvatarEdit,
  selectorSubmitButton,
  updateProfileAvatar
);
const formAvatarEditValidator = new FormValidator(
  validationParams,
  popupAvatarEdit.getFormElement()
);
formAvatarEditValidator.enableValidation();

const avatarImage = document.querySelector(".profile__avatar");
avatarImage.addEventListener("click", () => popupAvatarEdit.open());

const updateProfile = (formData) => {
  return api
    .updateProfile(formData.get("name"), formData.get("about"))
    .then((userData) => userInfo.setUserInfo(userData))
    .catch((error) => popupWithError.open(error));
};

const popupProfileEdit = new PopupWithForm(
  selectorPopupProfileEdit,
  selectorSubmitButton,
  updateProfile
);
const formProfileEditValidator = new FormValidator(
  validationParams,
  popupProfileEdit.getFormElement()
);
formProfileEditValidator.enableValidation();

const buttonProfileEdit = document.querySelector(".profile__edit-button");
buttonProfileEdit.addEventListener("click", () =>
  popupProfileEdit.open(userInfo.getUserInfo())
);

const addCardSubmit = (formData) => {
  return api
    .addCard(formData.get("elementName"), formData.get("elementImageUrl"))
    .then((cardData) => sectionCards.renderItem(cardData, false))
    .catch((error) => popupWithError.open(error));
};

const popupAddCard = new PopupWithForm(selectorPopupAddCard, selectorSubmitButton, addCardSubmit);
const formAddCardValidator = new FormValidator(
  validationParams,
  popupAddCard.getFormElement()
);
formAddCardValidator.enableValidation();

const addNewCardButton = document.querySelector(".profile__add-photo-button");
addNewCardButton.addEventListener("click", () => popupAddCard.open());

const getCardRenderer = (cardData) => {
  const newCard = new Card(
    cardData,
    selectorCardsTemplate,
    () => popupWithImage.open(cardData.link, cardData.name),
    () => userInfo.checkInUserList(cardData.likes),
    () => userInfo.usersEqual(cardData.owner),
    () => api.setLike(cardData._id),
    () => api.unsetLike(cardData._id),
    api.removeCard,
    (error) => popupWithError.open(error),
    (actionAfterConfirm) => popupWithConfirmation.open(actionAfterConfirm),
    () => popupWithConfirmation.close(),
    () => popupWithConfirmation.setTextFormSubmitButton("Удаляем...")
  );
  selectorCardImage;
  selectorCardLikeButton;
  selectorCardElement;
  selectorCardTitle;
  selectorCardDeleteButton;
  selectorCardLikesCount;
  cssClassCardLiked;
  cssClassCardDeleteButtonHidden;
  return newCard;
};

const sectionCards = new Section(
  {
    items: cards,
    renderer: (cardData) => {
      const item = getCardRenderer(cardData);
      const itemElement = item.getElement();
      return itemElement;
    },
  },
  selectorCardsContainer
);

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    sectionCards.updateItems(cardsData);
    sectionCards.renderItems();
  })
  .catch((error) => popupWithError.open(error));
