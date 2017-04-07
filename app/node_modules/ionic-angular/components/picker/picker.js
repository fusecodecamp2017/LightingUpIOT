var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { EventEmitter, Injectable, Output } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PickerCmp } from './picker-component';
import { ViewController } from '../../navigation/view-controller';
export var Picker = (function (_super) {
    __extends(Picker, _super);
    /**
     * @param {?} app
     * @param {?=} opts
     */
    function Picker(app, opts) {
        if (opts === void 0) { opts = {}; }
        opts.columns = opts.columns || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        _super.call(this, PickerCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
        this.ionChange = new EventEmitter();
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    Picker.prototype.getTransitionName = function (direction) {
        var /** @type {?} */ key = (direction === 'back' ? 'pickerLeave' : 'pickerEnter');
        return this._nav && this._nav.config.get(key);
    };
    /**
     * @param {?} button
     * @return {?}
     */
    Picker.prototype.addButton = function (button) {
        this.data.buttons.push(button);
    };
    /**
     * @param {?} column
     * @return {?}
     */
    Picker.prototype.addColumn = function (column) {
        this.data.columns.push(column);
    };
    /**
     * @return {?}
     */
    Picker.prototype.getColumns = function () {
        return this.data.columns;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    Picker.prototype.getColumn = function (name) {
        return this.getColumns().find(function (column) { return column.name === name; });
    };
    /**
     * @return {?}
     */
    Picker.prototype.refresh = function () {
        this._cmp && this._cmp.instance.refresh && this._cmp.instance.refresh();
    };
    /**
     * @param {?} cssClass
     * @return {?}
     */
    Picker.prototype.setCssClass = function (cssClass) {
        this.data.cssClass = cssClass;
    };
    /**
     * Present the picker instance.
     *
     * @param {?=} navOptions
     * @return {?}
     */
    Picker.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions);
    };
    Picker.propDecorators = {
        'ionChange': [{ type: Output },],
    };
    return Picker;
}(ViewController));
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
export var PickerController = (function () {
    /**
     * @param {?} _app
     */
    function PickerController(_app) {
        this._app = _app;
    }
    /**
     * Open a picker.
     * @param {?=} opts
     * @return {?}
     */
    PickerController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Picker(this._app, opts);
    };
    PickerController.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PickerController.ctorParameters = function () { return [
        { type: App, },
    ]; };
    return PickerController;
}());
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