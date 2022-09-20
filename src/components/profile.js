import * as api from './api';

export let currentUser = {
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
}

export function setProfile(profile) {
    currentUser = {...profile};
}

export function checkMeIn(users) {
    return users.some(user => usersEqual(user, currentUser));
}

export function usersEqual(user1, user2) {
    return user1._id === user2._id;
}

export function getProfile() {
    return api.getProfile()
        .then(profile => {
            setProfile(profile);
            renderProfile();
        })
        .catch();
}

const nodeProfileUsername = document.querySelector('.profile__user-name');
const nodeProfileDescription = document.querySelector('.profile__user-description');
const nodeProfileAvatar = document.querySelector('.profile__avatar');

export function renderProfile() {
    nodeProfileUsername.textContent = currentUser.name;
    nodeProfileDescription.textContent = currentUser.about;
    nodeProfileAvatar.setAttribute('src', currentUser.avatar);
}