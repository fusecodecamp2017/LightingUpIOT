import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
 * \@name Badge
 * \@module ionic
 * \@description
 * Badges are simple components in Ionic containing numbers or text. You can display a badge to indicate that there is new information associated with the item it is on.
 * @see {\@link /docs/v2/components/#badges Badges Component Docs}
 */
export class Badge extends Ion {
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'badge');
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
}
Badge.decorators = [
    { type: Directive, args: [{
                selector: 'ion-badge'
            },] },
];
/** @nocollapse */
Badge.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Badge.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
function Badge_tsickle_Closure_declarations() {
    /** @type {?} */
    Badge.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Badge.ctorParameters;
    /** @type {?} */
    Badge.propDecorators;
}
//# sourceMappingURL=badge.js.map