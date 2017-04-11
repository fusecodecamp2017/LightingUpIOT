import { Attribute, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class ListHeader extends Ion {
    /**
     * @param {?} config
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} _id
     */
    constructor(config, renderer, elementRef, _id) {
        super(config, elementRef, renderer, 'list-header');
        this._id = _id;
    }
    /**
     * \@input {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
     * @param {?} val
     * @return {?}
     */
    set color(val) {
        this._setColor(val);
    }
    /**
     * \@input {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
     * @param {?} val
     * @return {?}
     */
    set mode(val) {
        this._setMode(val);
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set id(val) {
        this._id = val;
        this.setElementAttribute('id', val);
    }
}
ListHeader.decorators = [
    { type: Directive, args: [{
                selector: 'ion-list-header'
            },] },
];
/** @nocollapse */
ListHeader.ctorParameters = () => [
    { type: Config, },
    { type: Renderer, },
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Attribute, args: ['id',] },] },
];
ListHeader.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
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