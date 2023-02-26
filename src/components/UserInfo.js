export default class UserInfo {

    _selectorProfileUsername;
    _selectorProfileDescription;
    _selectorProfileAvatar;
    _elementUsername;
    _elementDescription;
    _elementAvatar;
    _userInfo = {
        about: '',
        name: '',
        avatar: '',
        chohort: '',
        _id: '',
   };

    constructor({selectorProfileUsername, selectorProfileDescription, selectorProfileAvatar}) {

        this._selectorProfileUsername = selectorProfileUsername;
        this._selectorProfileDescription = selectorProfileDescription;
        this._selectorProfileAvatar = selectorProfileAvatar;
        this._getElements();
    }

    _getElements() {

        this._elementUsername = document.querySelector(this._selectorProfileUsername);
        this._elementDescription = document.querySelector(this._selectorProfileDescription);
        this._elementAvatar = document.querySelector(this._selectorProfileAvatar);
    }

    getUserInfo() {

        return this._userInfo;
    }

    setUserInfo(userInfo) {

        this._userInfo = {...userInfo};
        this._renderProfile();
    }

    checkInUserList(userList) {

        return userList.some(user => this.usersEqual(user));
    }

    usersEqual(user) {

        return this._userInfo._id == user._id;

    }

    _renderProfile() {

        this._elementUsername.textContent = this._userInfo.name;
        this._elementDescription.textContent = this._userInfo.about;
        this._elementAvatar.setAttribute('src', this._userInfo.avatar);
    }
}