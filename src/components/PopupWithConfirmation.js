import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    
    constructor(selectorPopup) {
        
        super(selectorPopup);
    }

    open(actionAfterConfirm) {

        this._actionAfterConfirm = actionAfterConfirm;
        this._elementPopup.addEventListener('submit', this._actionAfterConfirm);
        super.open();
    }

    close() {

        this._elementPopup.removeEventListener('submit', this._actionAfterConfirm);
        super.close();
    }

}