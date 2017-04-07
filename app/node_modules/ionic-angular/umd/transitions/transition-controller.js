(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../config/config', './transition-registry', '../util/util', '../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../config/config');
    var transition_registry_1 = require('./transition-registry');
    var util_1 = require('../util/util');
    var platform_1 = require('../platform/platform');
    var TransitionController = (function () {
        /**
         * @param {?} plt
         * @param {?} _config
         */
        function TransitionController(plt, _config) {
            this.plt = plt;
            this._config = _config;
            this._ids = 0;
            this._trns = {};
        }
        /**
         * @param {?} nav
         * @return {?}
         */
        TransitionController.prototype.getRootTrnsId = function (nav) {
            var /** @type {?} */ parent = (nav.parent);
            while (parent) {
                if (util_1.isPresent(parent._trnsId)) {
                    return parent._trnsId;
                }
                parent = parent.parent;
            }
            return null;
        };
        /**
         * @return {?}
         */
        TransitionController.prototype.nextId = function () {
            return this._ids++;
        };
        /**
         * @param {?} trnsId
         * @param {?} enteringView
         * @param {?} leavingView
         * @param {?} opts
         * @return {?}
         */
        TransitionController.prototype.get = function (trnsId, enteringView, leavingView, opts) {
            var /** @type {?} */ trns = transition_registry_1.createTransition(this.plt, this._config, opts.animation, enteringView, leavingView, opts);
            trns.trnsId = trnsId;
            if (!this._trns[trnsId]) {
                // we haven't created the root transition yet
                this._trns[trnsId] = trns;
            }
            else {
                // we already have a root transition created
                // add this new transition as a child to the root
                this._trns[trnsId].add(trns);
            }
            return trns;
        };
        /**
         * @param {?} trnsId
         * @return {?}
         */
        TransitionController.prototype.destroy = function (trnsId) {
            var /** @type {?} */ trans = this._trns[trnsId];
            if (trans) {
                trans.destroy();
                delete this._trns[trnsId];
            }
        };
        TransitionController.decorators = [
            { type: core_1.Injectable },
        ];
        /** @nocollapse */
        TransitionController.ctorParameters = function () { return [
            { type: platform_1.Platform, },
            { type: config_1.Config, },
        ]; };
        return TransitionController;
    }());
    exports.TransitionController = TransitionController;
    function TransitionController_tsickle_Closure_declarations() {
        /** @type {?} */
        TransitionController.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        TransitionController.ctorParameters;
        /** @type {?} */
        TransitionController.prototype._ids;
        /** @type {?} */
        TransitionController.prototype._trns;
        /** @type {?} */
        TransitionController.prototype.plt;
        /** @type {?} */
        TransitionController.prototype._config;
    }
});
//# sourceMappingURL=transition-controller.js.map