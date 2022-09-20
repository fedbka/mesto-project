
const cohortId = 'plus-cohort-15';
const authorizationToken = '1eb95489-35af-40e1-aa20-3c2a6c828418';
export const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
      authorization: authorizationToken,
      'Content-Type': 'application/json',
    }
}

export const processError = function(error) {
    return Promise.reject(`Что-то пошло не так: ${error.status}`);
}

export const requestData = (request, method = 'GET', body = '') => {
    
    const params = {
        'method': method,
        'headers': config.headers,
    }
    
    if (method != 'GET' && body) params.body = JSON.stringify(body);

    return fetch(`${config.baseUrl}/${request}`, params)
        .then(res => {
            if (res.ok) return res.json();
            processError(res);
        });
}

export const getInitialCards = () => {
    return requestData('cards');
}

export const getProfile = () => {
    return requestData('users/me');
}

export const updateProfile = (name, about) => {
    return requestData('users/me', 'PATCH', {name, about});
}

export const setLike = (cardID) => {
    return requestData(`cards/likes/${cardID}`, 'PUT');
}

export const unsetLike = (cardID) => {
    return requestData(`cards/likes/${cardID}`, 'DELETE');
}

export const removeCard = (cardID) => {
    return requestData(`cards/${cardID}`, 'DELETE');
}

export const addCard = (cardName, cardImageUrl) => {
    return requestData(`cards/`, 'POST', {name: cardName, link: cardImageUrl});
}

export const updateAvatar = (avatarUrl) => {
    return requestData('users/me/avatar', 'PATCH', {avatar: avatarUrl});
}

