import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Card extends Ion {
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card');
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
Card.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card'
            },] },
];
/** @nocollapse */
Card.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Card.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
function Card_tsickle_Closure_declarations() {
    /** @type {?} */
    Card.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Card.ctorParameters;
    /** @type {?} */
    Card.propDecorators;
}
export class CardContent extends Ion {
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-content');
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
CardContent.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-content'
            },] },
];
/** @nocollapse */
CardContent.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
CardContent.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
function CardContent_tsickle_Closure_declarations() {
    /** @type {?} */
    CardContent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CardContent.ctorParameters;
    /** @type {?} */
    CardContent.propDecorators;
}
export class CardHeader extends Ion {
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-header');
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
CardHeader.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-header'
            },] },
];
/** @nocollapse */
CardHeader.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
CardHeader.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
function CardHeader_tsickle_Closure_declarations() {
    /** @type {?} */
    CardHeader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CardHeader.ctorParameters;
    /** @type {?} */
    CardHeader.propDecorators;
}
export class CardTitle extends Ion {
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'card-title');
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
CardTitle.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-title'
            },] },
];
/** @nocollapse */
CardTitle.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
CardTitle.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
function CardTitle_tsickle_Closure_declarations() {
    /** @type {?} */
    CardTitle.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CardTitle.ctorParameters;
    /** @type {?} */
    CardTitle.propDecorators;
}
//# sourceMappingURL=card.js.map