export default class Api {
    
    constructor(baseUrl, authorizationToken) {

        this._baseUrl = baseUrl;
        this._authorizationToken = authorizationToken;
        this._config = {
            baseUrl: baseUrl,
            headers: {
                authorization: authorizationToken,
                'Content-Type': 'application/json',
            }
        }
    }

    _requestData = (request, method = 'GET', body = '') => {
    
        const params = {
            'method': method,
            'headers': this._config.headers,
        }
        
        if (method != 'GET' && body) params.body = JSON.stringify(body);
    
        return fetch(`${this._config.baseUrl}/${request}`, params)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res);
            });
    }
    
    getInitialCards = () => {

        return this._requestData('cards');
    }

    getProfile = () => {

        return this._requestData('users/me');
    }
    
    updateProfile = (name, about) => {

        return this._requestData('users/me', 'PATCH', {name, about});
    }

    setLike = (cardID) => {

        return this._requestData(`cards/likes/${cardID}`, 'PUT');
    }

    unsetLike = (cardID) => {

        return this._requestData(`cards/likes/${cardID}`, 'DELETE');
    }

    removeCard = (cardID) => {

        return this._requestData(`cards/${cardID}`, 'DELETE');
    }

    addCard = (cardName, cardImageUrl) => {

        return this._requestData(`cards/`, 'POST', {name: cardName, link: cardImageUrl});
    }

    updateAvatar = (avatarUrl) => {
        
        return this._requestData('users/me/avatar', 'PATCH', {avatar: avatarUrl});
    }

}