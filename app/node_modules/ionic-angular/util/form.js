import { Injectable } from '@angular/core';
import { removeArrayItem } from './util';
export var Form = (function () {
    function Form() {
        this._focused = null;
        this._ids = -1;
        this._inputs = [];
    }
    /**
     * @param {?} input
     * @return {?}
     */
    Form.prototype.register = function (input) {
        this._inputs.push(input);
    };
    /**
     * @param {?} input
     * @return {?}
     */
    Form.prototype.deregister = function (input) {
        removeArrayItem(this._inputs, input);
        if (input === this._focused) {
            this._focused = null;
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    Form.prototype.setAsFocused = function (input) {
        this._focused = input;
    };
    /**
     * Focuses the next input element, if it exists.
     * @param {?} currentInput
     * @return {?}
     */
    Form.prototype.tabFocus = function (currentInput) {
        var /** @type {?} */ index = this._inputs.indexOf(currentInput);
        if (index > -1 && (index + 1) < this._inputs.length) {
            var /** @type {?} */ nextInput = this._inputs[index + 1];
            if (nextInput !== this._focused) {
                (void 0) /* console.debug */;
                return nextInput.initFocus();
            }
        }
        index = this._inputs.indexOf(this._focused);
        if (index > 0) {
            var /** @type {?} */ previousInput = this._inputs[index - 1];
            if (previousInput) {
                (void 0) /* console.debug */;
                previousInput.initFocus();
            }
        }
    };
    /**
     * @return {?}
     */
    Form.prototype.nextId = function () {
        return ++this._ids;
    };
    Form.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Form.ctorParameters = function () { return []; };
    return Form;
}());
function Form_tsickle_Closure_declarations() {
    /** @type {?} */
    Form.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Form.ctorParameters;
    /** @type {?} */
    Form.prototype._focused;
    /** @type {?} */
    Form.prototype._ids;
    /** @type {?} */
    Form.prototype._inputs;
}
/**
 * @abstract
 */
export var IonicTapInput = (function () {
    function IonicTapInput() {
    }
    /**
     * @abstract
     * @return {?}
     */
    IonicTapInput.prototype.initFocus = function () { };
    /**
     * @abstract
     * @return {?}
     */
    IonicTapInput.prototype.checked = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    IonicTapInput.prototype.checked = function (val) { };
    /**
     * @abstract
     * @return {?}
     */
    IonicTapInput.prototype.disabled = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    IonicTapInput.prototype.disabled = function (val) { };
    return IonicTapInput;
}());
/**
 * @abstract
 */
export var IonicFormInput = (function () {
    function IonicFormInput() {
    }
    /**
     * @abstract
     * @return {?}
     */
    IonicFormInput.prototype.initFocus = function () { };
    return IonicFormInput;
}());
//# sourceMappingURL=form.js.map