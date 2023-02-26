import Popup from "./Popup";

export default class PopupWithForm extends Popup {   
    constructor(selectorPopup, buttonFormSubmit, submitHandler) {
        super(selectorPopup, buttonFormSubmit);
        this._form = this._elementPopup.querySelector('.form');
        this._submitHandler = this._getSubmitHandler(submitHandler);
    }

    _getSubmitHandler(submitHandler) {
        return () => {
            super.setTextFormSubmitButton('Отправляем данные...');
            submitHandler(this._getInputValues())
            .finally(() => this.close());
        }
    } 

    _getInputValues() {
        const { elements } = this._form;
        const formValues = Array.from(elements)
          .map((element) => {
            const { name, type } = element
            const value = type === 'checkbox' ? element.checked : element.value
      
            return { name, value }
          })
          .filter((item) => !!item.name);

        const newMap = new Map(formValues.map(formValue => [formValue.name, formValue.value]));
           
        return newMap;
    }

    _setInputValues(inputValues) {

        const { elements } = this._form;
        Array.from(elements).map((element => {
            const { name, type } = element;
            if (!name || !inputValues[name]) return;
            element.value = type === 'checkbox' ? !!inputValues[name] : inputValues[name];
        }));
    }

    getFormElement() {
        return this._form;
    }

    setEventListeners() {
        this._elementPopup.addEventListener('submit', (evt) => evt.preventDefault());
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    removeEventListeners() {
        this._elementPopup.removeEventListener('submit', (evt) => evt.preventDefault());
        this._form.removeEventListener('submit', this._submitHandler);
        super.removeEventListeners();        
    }

    open(inputValues) {
        if (!!inputValues) this._setInputValues(inputValues); 
        super.open();
    }

    close() {        
        super.close();
        this._form.reset();
    }
}