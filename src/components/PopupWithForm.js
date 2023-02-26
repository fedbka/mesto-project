import Popup from "./Popup";

export default class PopupWithForm extends Popup {
   
    constructor(selectorPopup, submitHandler) {
        super(selectorPopup);
        this._form = this._elementPopup.querySelector('.form');
        this._form.setAttribute('novalidation', true);
        this._submitHandler = this._getSubmitHandler(submitHandler);
    }

    _getSubmitHandler(submitHandler) {

        return () => {
            super.setTextFormSubmitButton('Отравляем данные...');
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

        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    removeEventListeners() {

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