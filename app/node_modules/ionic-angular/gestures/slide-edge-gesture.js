var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { SlideGesture } from './slide-gesture';
import { defaults } from '../util/util';
import { pointerCoord } from '../util/dom';
export var SlideEdgeGesture = (function (_super) {
    __extends(SlideEdgeGesture, _super);
    /**
     * @param {?} plt
     * @param {?} element
     * @param {?=} opts
     */
    function SlideEdgeGesture(plt, element, opts) {
        if (opts === void 0) { opts = {}; }
        defaults(opts, {
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
        var /** @type {?} */ coord = pointerCoord(ev);
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
}(SlideGesture));
function SlideEdgeGesture_tsickle_Closure_declarations() {
    /** @type {?} */
    SlideEdgeGesture.prototype.edges;
    /** @type {?} */
    SlideEdgeGesture.prototype.maxEdgeStart;
    /** @type {?} */
    SlideEdgeGesture.prototype._d;
}
//# sourceMappingURL=slide-edge-gesture.js.map