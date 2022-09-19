import * as utils from './utils';

export let userData = {
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
}

function setProfileData(profileData) {
    userData = {...profileData};
}

export function requestProfileData() {
    return fetch(utils.urlMe, utils.fetchHeaders)
        .then(res => {
            if (res.ok) return res.json();
            return utils.processError(res);
        })
        .then(profileData => {
            setProfileData(profileData);
            renderUserData();
        })
        .catch();
}

const nodeProfileUsername = document.querySelector('.profile__user-name');
const nodeProfileDescription = document.querySelector('.profile__user-description');
const nodeProfileAvatar = document.querySelector('.profile__avatar');

export function renderUserData() {
    nodeProfileUsername.textContent = userData.name;
    nodeProfileDescription.textContent = userData.about;
    nodeProfileAvatar.setAttribute('src', userData.avatar);
}