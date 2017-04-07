var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { GESTURE_TOGGLE } from '../../gestures/gesture-controller';
import { PanGesture } from '../../gestures/drag-gesture';
import { pointerCoord } from '../../util/dom';
export var ToggleGesture = (function (_super) {
    __extends(ToggleGesture, _super);
    /**
     * @param {?} plt
     * @param {?} toggle
     * @param {?} gestureCtrl
     * @param {?} domCtrl
     */
    function ToggleGesture(plt, toggle, gestureCtrl, domCtrl) {
        _super.call(this, plt, toggle.getNativeElement(), {
            threshold: 0,
            zone: true,
            domController: domCtrl,
            gesture: gestureCtrl.createGesture({
                name: GESTURE_TOGGLE,
                priority: 30 /* Toggle */,
            })
        });
        this.toggle = toggle;
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    ToggleGesture.prototype.canStart = function (ev) {
        return true;
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    ToggleGesture.prototype.onDragStart = function (ev) {
        ev.preventDefault();
        this.toggle._onDragStart(pointerCoord(ev).x);
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    ToggleGesture.prototype.onDragMove = function (ev) {
        ev.preventDefault();
        this.toggle._onDragMove(pointerCoord(ev).x);
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    ToggleGesture.prototype.onDragEnd = function (ev) {
        ev.preventDefault();
        this.toggle._onDragEnd(pointerCoord(ev).x);
    };
    return ToggleGesture;
}(PanGesture));
function ToggleGesture_tsickle_Closure_declarations() {
    /** @type {?} */
    ToggleGesture.prototype.toggle;
}
//# sourceMappingURL=toggle-gesture.js.map