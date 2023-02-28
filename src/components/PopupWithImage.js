import Popup from "./Popup";

export default class PopupWithImage extends Popup {

    _selectorImage = '.showroom__image';
    _selectorCaption = '.showroom__caption';

    constructor(selectorPopup) {

        super(selectorPopup);
        this._elementImage = this._elementPopup.querySelector(this._selectorImage);
        this._elementCaption = this._elementPopup.querySelector(this._selectorCaption);
    }

    open(imageLink, imageCaption) {

        this._elementImage.setAttribute('src', imageLink);
        this._elementImage.setAttribute('alt', imageCaption);
        this._elementCaption.textContent = imageCaption;
        super.open();
    }

    close() {
        
        this._elementImage.setAttribute('src', '');
        this._elementImage.setAttribute('alt', '');
        this._elementCaption.textContent = '';
        super.close();
       
    }
}