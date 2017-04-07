var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Card = (function (_super) {
    __extends(Card, _super);
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    function Card(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer, 'card');
    }
    Object.defineProperty(Card.prototype, "color", {
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
    Object.defineProperty(Card.prototype, "mode", {
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
    Card.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card'
                },] },
    ];
    /** @nocollapse */
    Card.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    Card.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return Card;
}(Ion));
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
export var CardContent = (function (_super) {
    __extends(CardContent, _super);
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    function CardContent(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer, 'card-content');
    }
    Object.defineProperty(CardContent.prototype, "color", {
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
    Object.defineProperty(CardContent.prototype, "mode", {
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
    CardContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-content'
                },] },
    ];
    /** @nocollapse */
    CardContent.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    CardContent.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return CardContent;
}(Ion));
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
export var CardHeader = (function (_super) {
    __extends(CardHeader, _super);
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    function CardHeader(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer, 'card-header');
    }
    Object.defineProperty(CardHeader.prototype, "color", {
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
    Object.defineProperty(CardHeader.prototype, "mode", {
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
    CardHeader.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-header'
                },] },
    ];
    /** @nocollapse */
    CardHeader.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    CardHeader.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return CardHeader;
}(Ion));
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
export var CardTitle = (function (_super) {
    __extends(CardTitle, _super);
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    function CardTitle(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer, 'card-title');
    }
    Object.defineProperty(CardTitle.prototype, "color", {
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
    Object.defineProperty(CardTitle.prototype, "mode", {
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
    CardTitle.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-title'
                },] },
    ];
    /** @nocollapse */
    CardTitle.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    CardTitle.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return CardTitle;
}(Ion));
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