export default class Section {

    _items;
    _renderer;
    _selectorContainer;
    _container;

    constructor({items, renderer}, selectorContainer) {

        this._selectorContainer = selectorContainer;
        this._container = document.querySelector(this._selectorContainer);;
        this._items = items;
        this._renderer = renderer;  
        this.renderItems();
    }

    updateItems(items) {

        this._items = items;
    }

    renderItem(item, atTheEnd = true) {

        const element = this._renderer(item);
        this.addItem(element, atTheEnd);       
    }

    renderItems() {

        this._items.forEach(item => this.renderItem(item));
    }

    addItem(element, atTheEnd = true ) {
        
        atTheEnd ? this._container.append(element) : this._container.prepend(element);
    }



}