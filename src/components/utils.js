export const cohortId = 'plus-cohort-15';
export const fetchHeaders = {
    headers: {
      authorization: '1eb95489-35af-40e1-aa20-3c2a6c828418'
    }
}

export const urlCards = `https://nomoreparties.co/v1/${cohortId}/cards`;
export const urlMe = `https://nomoreparties.co/v1/${cohortId}/users/me`;

export const processError = function(error) {
    return Promise.reject(`Что-то пошло не так: ${error.status}`);
}