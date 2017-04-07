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
        define(["require", "exports", './slide-gesture', '../util/util', '../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var slide_gesture_1 = require('./slide-gesture');
    var util_1 = require('../util/util');
    var dom_1 = require('../util/dom');
    var SlideEdgeGesture = (function (_super) {
        __extends(SlideEdgeGesture, _super);
        /**
         * @param {?} plt
         * @param {?} element
         * @param {?=} opts
         */
        function SlideEdgeGesture(plt, element, opts) {
            if (opts === void 0) { opts = {}; }
            util_1.defaults(opts, {
                edge: 'left',
                maxEdgeStart: 50
            });
            _super.call(this, plt, element, opts);
            // Can check corners through use of eg 'left top'
            this.edges = opts.edge.split(' ');
            this.maxEdgeStart = opts.maxEdgeStart;
        }
        /**
         * @param {?} ev
         * @return {?}
         */
        SlideEdgeGesture.prototype.canStart = function (ev) {
            var _this = this;
            var /** @type {?} */ coord = dom_1.pointerCoord(ev);
            this._d = this.getContainerDimensions();
            return this.edges.every(function (edge) { return _this._checkEdge(edge, coord); });
        };
        /**
         * @return {?}
         */
        SlideEdgeGesture.prototype.getContainerDimensions = function () {
            return {
                left: 0,
                top: 0,
                width: this.plt.width(),
                height: this.plt.height()
            };
        };
        /**
         * @param {?} edge
         * @param {?} pos
         * @return {?}
         */
        SlideEdgeGesture.prototype._checkEdge = function (edge, pos) {
            switch (edge) {
                case 'left': return pos.x <= this._d.left + this.maxEdgeStart;
                case 'right': return pos.x >= this._d.width - this.maxEdgeStart;
                case 'top': return pos.y <= this._d.top + this.maxEdgeStart;
                case 'bottom': return pos.y >= this._d.height - this.maxEdgeStart;
            }
        };
        return SlideEdgeGesture;
    }(slide_gesture_1.SlideGesture));
    exports.SlideEdgeGesture = SlideEdgeGesture;
    function SlideEdgeGesture_tsickle_Closure_declarations() {
        /** @type {?} */
        SlideEdgeGesture.prototype.edges;
        /** @type {?} */
        SlideEdgeGesture.prototype.maxEdgeStart;
        /** @type {?} */
        SlideEdgeGesture.prototype._d;
    }
});
//# sourceMappingURL=slide-edge-gesture.js.map