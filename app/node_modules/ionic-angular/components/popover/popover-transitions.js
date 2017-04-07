var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Animation } from '../../animations/animation';
import { PageTransition } from '../../transitions/page-transition';
/**
 * Animations for popover
 */
export var PopoverTransition = (function (_super) {
    __extends(PopoverTransition, _super);
    function PopoverTransition() {
        _super.apply(this, arguments);
    }
    /**
     * @param {?} nativeEle
     * @param {?} ev
     * @return {?}
     */
    PopoverTransition.prototype.mdPositionView = function (nativeEle, ev) {
        var /** @type {?} */ originY = 'top';
        var /** @type {?} */ originX = 'left';
        var /** @type {?} */ popoverWrapperEle = (nativeEle.querySelector('.popover-wrapper'));
        // Popover content width and height
        var /** @type {?} */ popoverEle = (nativeEle.querySelector('.popover-content'));
        var /** @type {?} */ popoverDim = popoverEle.getBoundingClientRect();
        var /** @type {?} */ popoverWidth = popoverDim.width;
        var /** @type {?} */ popoverHeight = popoverDim.height;
        // Window body width and height
        var /** @type {?} */ bodyWidth = this.plt.width();
        var /** @type {?} */ bodyHeight = this.plt.height();
        // If ev was passed, use that for target element
        var /** @type {?} */ targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        var /** @type {?} */ targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        var /** @type {?} */ targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2) - (popoverWidth / 2);
        var /** @type {?} */ targetHeight = targetDim && targetDim.height || 0;
        var /** @type {?} */ popoverCSS = {
            top: targetTop,
            left: targetLeft
        };
        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
            popoverCSS.left = POPOVER_MD_BODY_PADDING;
        }
        else if (popoverWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_MD_BODY_PADDING;
            originX = 'right';
        }
        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            popoverCSS.top = targetTop - popoverHeight;
            nativeEle.className = nativeEle.className + ' popover-bottom';
            originY = 'bottom';
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
        }
        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        ((popoverEle.style))[this.plt.Css.transformOrigin] = originY + ' ' + originX;
        // Since the transition starts before styling is done we
        // want to wait for the styles to apply before showing the wrapper
        popoverWrapperEle.style.opacity = '1';
    };
    /**
     * @param {?} nativeEle
     * @param {?} ev
     * @return {?}
     */
    PopoverTransition.prototype.iosPositionView = function (nativeEle, ev) {
        var /** @type {?} */ originY = 'top';
        var /** @type {?} */ originX = 'left';
        var /** @type {?} */ popoverWrapperEle = (nativeEle.querySelector('.popover-wrapper'));
        // Popover content width and height
        var /** @type {?} */ popoverEle = (nativeEle.querySelector('.popover-content'));
        var /** @type {?} */ popoverDim = popoverEle.getBoundingClientRect();
        var /** @type {?} */ popoverWidth = popoverDim.width;
        var /** @type {?} */ popoverHeight = popoverDim.height;
        // Window body width and height
        var /** @type {?} */ bodyWidth = this.plt.width();
        var /** @type {?} */ bodyHeight = this.plt.height();
        // If ev was passed, use that for target element
        var /** @type {?} */ targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        var /** @type {?} */ targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        var /** @type {?} */ targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2);
        var /** @type {?} */ targetWidth = targetDim && targetDim.width || 0;
        var /** @type {?} */ targetHeight = targetDim && targetDim.height || 0;
        // The arrow that shows above the popover on iOS
        var /** @type {?} */ arrowEle = (nativeEle.querySelector('.popover-arrow'));
        var /** @type {?} */ arrowDim = arrowEle.getBoundingClientRect();
        var /** @type {?} */ arrowWidth = arrowDim.width;
        var /** @type {?} */ arrowHeight = arrowDim.height;
        // If no ev was passed, hide the arrow
        if (!targetDim) {
            arrowEle.style.display = 'none';
        }
        var /** @type {?} */ arrowCSS = {
            top: targetTop + targetHeight,
            left: targetLeft + (targetWidth / 2) - (arrowWidth / 2)
        };
        var /** @type {?} */ popoverCSS = {
            top: targetTop + targetHeight + (arrowHeight - 1),
            left: targetLeft + (targetWidth / 2) - (popoverWidth / 2)
        };
        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        if (popoverCSS.left < POPOVER_IOS_BODY_PADDING) {
            popoverCSS.left = POPOVER_IOS_BODY_PADDING;
        }
        else if (popoverWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_IOS_BODY_PADDING;
            originX = 'right';
        }
        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            arrowCSS.top = targetTop - (arrowHeight + 1);
            popoverCSS.top = targetTop - popoverHeight - (arrowHeight - 1);
            nativeEle.className = nativeEle.className + ' popover-bottom';
            originY = 'bottom';
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
        }
        arrowEle.style.top = arrowCSS.top + 'px';
        arrowEle.style.left = arrowCSS.left + 'px';
        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        ((popoverEle.style))[this.plt.Css.transformOrigin] = originY + ' ' + originX;
        // Since the transition starts before styling is done we
        // want to wait for the styles to apply before showing the wrapper
        popoverWrapperEle.style.opacity = '1';
    };
    return PopoverTransition;
}(PageTransition));
export var PopoverPopIn = (function (_super) {
    __extends(PopoverPopIn, _super);
    function PopoverPopIn() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    PopoverPopIn.prototype.init = function () {
        var /** @type {?} */ ele = this.enteringView.pageRef().nativeElement;
        var /** @type {?} */ backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var /** @type {?} */ wrapper = new Animation(this.plt, ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1);
        backdrop.fromTo('opacity', 0.01, 0.08);
        this
            .easing('ease')
            .duration(100)
            .add(backdrop)
            .add(wrapper);
    };
    /**
     * @return {?}
     */
    PopoverPopIn.prototype.play = function () {
        var _this = this;
        this.plt.raf(function () {
            _this.iosPositionView(_this.enteringView.pageRef().nativeElement, _this.opts.ev);
            _super.prototype.play.call(_this);
        });
    };
    return PopoverPopIn;
}(PopoverTransition));
export var PopoverPopOut = (function (_super) {
    __extends(PopoverPopOut, _super);
    function PopoverPopOut() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    PopoverPopOut.prototype.init = function () {
        var /** @type {?} */ ele = this.leavingView.pageRef().nativeElement;
        var /** @type {?} */ backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var /** @type {?} */ wrapper = new Animation(this.plt, ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        backdrop.fromTo('opacity', 0.08, 0);
        this
            .easing('ease')
            .duration(500)
            .add(backdrop)
            .add(wrapper);
    };
    return PopoverPopOut;
}(PopoverTransition));
export var PopoverMdPopIn = (function (_super) {
    __extends(PopoverMdPopIn, _super);
    function PopoverMdPopIn() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    PopoverMdPopIn.prototype.init = function () {
        var /** @type {?} */ ele = this.enteringView.pageRef().nativeElement;
        var /** @type {?} */ content = new Animation(this.plt, ele.querySelector('.popover-content'));
        var /** @type {?} */ viewport = new Animation(this.plt, ele.querySelector('.popover-viewport'));
        content.fromTo('scale', 0.001, 1);
        viewport.fromTo('opacity', 0.01, 1);
        this
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(300)
            .add(content)
            .add(viewport);
    };
    /**
     * @return {?}
     */
    PopoverMdPopIn.prototype.play = function () {
        var _this = this;
        this.plt.raf(function () {
            _this.mdPositionView(_this.enteringView.pageRef().nativeElement, _this.opts.ev);
            _super.prototype.play.call(_this);
        });
    };
    return PopoverMdPopIn;
}(PopoverTransition));
export var PopoverMdPopOut = (function (_super) {
    __extends(PopoverMdPopOut, _super);
    function PopoverMdPopOut() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    PopoverMdPopOut.prototype.init = function () {
        var /** @type {?} */ ele = this.leavingView.pageRef().nativeElement;
        var /** @type {?} */ wrapper = new Animation(this.plt, ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        this
            .easing('ease')
            .duration(500)
            .fromTo('opacity', 0.01, 1)
            .add(wrapper);
    };
    return PopoverMdPopOut;
}(PopoverTransition));
var /** @type {?} */ POPOVER_IOS_BODY_PADDING = 2;
var /** @type {?} */ POPOVER_MD_BODY_PADDING = 12;
//# sourceMappingURL=popover-transitions.js.map