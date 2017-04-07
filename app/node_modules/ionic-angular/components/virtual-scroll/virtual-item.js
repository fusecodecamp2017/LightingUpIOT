import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
export var VirtualHeader = (function () {
    /**
     * @param {?} templateRef
     */
    function VirtualHeader(templateRef) {
        this.templateRef = templateRef;
    }
    VirtualHeader.decorators = [
        { type: Directive, args: [{ selector: '[virtualHeader]' },] },
    ];
    /** @nocollapse */
    VirtualHeader.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return VirtualHeader;
}());
function VirtualHeader_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualHeader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    VirtualHeader.ctorParameters;
    /** @type {?} */
    VirtualHeader.prototype.templateRef;
}
export var VirtualFooter = (function () {
    /**
     * @param {?} templateRef
     */
    function VirtualFooter(templateRef) {
        this.templateRef = templateRef;
    }
    VirtualFooter.decorators = [
        { type: Directive, args: [{ selector: '[virtualFooter]' },] },
    ];
    /** @nocollapse */
    VirtualFooter.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return VirtualFooter;
}());
function VirtualFooter_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualFooter.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    VirtualFooter.ctorParameters;
    /** @type {?} */
    VirtualFooter.prototype.templateRef;
}
export var VirtualItem = (function () {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    function VirtualItem(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    VirtualItem.decorators = [
        { type: Directive, args: [{ selector: '[virtualItem]' },] },
    ];
    /** @nocollapse */
    VirtualItem.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    return VirtualItem;
}());
function VirtualItem_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    VirtualItem.ctorParameters;
    /** @type {?} */
    VirtualItem.prototype.templateRef;
    /** @type {?} */
    VirtualItem.prototype.viewContainer;
}
//# sourceMappingURL=virtual-item.js.map