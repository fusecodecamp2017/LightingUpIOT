(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var VirtualHeader = (function () {
        /**
         * @param {?} templateRef
         */
        function VirtualHeader(templateRef) {
            this.templateRef = templateRef;
        }
        VirtualHeader.decorators = [
            { type: core_1.Directive, args: [{ selector: '[virtualHeader]' },] },
        ];
        /** @nocollapse */
        VirtualHeader.ctorParameters = function () { return [
            { type: core_1.TemplateRef, },
        ]; };
        return VirtualHeader;
    }());
    exports.VirtualHeader = VirtualHeader;
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
    var VirtualFooter = (function () {
        /**
         * @param {?} templateRef
         */
        function VirtualFooter(templateRef) {
            this.templateRef = templateRef;
        }
        VirtualFooter.decorators = [
            { type: core_1.Directive, args: [{ selector: '[virtualFooter]' },] },
        ];
        /** @nocollapse */
        VirtualFooter.ctorParameters = function () { return [
            { type: core_1.TemplateRef, },
        ]; };
        return VirtualFooter;
    }());
    exports.VirtualFooter = VirtualFooter;
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
    var VirtualItem = (function () {
        /**
         * @param {?} templateRef
         * @param {?} viewContainer
         */
        function VirtualItem(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
        }
        VirtualItem.decorators = [
            { type: core_1.Directive, args: [{ selector: '[virtualItem]' },] },
        ];
        /** @nocollapse */
        VirtualItem.ctorParameters = function () { return [
            { type: core_1.TemplateRef, },
            { type: core_1.ViewContainerRef, },
        ]; };
        return VirtualItem;
    }());
    exports.VirtualItem = VirtualItem;
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
});
//# sourceMappingURL=virtual-item.js.map