import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
export class VirtualHeader {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
VirtualHeader.decorators = [
    { type: Directive, args: [{ selector: '[virtualHeader]' },] },
];
/** @nocollapse */
VirtualHeader.ctorParameters = () => [
    { type: TemplateRef, },
];
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
export class VirtualFooter {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
VirtualFooter.decorators = [
    { type: Directive, args: [{ selector: '[virtualFooter]' },] },
];
/** @nocollapse */
VirtualFooter.ctorParameters = () => [
    { type: TemplateRef, },
];
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
export class VirtualItem {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
}
VirtualItem.decorators = [
    { type: Directive, args: [{ selector: '[virtualItem]' },] },
];
/** @nocollapse */
VirtualItem.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
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