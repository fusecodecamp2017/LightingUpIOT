var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_1 = require('../../platform/platform');
    var DisplayWhen = (function () {
        /**
         * @param {?} conditions
         * @param {?} _plt
         * @param {?} zone
         */
        function DisplayWhen(conditions, _plt, zone) {
            this._plt = _plt;
            this.zone = zone;
            this.isMatch = false;
            if (!conditions)
                return;
            this.conditions = conditions.replace(/\s/g, '').split(',');
            // check if its one of the matching platforms first
            // a platform does not change during the life of an app
            for (var i = 0; i < this.conditions.length; i++) {
                if (this.conditions[i] && _plt.is(this.conditions[i])) {
                    this.isMatch = true;
                    return;
                }
            }
            if (this.orientation()) {
                // add window resize listener
                this.resizeObs = _plt.resize.subscribe(this.orientation.bind(this));
            }
        }
        /**
         * @return {?}
         */
        DisplayWhen.prototype.orientation = function () {
            for (var /** @type {?} */ i = 0; i < this.conditions.length; i++) {
                if (this.conditions[i] === 'portrait') {
                    this.isMatch = this._plt.isPortrait();
                    return true;
                }
                if (this.conditions[i] === 'landscape') {
                    this.isMatch = this._plt.isLandscape();
                    return true;
                }
            }
            return false;
        };
        /**
         * @return {?}
         */
        DisplayWhen.prototype.ngOnDestroy = function () {
            this.resizeObs && this.resizeObs.unsubscribe();
            this.resizeObs = null;
        };
        return DisplayWhen;
    }());
    exports.DisplayWhen = DisplayWhen;
    function DisplayWhen_tsickle_Closure_declarations() {
        /** @type {?} */
        DisplayWhen.prototype.isMatch;
        /** @type {?} */
        DisplayWhen.prototype.conditions;
        /** @type {?} */
        DisplayWhen.prototype.resizeObs;
        /** @type {?} */
        DisplayWhen.prototype._plt;
        /** @type {?} */
        DisplayWhen.prototype.zone;
    }
    /**
     *
     * \@name ShowWhen
     * \@description
     * The `showWhen` attribute takes a string that represents a platform or screen orientation.
     * The element the attribute is added to will only be shown when that platform or screen orientation is active.
     *
     * Complements the [hideWhen attribute](../HideWhen). If the `showWhen` attribute is used on an
     * element that also has the `hideWhen` attribute, the element will not show if `hideWhen` evaluates
     * to `true` or `showWhen` evaluates to `false`. If the `hidden` attribute is also added, the element
     * will not show if `hidden` evaluates to `true`.
     *
     * View the [Platform API docs](../../../platform/Platform) for more information on the different
     * platforms you can use.
     *
     * \@usage
     * ```html
     * <div showWhen="android">
     *  I am visible on Android!
     * </div>
     *
     * <div showWhen="ios">
     *  I am visible on iOS!
     * </div>
     *
     * <div showWhen="android,ios">
     *  I am visible on Android and iOS!
     * </div>
     *
     * <div showWhen="portrait">
     *  I am visible on Portrait!
     * </div>
     *
     * <div showWhen="landscape">
     *  I am visible on Landscape!
     * </div>
     * ```
     * \@demo /docs/v2/demos/src/show-when/
     * @see {\@link ../HideWhen HideWhen API Docs}
     * @see {\@link ../../../platform/Platform Platform API Docs}
     */
    var ShowWhen = (function (_super) {
        __extends(ShowWhen, _super);
        /**
         * @param {?} showWhen
         * @param {?} plt
         * @param {?} zone
         */
        function ShowWhen(showWhen, plt, zone) {
            _super.call(this, showWhen, plt, zone);
        }
        // ngOnDestroy is implemente in DisplayWhen
        ShowWhen.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[showWhen]',
                        host: {
                            '[class.hidden-show-when]': '!isMatch'
                        }
                    },] },
        ];
        /** @nocollapse */
        ShowWhen.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['showWhen',] },] },
            { type: platform_1.Platform, },
            { type: core_1.NgZone, },
        ]; };
        return ShowWhen;
    }(DisplayWhen));
    exports.ShowWhen = ShowWhen;
    function ShowWhen_tsickle_Closure_declarations() {
        /** @type {?} */
        ShowWhen.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        ShowWhen.ctorParameters;
    }
    /**
     * \@name HideWhen
     * \@description
     * The `hideWhen` attribute takes a string that represents a plaform or screen orientation.
     * The element the attribute is added to will only be hidden when that platform or screen orientation is active.
     *
     * Complements the [showWhen attribute](../ShowWhen). If the `hideWhen` attribute is used on an
     * element that also has the `showWhen` attribute, the element will not show if `hideWhen` evaluates
     * to `true` or `showWhen` evaluates to `false`. If the `hidden` attribute is also added, the element
     * will not show if `hidden` evaluates to `true`.
     *
     * View the [Platform API docs](../../../platform/Platform) for more information on the different
     * platforms you can use.
     *
     * \@usage
     * ```html
     * <div hideWhen="android">
     *  I am hidden on Android!
     * </div>
     *
     * <div hideWhen="ios">
     *  I am hidden on iOS!
     * </div>
     *
     * <div hideWhen="android,ios">
     *  I am hidden on Android and iOS!
     * </div>
     *
     * <div hideWhen="portrait">
     *  I am hidden on Portrait!
     * </div>
     *
     * <div hideWhen="landscape">
     *  I am hidden on Landscape!
     * </div>
     * ```
     *
     * \@demo /docs/v2/demos/src/hide-when/
     * @see {\@link ../ShowWhen ShowWhen API Docs}
     * @see {\@link ../../../platform/Platform Platform API Docs}
     */
    var HideWhen = (function (_super) {
        __extends(HideWhen, _super);
        /**
         * @param {?} hideWhen
         * @param {?} plt
         * @param {?} zone
         */
        function HideWhen(hideWhen, plt, zone) {
            _super.call(this, hideWhen, plt, zone);
        }
        // ngOnDestroy is implemente in DisplayWhen
        HideWhen.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[hideWhen]',
                        host: {
                            '[class.hidden-hide-when]': 'isMatch'
                        }
                    },] },
        ];
        /** @nocollapse */
        HideWhen.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['hideWhen',] },] },
            { type: platform_1.Platform, },
            { type: core_1.NgZone, },
        ]; };
        return HideWhen;
    }(DisplayWhen));
    exports.HideWhen = HideWhen;
    function HideWhen_tsickle_Closure_declarations() {
        /** @type {?} */
        HideWhen.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        HideWhen.ctorParameters;
    }
});
//# sourceMappingURL=show-hide-when.js.map