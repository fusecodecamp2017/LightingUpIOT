import { Component, ContentChild, Input, ContentChildren, ChangeDetectionStrategy, Directive, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { Platform } from '../../platform/platform';
import { UIEventManager } from '../../gestures/ui-event-manager';
/**
 * \@name FabButton
 * \@module ionic
 *
 * \@description
 * FABs (Floating Action Buttons) are standard material design components. They are shaped as a circle that represents a promoted action. When pressed, it may contain more related actions.
 * FABs as its name suggests are floating over the content in a fixed position. This is not achieved exclusively with `<button ion-fab>Button</button>` but it has to wrapped with the `<ion-fab>` component, like this:
 *
 * ```html
 * <ion-content>
 *  <!-- Real floating action button, fixed. It will not scroll with the content -->
 *  <ion-fab>
 *    <button ion-fab>Button</button>
 *  </ion-fab>
 *
 *  <!-- Button shaped as a circle that just like a normal button scrolls with the content -->
 *  <button ion-fab>Button</button>
 * </ion-content>
 *
 * ```
 *
 * In case the button is not wrapped with `<ion-fab>`, the fab button will behave like a normal button, scrolling with the content.
 *
 * See [ion-fab] to learn more information about how to position the fab button.
 *
 * \@property [mini] - Makes a fab button with a reduced size.
 *
 * \@usage
 *
 * ```html
 *
 * <!-- Colors -->
 * <ion-fab>
 *   <button ion-fab color="primary">Button</button>
 * </ion-fab>
 *
 * <!-- Mini -->
 * <ion-fab>
 *   <button ion-fab mini>Small</button>
 * </ion-fab>
 * ```
 *
 * \@demo /docs/v2/demos/src/fab/
 * @see {\@link /docs/v2/components#fabs FAB Component Docs}
 */
export class FabButton extends Ion {
    /**
     * @param {?} config
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer, 'fab');
    }
    /**
     * \@input {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
     * @param {?} val
     * @return {?}
     */
    set color(val) {
        this._setColor(val);
    }
    /**
     * \@input {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
     * @param {?} val
     * @return {?}
     */
    set mode(val) {
        this._setMode(val);
    }
    /**
     * @param {?} closeVisible
     * @return {?}
     */
    setActiveClose(closeVisible) {
        this.setElementClass('fab-close-active', closeVisible);
    }
}
FabButton.decorators = [
    { type: Component, args: [{
                selector: '[ion-fab]',
                template: '<ion-icon name="close" class="fab-close-icon"></ion-icon>' +
                    '<span class="button-inner">' +
                    '<ng-content></ng-content>' +
                    '</span>' +
                    '<div class="button-effect"></div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
FabButton.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
FabButton.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
function FabButton_tsickle_Closure_declarations() {
    /** @type {?} */
    FabButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FabButton.ctorParameters;
    /** @type {?} */
    FabButton.propDecorators;
}
/**
 * \@name FabList
 * \@description
 * `ion-fab-list` is a container for multiple FAB buttons. They are components of `ion-fab` and allow you to specificy the buttons position, left, right, top, bottom.
 * \@usage
 *
 * ```html
 *  <ion-fab bottom right >
 *    <button ion-fab>Share</button>
 *    <ion-fab-list side="top">
 *      <button ion-fab>Facebook</button>
 *      <button ion-fab>Twitter</button>
 *      <button ion-fab>Youtube</button>
 *    </ion-fab-list>
 *    <ion-fab-list side="left">
 *      <button ion-fab>Vimeo</button>
 *    </ion-fab-list>
 *  </ion-fab>
 * ```
 * \@module ionic
 *
 * \@demo /docs/v2/demos/src/fab/
 * @see {\@link /docs/v2/components#fab Fab Component Docs}
 */
export class FabList {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} config
     * @param {?} _plt
     */
    constructor(_elementRef, _renderer, config, _plt) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._plt = _plt;
        this._visible = false;
        this._fabs = [];
        this._mode = config.get('mode');
    }
    /**
     * @param {?} query
     * @return {?}
     */
    set _setbuttons(query) {
        const /** @type {?} */ fabs = this._fabs = query.toArray();
        const /** @type {?} */ className = `fab-${this._mode}-in-list`;
        for (var fab of fabs) {
            fab.setElementClass('fab-in-list', true);
            fab.setElementClass(className, true);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setVisible(val) {
        let /** @type {?} */ visible = isTrueProperty(val);
        if (visible === this._visible) {
            return;
        }
        this._visible = visible;
        let /** @type {?} */ fabs = this._fabs;
        let /** @type {?} */ i = 1;
        if (visible) {
            fabs.forEach(fab => {
                this._plt.timeout(() => fab.setElementClass('show', true), i * 30);
                i++;
            });
        }
        else {
            fabs.forEach(fab => fab.setElementClass('show', false));
        }
        this.setElementClass('fab-list-active', visible);
    }
    /**
     * \@internal
     * @param {?} className
     * @param {?} add
     * @return {?}
     */
    setElementClass(className, add) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, add);
    }
}
FabList.decorators = [
    { type: Directive, args: [{
                selector: 'ion-fab-list',
            },] },
];
/** @nocollapse */
FabList.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: Config, },
    { type: Platform, },
];
FabList.propDecorators = {
    '_setbuttons': [{ type: ContentChildren, args: [FabButton,] },],
};
function FabList_tsickle_Closure_declarations() {
    /** @type {?} */
    FabList.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FabList.ctorParameters;
    /** @type {?} */
    FabList.propDecorators;
    /** @type {?} */
    FabList.prototype._visible;
    /** @type {?} */
    FabList.prototype._fabs;
    /** @type {?} */
    FabList.prototype._mode;
    /** @type {?} */
    FabList.prototype._elementRef;
    /** @type {?} */
    FabList.prototype._renderer;
    /** @type {?} */
    FabList.prototype._plt;
}
/**
 * \@name FabContainer
 * \@module ionic
 *
 * \@description
 * `<ion-fab>` is not a FAB button by itself but a container that assist the fab button (`<button ion-fab>`) allowing it
 * to be placed in fixed position that does not scroll with the content. It is also used to implement "material design speed dial",
 * ie. a FAB buttons displays a small lists of related actions when clicked.
 *
 * \@property [top] - Places the container on the top of the content
 * \@property [bottom] - Places the container on the bottom  of the content
 * \@property [left] - Places the container on the left
 * \@property [right] - Places the container on the right
 * \@property [middle] - Places the container on the middle vertically
 * \@property [center] - Places the container on the center horizontally
 * \@property [edge] - Used to place the container between the content and the header/footer
 *
 * \@usage
 *
 * ```html
 * <!-- this fab is placed at top right -->
 * <ion-content>
 *  <ion-fab top right>
 *    <button ion-fab>Button</button>
 *  </ion-fab>
 *
 *  <!-- this fab is placed at the center of the content viewport -->
 *  <ion-fab center middle>
 *    <button ion-fab>Button</button>
 *  </ion-fab>
 * </ion-content>
 * ```
 *
 * Ionic's FAB also supports "material design's fab speed dial". It is a normal fab button
 * that shows a list of related actions when clicked.
 *
 * The same `ion-fab` container can contain several `ion-fab-list` with different side values:
 * `top`, `bottom`, `left` and `right`. For example, if you want to have a list of button that are
 * on the top of the main button, you should use `side="top"` and so on. By default, if side is ommited, `side="bottom"`.
 *
 * ```html
 * <ion-content>
 *  <!-- this fab is placed at bottom right -->
 *  <ion-fab bottom right >
 *    <button ion-fab>Share</button>
 *    <ion-fab-list side="top">
 *      <button ion-fab>Facebook</button>
 *      <button ion-fab>Twitter</button>
 *      <button ion-fab>Youtube</button>
 *    </ion-fab-list>
 *    <ion-fab-list side="left">
 *      <button ion-fab>Vimeo</button>
 *    </ion-fab-list>
 *  </ion-fab>
 * </ion-content>
 * ```
 *
 * A FAB speed dial can also be closed programatically.
 *
 * ```html
 * <ion-content>
 *  <ion-fab bottom right #fab>
 *    <button ion-fab>Share</button>
 *    <ion-fab-list side="top">
 *      <button ion-fab (click)="share('facebook', fab)">Facebook</button>
 *      <button ion-fab (click)="share('twitter', fab)">Twitter</button>
 *    </ion-fab-list>
 *  </ion-fab>
 * </ion-content>
 * ```
 *
 * ```ts
 * share(socialNet: string, fab: FabContainer) {
 *   fab.close();
 *   console.log("Sharing in", socialNet);
 * }
 * ```
 *
 * \@demo /docs/v2/demos/src/fab/
 * @see {\@link /docs/v2/components#fabs FAB Component Docs}
 */
export class FabContainer {
    /**
     * @param {?} _elementRef
     * @param {?} plt
     */
    constructor(_elementRef, plt) {
        this._elementRef = _elementRef;
        /**
         * @private
         */
        this._listsActive = false;
        this._events = new UIEventManager(plt);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ mainButton = this._mainButton;
        if (!mainButton || !mainButton.getNativeElement()) {
            console.error('FAB container needs a main <button ion-fab>');
            return;
        }
        this._events.listen(mainButton.getNativeElement(), 'click', this.clickHandler.bind(this), { zone: true });
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    clickHandler(ev) {
        if (this.canActivateList(ev)) {
            this.toggleList();
        }
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    canActivateList(ev) {
        if (this._fabLists.length > 0 && this._mainButton && ev.target) {
            let /** @type {?} */ ele = ev.target.closest('ion-fab>[ion-fab]');
            return (ele && ele === this._mainButton.getNativeElement());
        }
        return false;
    }
    /**
     * @return {?}
     */
    toggleList() {
        this.setActiveLists(!this._listsActive);
    }
    /**
     * @param {?} isActive
     * @return {?}
     */
    setActiveLists(isActive) {
        if (isActive === this._listsActive) {
            return;
        }
        let /** @type {?} */ lists = this._fabLists.toArray();
        for (let list of lists) {
            list.setVisible(isActive);
        }
        this._mainButton.setActiveClose(isActive);
        this._listsActive = isActive;
    }
    /**
     * Close an active FAB list container
     * @return {?}
     */
    close() {
        this.setActiveLists(false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._events.destroy();
    }
}
FabContainer.decorators = [
    { type: Component, args: [{
                selector: 'ion-fab',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
FabContainer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
];
FabContainer.propDecorators = {
    '_mainButton': [{ type: ContentChild, args: [FabButton,] },],
    '_fabLists': [{ type: ContentChildren, args: [FabList,] },],
};
function FabContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    FabContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FabContainer.ctorParameters;
    /** @type {?} */
    FabContainer.propDecorators;
    /** @type {?} */
    FabContainer.prototype._events;
    /** @type {?} */
    FabContainer.prototype._listsActive;
    /** @type {?} */
    FabContainer.prototype._mainButton;
    /** @type {?} */
    FabContainer.prototype._fabLists;
    /** @type {?} */
    FabContainer.prototype._elementRef;
}
//# sourceMappingURL=fab.js.map