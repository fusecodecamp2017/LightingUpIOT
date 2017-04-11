var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Attribute, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var ListHeader = (function (_super) {
    __extends(ListHeader, _super);
    /**
     * @param {?} config
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} _id
     */
    function ListHeader(config, renderer, elementRef, _id) {
        _super.call(this, config, elementRef, renderer, 'list-header');
        this._id = _id;
    }
    Object.defineProperty(ListHeader.prototype, "color", {
        /**
         * \@input {string} The color to use from your Sass `$colors` map.
         * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
         * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._setColor(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListHeader.prototype, "mode", {
        /**
         * \@input {string} The mode determines which platform styles to use.
         * Possible values are: `"ios"`, `"md"`, or `"wp"`.
         * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._setMode(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListHeader.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._id = val;
            this.setElementAttribute('id', val);
        },
        enumerable: true,
        configurable: true
    });
    ListHeader.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-list-header'
                },] },
    ];
    /** @nocollapse */
    ListHeader.ctorParameters = function () { return [
        { type: Config, },
        { type: Renderer, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Attribute, args: ['id',] },] },
    ]; };
    ListHeader.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return ListHeader;
}(Ion));
function ListHeader_tsickle_Closure_declarations() {
    /** @type {?} */
    ListHeader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ListHeader.ctorParameters;
    /** @type {?} */
    ListHeader.propDecorators;
    /** @type {?} */
    ListHeader.prototype._id;
}
//# sourceMappingURL=list-header.js.map