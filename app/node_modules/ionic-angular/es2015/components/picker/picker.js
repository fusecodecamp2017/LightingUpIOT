import { EventEmitter, Injectable, Output } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PickerCmp } from './picker-component';
import { ViewController } from '../../navigation/view-controller';
export class Picker extends ViewController {
    /**
     * @param {?} app
     * @param {?=} opts
     */
    constructor(app, opts = {}) {
        opts.columns = opts.columns || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        super(PickerCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
        this.ionChange = new EventEmitter();
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    getTransitionName(direction) {
        let /** @type {?} */ key = (direction === 'back' ? 'pickerLeave' : 'pickerEnter');
        return this._nav && this._nav.config.get(key);
    }
    /**
     * @param {?} button
     * @return {?}
     */
    addButton(button) {
        this.data.buttons.push(button);
    }
    /**
     * @param {?} column
     * @return {?}
     */
    addColumn(column) {
        this.data.columns.push(column);
    }
    /**
     * @return {?}
     */
    getColumns() {
        return this.data.columns;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getColumn(name) {
        return this.getColumns().find(column => column.name === name);
    }
    /**
     * @return {?}
     */
    refresh() {
        this._cmp && this._cmp.instance.refresh && this._cmp.instance.refresh();
    }
    /**
     * @param {?} cssClass
     * @return {?}
     */
    setCssClass(cssClass) {
        this.data.cssClass = cssClass;
    }
    /**
     * Present the picker instance.
     *
     * @param {?=} navOptions
     * @return {?}
     */
    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}
Picker.propDecorators = {
    'ionChange': [{ type: Output },],
};
function Picker_tsickle_Closure_declarations() {
    /** @type {?} */
    Picker.propDecorators;
    /** @type {?} */
    Picker.prototype._app;
    /** @type {?} */
    Picker.prototype.ionChange;
}
/**
 * \@name PickerController
 * \@description
 *
 */
export class PickerController {
    /**
     * @param {?} _app
     */
    constructor(_app) {
        this._app = _app;
    }
    /**
     * Open a picker.
     * @param {?=} opts
     * @return {?}
     */
    create(opts = {}) {
        return new Picker(this._app, opts);
    }
}
PickerController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PickerController.ctorParameters = () => [
    { type: App, },
];
function PickerController_tsickle_Closure_declarations() {
    /** @type {?} */
    PickerController.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PickerController.ctorParameters;
    /** @type {?} */
    PickerController.prototype._app;
}
//# sourceMappingURL=picker.js.map