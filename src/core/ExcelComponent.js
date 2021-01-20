import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];

        this.prepare();
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    // Увдедомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    // Сюда приходят только изменения полей на которые мы пидписались
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // Инициализируем компонент и добавляем DOM слушателей
    init() {
        this.initDOMListeners();
    }

    // Удаляем компонент и чистим слушателей
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}
