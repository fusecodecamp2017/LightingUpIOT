import { Attribute, Directive, NgZone } from '@angular/core';
import { Platform } from '../../platform/platform';
export class DisplayWhen {
    /**
     * @param {?} conditions
     * @param {?} _plt
     * @param {?} zone
     */
    constructor(conditions, _plt, zone) {
        this._plt = _plt;
        this.zone = zone;
        this.isMatch = false;
        if (!conditions)
            return;
        this.conditions = conditions.replace(/\s/g, '').split(',');
        // check if its one of the matching platforms first
        // a platform does not change during the life of an app
        for (let i = 0; i < this.conditions.length; i++) {
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
    orientation() {
        for (let /** @type {?} */ i = 0; i < this.conditions.length; i++) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resizeObs && this.resizeObs.unsubscribe();
        this.resizeObs = null;
    }
}
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
export class ShowWhen extends DisplayWhen {
    /**
     * @param {?} showWhen
     * @param {?} plt
     * @param {?} zone
     */
    constructor(showWhen, plt, zone) {
        super(showWhen, plt, zone);
    }
}
// ngOnDestroy is implemente in DisplayWhen
ShowWhen.decorators = [
    { type: Directive, args: [{
                selector: '[showWhen]',
                host: {
                    '[class.hidden-show-when]': '!isMatch'
                }
            },] },
];
/** @nocollapse */
ShowWhen.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Attribute, args: ['showWhen',] },] },
    { type: Platform, },
    { type: NgZone, },
];
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
export class HideWhen extends DisplayWhen {
    /**
     * @param {?} hideWhen
     * @param {?} plt
     * @param {?} zone
     */
    constructor(hideWhen, plt, zone) {
        super(hideWhen, plt, zone);
    }
}
// ngOnDestroy is implemente in DisplayWhen
HideWhen.decorators = [
    { type: Directive, args: [{
                selector: '[hideWhen]',
                host: {
                    '[class.hidden-hide-when]': 'isMatch'
                }
            },] },
];
/** @nocollapse */
HideWhen.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Attribute, args: ['hideWhen',] },] },
    { type: Platform, },
    { type: NgZone, },
];
function HideWhen_tsickle_Closure_declarations() {
    /** @type {?} */
    HideWhen.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HideWhen.ctorParameters;
}
//# sourceMappingURL=show-hide-when.js.map