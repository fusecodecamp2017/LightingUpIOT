(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../platform/key', '../../navigation/nav-params', '../../navigation/view-controller', '../../gestures/gesture-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var key_1 = require('../../platform/key');
    var nav_params_1 = require('../../navigation/nav-params');
    var view_controller_1 = require('../../navigation/view-controller');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var ModalCmp = (function () {
        /**
         * @param {?} _cfr
         * @param {?} _renderer
         * @param {?} _navParams
         * @param {?} _viewCtrl
         * @param {?} gestureCtrl
         */
        function ModalCmp(_cfr, _renderer, _navParams, _viewCtrl, gestureCtrl) {
            this._cfr = _cfr;
            this._renderer = _renderer;
            this._navParams = _navParams;
            this._viewCtrl = _viewCtrl;
            var opts = _navParams.get('opts');
            (void 0) /* assert */;
            this._gestureBlocker = gestureCtrl.createBlocker({
                disable: [gesture_controller_1.GESTURE_MENU_SWIPE, gesture_controller_1.GESTURE_GO_BACK_SWIPE]
            });
            this._bdDismiss = opts.enableBackdropDismiss;
        }
        /**
         * @return {?}
         */
        ModalCmp.prototype.ionViewPreLoad = function () {
            this._load(this._navParams.data.component);
        };
        /**
         * @param {?} component
         * @return {?}
         */
        ModalCmp.prototype._load = function (component) {
            if (component) {
                var /** @type {?} */ componentFactory = this._cfr.resolveComponentFactory(component);
                // ******** DOM WRITE ****************
                var /** @type {?} */ componentRef = this._viewport.createComponent(componentFactory, this._viewport.length, this._viewport.parentInjector, []);
                this._viewCtrl._setInstance(componentRef.instance);
                this._setCssClass(componentRef, 'ion-page');
                this._setCssClass(componentRef, 'show-page');
                this._enabled = true;
                this._viewCtrl.willEnter.subscribe(this._viewWillEnter.bind(this));
                this._viewCtrl.didLeave.subscribe(this._viewDidLeave.bind(this));
            }
        };
        /**
         * @return {?}
         */
        ModalCmp.prototype._viewWillEnter = function () {
            this._gestureBlocker.block();
        };
        /**
         * @return {?}
         */
        ModalCmp.prototype._viewDidLeave = function () {
            this._gestureBlocker.unblock();
        };
        /**
         * @param {?} componentRef
         * @param {?} className
         * @return {?}
         */
        ModalCmp.prototype._setCssClass = function (componentRef, className) {
            this._renderer.setElementClass(componentRef.location.nativeElement, className, true);
        };
        /**
         * @return {?}
         */
        ModalCmp.prototype._bdClick = function () {
            if (this._enabled && this._bdDismiss) {
                var /** @type {?} */ opts = {
                    minClickBlockDuration: 400
                };
                return this._viewCtrl.dismiss(null, 'backdrop', opts).catch(function () {
                    (void 0) /* console.debug */;
                });
            }
        };
        /**
         * @param {?} ev
         * @return {?}
         */
        ModalCmp.prototype._keyUp = function (ev) {
            if (this._enabled && this._viewCtrl.isLast() && ev.keyCode === key_1.Key.ESCAPE) {
                this._bdClick();
            }
        };
        /**
         * @return {?}
         */
        ModalCmp.prototype.ngOnDestroy = function () {
            (void 0) /* assert */;
            this._gestureBlocker.destroy();
        };
        ModalCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-modal',
                        template: '<ion-backdrop (click)="_bdClick()" [class.backdrop-no-tappable]="!_bdDismiss"></ion-backdrop>' +
                            '<div class="modal-wrapper">' +
                            '<div #viewport nav-viewport></div>' +
                            '</div>'
                    },] },
        ];
        /** @nocollapse */
        ModalCmp.ctorParameters = function () { return [
            { type: core_1.ComponentFactoryResolver, },
            { type: core_1.Renderer, },
            { type: nav_params_1.NavParams, },
            { type: view_controller_1.ViewController, },
            { type: gesture_controller_1.GestureController, },
        ]; };
        ModalCmp.propDecorators = {
            '_viewport': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
            '_keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return ModalCmp;
    }());
    exports.ModalCmp = ModalCmp;
    function ModalCmp_tsickle_Closure_declarations() {
        /** @type {?} */
        ModalCmp.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        ModalCmp.ctorParameters;
        /** @type {?} */
        ModalCmp.propDecorators;
        /** @type {?} */
        ModalCmp.prototype._viewport;
        /** @type {?} */
        ModalCmp.prototype._bdDismiss;
        /** @type {?} */
        ModalCmp.prototype._enabled;
        /** @type {?} */
        ModalCmp.prototype._gestureBlocker;
        /** @type {?} */
        ModalCmp.prototype._cfr;
        /** @type {?} */
        ModalCmp.prototype._renderer;
        /** @type {?} */
        ModalCmp.prototype._navParams;
        /** @type {?} */
        ModalCmp.prototype._viewCtrl;
    }
});
//# sourceMappingURL=modal-component.js.map