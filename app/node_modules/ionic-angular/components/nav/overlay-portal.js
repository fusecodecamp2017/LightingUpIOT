var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ComponentFactoryResolver, Directive, ElementRef, forwardRef, Inject, Input, NgZone, Optional, Renderer, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { DomController } from '../../platform/dom-controller';
import { GestureController } from '../../gestures/gesture-controller';
import { Keyboard } from '../../platform/keyboard';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { Platform } from '../../platform/platform';
import { TransitionController } from '../../transitions/transition-controller';
export var OverlayPortal = (function (_super) {
    __extends(OverlayPortal, _super);
    /**
     * @param {?} app
     * @param {?} config
     * @param {?} plt
     * @param {?} keyboard
     * @param {?} elementRef
     * @param {?} zone
     * @param {?} renderer
     * @param {?} cfr
     * @param {?} gestureCtrl
     * @param {?} transCtrl
     * @param {?} linker
     * @param {?} viewPort
     * @param {?} domCtrl
     */
    function OverlayPortal(app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, viewPort, domCtrl) {
        var _this = this;
        _super.call(this, null, app, config, plt, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, domCtrl);
        this._isPortal = true;
        this._init = true;
        this.setViewport(viewPort);
        // on every page change make sure the portal has
        // dismissed any views that should be auto dismissed on page change
        app.viewDidLeave.subscribe(function (ev) {
            !ev.isOverlay && _this.dismissPageChangeViews();
        });
    }
    Object.defineProperty(OverlayPortal.prototype, "_overlayPortal", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._zIndexOffset = (val || 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OverlayPortal.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    OverlayPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[overlay-portal]',
                },] },
    ];
    /** @nocollapse */
    OverlayPortal.ctorParameters = function () { return [
        { type: App, decorators: [{ type: Inject, args: [forwardRef(function () { return App; }),] },] },
        { type: Config, },
        { type: Platform, },
        { type: Keyboard, },
        { type: ElementRef, },
        { type: NgZone, },
        { type: Renderer, },
        { type: ComponentFactoryResolver, },
        { type: GestureController, },
        { type: TransitionController, },
        { type: DeepLinker, decorators: [{ type: Optional },] },
        { type: ViewContainerRef, },
        { type: DomController, },
    ]; };
    OverlayPortal.propDecorators = {
        '_overlayPortal': [{ type: Input, args: ['overlay-portal',] },],
    };
    return OverlayPortal;
}(NavControllerBase));
function OverlayPortal_tsickle_Closure_declarations() {
    /** @type {?} */
    OverlayPortal.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    OverlayPortal.ctorParameters;
    /** @type {?} */
    OverlayPortal.propDecorators;
}
//# sourceMappingURL=overlay-portal.js.map