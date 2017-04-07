import { isArray, isPresent } from '../util/util';
import { isViewController, ViewController } from './view-controller';
/**
 * @param {?} linker
 * @param {?} nameOrPageOrView
 * @return {?}
 */
export function getComponent(linker, nameOrPageOrView) {
    if (typeof nameOrPageOrView === 'function') {
        return nameOrPageOrView;
    }
    if (typeof nameOrPageOrView === 'string') {
        return linker.getComponentFromName(nameOrPageOrView);
    }
    return null;
}
/**
 * @param {?} linker
 * @param {?} nameOrPageOrView
 * @param {?} params
 * @return {?}
 */
export function convertToView(linker, nameOrPageOrView, params) {
    if (nameOrPageOrView) {
        if (isViewController(nameOrPageOrView)) {
            // is already a ViewController
            return nameOrPageOrView;
        }
        let /** @type {?} */ component = getComponent(linker, nameOrPageOrView);
        if (component) {
            return new ViewController(component, params);
        }
    }
    console.error(`invalid page component: ${nameOrPageOrView}`);
    return null;
}
/**
 * @param {?} linker
 * @param {?} pages
 * @return {?}
 */
export function convertToViews(linker, pages) {
    const /** @type {?} */ views = [];
    if (isArray(pages)) {
        for (var /** @type {?} */ i = 0; i < pages.length; i++) {
            var /** @type {?} */ page = pages[i];
            if (page) {
                if (isViewController(page)) {
                    views.push(page);
                }
                else if (page.page) {
                    views.push(convertToView(linker, page.page, page.params));
                }
                else {
                    views.push(convertToView(linker, page, null));
                }
            }
        }
    }
    return views;
}
let /** @type {?} */ portalZindex = 9999;
/**
 * @param {?} nav
 * @param {?} enteringView
 * @param {?} leavingView
 * @param {?} direction
 * @param {?} renderer
 * @return {?}
 */
export function setZIndex(nav, enteringView, leavingView, direction, renderer) {
    if (enteringView) {
        if (nav._isPortal) {
            if (direction === DIRECTION_FORWARD) {
                enteringView._setZIndex(nav._zIndexOffset + portalZindex, renderer);
            }
            portalZindex++;
            return;
        }
        leavingView = leavingView || nav.getPrevious(enteringView);
        if (leavingView && isPresent(leavingView._zIndex)) {
            if (direction === DIRECTION_BACK) {
                enteringView._setZIndex(leavingView._zIndex - 1, renderer);
            }
            else {
                enteringView._setZIndex(leavingView._zIndex + 1, renderer);
            }
        }
        else {
            enteringView._setZIndex(INIT_ZINDEX + nav._zIndexOffset, renderer);
        }
    }
}
/**
 * @param {?} nav
 * @return {?}
 */
export function isTabs(nav) {
    // Tabs (ion-tabs)
    return !!nav && !!nav.getSelected;
}
/**
 * @param {?} nav
 * @return {?}
 */
export function isTab(nav) {
    // Tab (ion-tab)
    return !!nav && isPresent(nav._tabId);
}
/**
 * @param {?} nav
 * @return {?}
 */
export function isNav(nav) {
    // Nav (ion-nav), Tab (ion-tab), Portal (ion-portal)
    return !!nav && !!nav.push;
}
export class DeepLinkMetadata {
}
function DeepLinkMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    DeepLinkMetadata.prototype.component;
    /** @type {?} */
    DeepLinkMetadata.prototype.name;
    /** @type {?} */
    DeepLinkMetadata.prototype.segment;
    /** @type {?} */
    DeepLinkMetadata.prototype.defaultHistory;
}
/**
 * @private
 */
export var /** @type {?} */ DeepLink;
export let ViewState = {};
ViewState.NEW = 0;
ViewState.INITIALIZED = 1;
ViewState.ATTACHED = 2;
ViewState.DESTROYED = 3;
ViewState[ViewState.NEW] = "NEW";
ViewState[ViewState.INITIALIZED] = "INITIALIZED";
ViewState[ViewState.ATTACHED] = "ATTACHED";
ViewState[ViewState.DESTROYED] = "DESTROYED";
export const /** @type {?} */ INIT_ZINDEX = 100;
export const /** @type {?} */ DIRECTION_BACK = 'back';
export const /** @type {?} */ DIRECTION_FORWARD = 'forward';
export const /** @type {?} */ DIRECTION_SWITCH = 'switch';
//# sourceMappingURL=nav-util.js.map