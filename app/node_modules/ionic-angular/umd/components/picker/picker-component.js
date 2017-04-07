(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../util/util', '../../config/config', '../../platform/dom-controller', '../../gestures/gesture-controller', '../../tap-click/haptic', '../../platform/key', '../../navigation/nav-params', '../../platform/platform', '../../util/dom', '../../gestures/ui-event-manager', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var util_1 = require('../../util/util');
    var config_1 = require('../../config/config');
    var dom_controller_1 = require('../../platform/dom-controller');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var haptic_1 = require('../../tap-click/haptic');
    var key_1 = require('../../platform/key');
    var nav_params_1 = require('../../navigation/nav-params');
    var platform_1 = require('../../platform/platform');
    var dom_1 = require('../../util/dom');
    var ui_event_manager_1 = require('../../gestures/ui-event-manager');
    var view_controller_1 = require('../../navigation/view-controller');
    var PickerColumnCmp = (function () {
        /**
         * @param {?} config
         * @param {?} _plt
         * @param {?} elementRef
         * @param {?} _zone
         * @param {?} _haptic
         * @param {?} plt
         * @param {?} domCtrl
         */
        function PickerColumnCmp(config, _plt, elementRef, _zone, _haptic, plt, domCtrl) {
            this._plt = _plt;
            this.elementRef = elementRef;
            this._zone = _zone;
            this._haptic = _haptic;
            this.y = 0;
            this.pos = [];
            this.startY = null;
            this.ionChange = new core_1.EventEmitter();
            this.events = new ui_event_manager_1.UIEventManager(plt);
            this.rotateFactor = config.getNumber('pickerRotateFactor', 0);
            this.scaleFactor = config.getNumber('pickerScaleFactor', 1);
            this.decelerateFunc = this.decelerate.bind(this);
            this.debouncer = domCtrl.debouncer();
        }
        /**
         * @return {?}
         */
        PickerColumnCmp.prototype.ngAfterViewInit = function () {
            // get the scrollable element within the column
            var /** @type {?} */ colEle = this.colEle.nativeElement;
            this.colHeight = colEle.clientHeight;
            // get the height of one option
            this.optHeight = (colEle.firstElementChild ? colEle.firstElementChild.clientHeight : 0);
            // set the scroll position for the selected option
            this.setSelected(this.col.selectedIndex, 0);
            // Listening for pointer events
            this.events.pointerEvents({
                element: this.elementRef.nativeElement,
                pointerDown: this.pointerStart.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerEnd.bind(this),
                capture: true,
                zone: false
            });
        };
        /**
         * @return {?}
         */
        PickerColumnCmp.prototype.ngOnDestroy = function () {
            this._plt.cancelRaf(this.rafId);
            this.events.destroy();
        };
        /**
         * @param {?} ev
         * @return {?}
         */
        PickerColumnCmp.prototype.pointerStart = function (ev) {
            (void 0) /* console.debug */;
            this._haptic.gestureSelectionStart();
            // We have to prevent default in order to block scrolling under the picker
            // but we DO NOT have to stop propagation, since we still want
            // some "click" events to capture
            ev.preventDefault();
            // cancel any previous raf's that haven't fired yet
            this._plt.cancelRaf(this.rafId);
            // remember where the pointer started from`
            this.startY = dom_1.pointerCoord(ev).y;
            // reset everything
            this.velocity = 0;
            this.pos.length = 0;
            this.pos.push(this.startY, Date.now());
            var /** @type {?} */ options = this.col.options;
            var /** @type {?} */ minY = (options.length - 1);
            var /** @type {?} */ maxY = 0;
            for (var /** @type {?} */ i = 0; i < options.length; i++) {
                if (!options[i].disabled) {
                    minY = Math.min(minY, i);
                    maxY = Math.max(maxY, i);
                }
            }
            this.minY = (minY * this.optHeight * -1);
            this.maxY = (maxY * this.optHeight * -1);
            return true;
        };
        /**
         * @param {?} ev
         * @return {?}
         */
        PickerColumnCmp.prototype.pointerMove = function (ev) {
            var _this = this;
            ev.preventDefault();
            ev.stopPropagation();
            var /** @type {?} */ currentY = dom_1.pointerCoord(ev).y;
            this.pos.push(currentY, Date.now());
            this.debouncer.write(function () {
                if (_this.startY === null) {
                    return;
                }
                // update the scroll position relative to pointer start position
                var /** @type {?} */ y = _this.y + (currentY - _this.startY);
                if (y > _this.minY) {
                    // scrolling up higher than scroll area
                    y = Math.pow(y, 0.8);
                    _this.bounceFrom = y;
                }
                else if (y < _this.maxY) {
                    // scrolling down below scroll area
                    y += Math.pow(_this.maxY - y, 0.9);
                    _this.bounceFrom = y;
                }
                else {
                    _this.bounceFrom = 0;
                }
                _this.update(y, 0, false, false);
                var /** @type {?} */ currentIndex = Math.max(Math.abs(Math.round(y / _this.optHeight)), 0);
                if (currentIndex !== _this.lastTempIndex) {
                    // Trigger a haptic event for physical feedback that the index has changed
                    _this._haptic.gestureSelectionChanged();
                    _this.lastTempIndex = currentIndex;
                }
            });
        };
        /**
         * @param {?} ev
         * @return {?}
         */
        PickerColumnCmp.prototype.pointerEnd = function (ev) {
            ev.preventDefault();
            this.debouncer.cancel();
            if (this.startY === null) {
                return;
            }
            (void 0) /* console.debug */;
            this.velocity = 0;
            if (this.bounceFrom > 0) {
                // bounce back up
                this.update(this.minY, 100, true, true);
                return;
            }
            else if (this.bounceFrom < 0) {
                // bounce back down
                this.update(this.maxY, 100, true, true);
                return;
            }
            var /** @type {?} */ endY = dom_1.pointerCoord(ev).y;
            this.pos.push(endY, Date.now());
            var /** @type {?} */ endPos = (this.pos.length - 1);
            var /** @type {?} */ startPos = endPos;
            var /** @type {?} */ timeRange = (Date.now() - 100);
            // move pointer to position measured 100ms ago
            for (var /** @type {?} */ i = endPos; i > 0 && this.pos[i] > timeRange; i -= 2) {
                startPos = i;
            }
            if (startPos !== endPos) {
                // compute relative movement between these two points
                var /** @type {?} */ timeOffset = (this.pos[endPos] - this.pos[startPos]);
                var /** @type {?} */ movedTop = (this.pos[startPos - 1] - this.pos[endPos - 1]);
                // based on XXms compute the movement to apply for each render step
                var /** @type {?} */ velocity = ((movedTop / timeOffset) * FRAME_MS);
                this.velocity = util_1.clamp(-MAX_PICKER_SPEED, velocity, MAX_PICKER_SPEED);
            }
            if (Math.abs(endY - this.startY) > 3) {
                var /** @type {?} */ y = this.y + (endY - this.startY);
                this.update(y, 0, true, true);
            }
            this.startY = null;
            this.decelerate();
        };
        /**
         * @return {?}
         */
        PickerColumnCmp.prototype.decelerate = function () {
            var /** @type {?} */ y = 0;
            if (isNaN(this.y) || !this.optHeight) {
                // fallback in case numbers get outta wack
                this.update(y, 0, true, true);
                this._haptic.gestureSelectionEnd();
            }
            else if (Math.abs(this.velocity) > 0) {
                // still decelerating
                this.velocity *= DECELERATION_FRICTION;
                // do not let it go slower than a velocity of 1
                this.velocity = (this.velocity > 0)
                    ? Math.max(this.velocity, 1)
                    : Math.min(this.velocity, -1);
                y = Math.round(this.y - this.velocity);
                if (y > this.minY) {
                    // whoops, it's trying to scroll up farther than the options we have!
                    y = this.minY;
                    this.velocity = 0;
                }
                else if (y < this.maxY) {
                    // gahh, it's trying to scroll down farther than we can!
                    y = this.maxY;
                    this.velocity = 0;
                }
                var /** @type {?} */ notLockedIn = (y % this.optHeight !== 0 || Math.abs(this.velocity) > 1);
                this.update(y, 0, true, !notLockedIn);
                if (notLockedIn) {
                    // isn't locked in yet, keep decelerating until it is
                    this.rafId = this._plt.raf(this.decelerateFunc);
                }
            }
            else if (this.y % this.optHeight !== 0) {
                // needs to still get locked into a position so options line up
                var /** @type {?} */ currentPos = Math.abs(this.y % this.optHeight);
                // create a velocity in the direction it needs to scroll
                this.velocity = (currentPos > (this.optHeight / 2) ? 1 : -1);
                this._haptic.gestureSelectionEnd();
                this.decelerate();
            }
            var /** @type {?} */ currentIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
            if (currentIndex !== this.lastTempIndex) {
                // Trigger a haptic event for physical feedback that the index has changed
                this._haptic.gestureSelectionChanged();
            }
            this.lastTempIndex = currentIndex;
        };
        /**
         * @param {?} ev
         * @param {?} index
         * @return {?}
         */
        PickerColumnCmp.prototype.optClick = function (ev, index) {
            if (!this.velocity) {
                ev.preventDefault();
                ev.stopPropagation();
                this.setSelected(index, 150);
            }
        };
        /**
         * @param {?} selectedIndex
         * @param {?} duration
         * @return {?}
         */
        PickerColumnCmp.prototype.setSelected = function (selectedIndex, duration) {
            // if there is a selected index, then figure out it's y position
            // if there isn't a selected index, then just use the top y position
            var /** @type {?} */ y = (selectedIndex > -1) ? ((selectedIndex * this.optHeight) * -1) : 0;
            this._plt.cancelRaf(this.rafId);
            this.velocity = 0;
            // so what y position we're at
            this.update(y, duration, true, true);
        };
        /**
         * @param {?} y
         * @param {?} duration
         * @param {?} saveY
         * @param {?} emitChange
         * @return {?}
         */
        PickerColumnCmp.prototype.update = function (y, duration, saveY, emitChange) {
            // ensure we've got a good round number :)
            y = Math.round(y);
            var /** @type {?} */ i;
            var /** @type {?} */ button;
            var /** @type {?} */ opt;
            var /** @type {?} */ optOffset;
            var /** @type {?} */ visible;
            var /** @type {?} */ translateX;
            var /** @type {?} */ translateY;
            var /** @type {?} */ translateZ;
            var /** @type {?} */ rotateX;
            var /** @type {?} */ transform;
            var /** @type {?} */ selected;
            var /** @type {?} */ parent = this.colEle.nativeElement;
            var /** @type {?} */ children = parent.children;
            var /** @type {?} */ length = children.length;
            var /** @type {?} */ selectedIndex = this.col.selectedIndex = Math.min(Math.max(Math.round(-y / this.optHeight), 0), length - 1);
            var /** @type {?} */ durationStr = (duration === 0) ? null : duration + 'ms';
            var /** @type {?} */ scaleStr = "scale(" + this.scaleFactor + ")";
            for (i = 0; i < length; i++) {
                button = children[i];
                opt = (this.col.options[i]);
                optOffset = (i * this.optHeight) + y;
                visible = true;
                transform = '';
                if (this.rotateFactor !== 0) {
                    rotateX = optOffset * this.rotateFactor;
                    if (Math.abs(rotateX) > 90) {
                        visible = false;
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                        translateZ = 90;
                        transform = "rotateX(" + rotateX + "deg) ";
                    }
                }
                else {
                    translateX = 0;
                    translateZ = 0;
                    translateY = optOffset;
                    if (Math.abs(translateY) > 170) {
                        visible = false;
                    }
                }
                selected = selectedIndex === i;
                if (visible) {
                    transform += "translate3d(0px," + translateY + "px," + translateZ + "px) ";
                    if (this.scaleFactor !== 1 && !selected) {
                        transform += scaleStr;
                    }
                }
                else {
                    transform = 'translate3d(-9999px,0px,0px)';
                }
                // Update transition duration
                if (duration !== opt._dur) {
                    opt._dur = duration;
                    button.style[this._plt.Css.transitionDuration] = durationStr;
                }
                // Update transform
                if (transform !== opt._trans) {
                    opt._trans = transform;
                    button.style[this._plt.Css.transform] = transform;
                }
                // Update selected item
                if (selected !== opt._selected) {
                    opt._selected = selected;
                    if (selected) {
                        button.classList.add(PICKER_OPT_SELECTED);
                    }
                    else {
                        button.classList.remove(PICKER_OPT_SELECTED);
                    }
                }
            }
            if (saveY) {
                this.y = y;
            }
            if (emitChange) {
                if (this.lastIndex === undefined) {
                    // have not set a last index yet
                    this.lastIndex = this.col.selectedIndex;
                }
                else if (this.lastIndex !== this.col.selectedIndex) {
                    // new selected index has changed from the last index
                    // update the lastIndex and emit that it has changed
                    this.lastIndex = this.col.selectedIndex;
                    var /** @type {?} */ ionChange = this.ionChange;
                    if (ionChange.observers.length > 0) {
                        this._zone.run(ionChange.emit.bind(ionChange, this.col.options[this.col.selectedIndex]));
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        PickerColumnCmp.prototype.refresh = function () {
            var /** @type {?} */ min = this.col.options.length - 1;
            var /** @type {?} */ max = 0;
            for (var /** @type {?} */ i = 0; i < this.col.options.length; i++) {
                if (!this.col.options[i].disabled) {
                    min = Math.min(min, i);
                    max = Math.max(max, i);
                }
            }
            var /** @type {?} */ selectedIndex = util_1.clamp(min, this.col.selectedIndex, max);
            if (selectedIndex !== this.col.selectedIndex) {
                var /** @type {?} */ y = (selectedIndex * this.optHeight) * -1;
                this.update(y, 150, true, true);
            }
        };
        PickerColumnCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: '.picker-col',
                        template: '<div *ngIf="col.prefix" class="picker-prefix" [style.width]="col.prefixWidth">{{col.prefix}}</div>' +
                            '<div class="picker-opts" #colEle [style.max-width]="col.optionsWidth">' +
                            '<button *ngFor="let o of col.options; let i=index"' +
                            '[class.picker-opt-disabled]="o.disabled" ' +
                            'class="picker-opt" disable-activated (click)="optClick($event, i)">' +
                            '{{o.text}}' +
                            '</button>' +
                            '</div>' +
                            '<div *ngIf="col.suffix" class="picker-suffix" [style.width]="col.suffixWidth">{{col.suffix}}</div>',
                        host: {
                            '[style.max-width]': 'col.columnWidth',
                            '[class.picker-opts-left]': 'col.align=="left"',
                            '[class.picker-opts-right]': 'col.align=="right"',
                        }
                    },] },
        ];
        /** @nocollapse */
        PickerColumnCmp.ctorParameters = function () { return [
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: core_1.ElementRef, },
            { type: core_1.NgZone, },
            { type: haptic_1.Haptic, },
            { type: platform_1.Platform, },
            { type: dom_controller_1.DomController, },
        ]; };
        PickerColumnCmp.propDecorators = {
            'colEle': [{ type: core_1.ViewChild, args: ['colEle',] },],
            'col': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
        };
        return PickerColumnCmp;
    }());
    exports.PickerColumnCmp = PickerColumnCmp;
    function PickerColumnCmp_tsickle_Closure_declarations() {
        /** @type {?} */
        PickerColumnCmp.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        PickerColumnCmp.ctorParameters;
        /** @type {?} */
        PickerColumnCmp.propDecorators;
        /** @type {?} */
        PickerColumnCmp.prototype.colEle;
        /** @type {?} */
        PickerColumnCmp.prototype.col;
        /** @type {?} */
        PickerColumnCmp.prototype.y;
        /** @type {?} */
        PickerColumnCmp.prototype.colHeight;
        /** @type {?} */
        PickerColumnCmp.prototype.optHeight;
        /** @type {?} */
        PickerColumnCmp.prototype.velocity;
        /** @type {?} */
        PickerColumnCmp.prototype.pos;
        /** @type {?} */
        PickerColumnCmp.prototype.startY;
        /** @type {?} */
        PickerColumnCmp.prototype.rafId;
        /** @type {?} */
        PickerColumnCmp.prototype.bounceFrom;
        /** @type {?} */
        PickerColumnCmp.prototype.minY;
        /** @type {?} */
        PickerColumnCmp.prototype.maxY;
        /** @type {?} */
        PickerColumnCmp.prototype.rotateFactor;
        /** @type {?} */
        PickerColumnCmp.prototype.scaleFactor;
        /** @type {?} */
        PickerColumnCmp.prototype.lastIndex;
        /** @type {?} */
        PickerColumnCmp.prototype.lastTempIndex;
        /** @type {?} */
        PickerColumnCmp.prototype.decelerateFunc;
        /** @type {?} */
        PickerColumnCmp.prototype.debouncer;
        /** @type {?} */
        PickerColumnCmp.prototype.events;
        /** @type {?} */
        PickerColumnCmp.prototype.ionChange;
        /** @type {?} */
        PickerColumnCmp.prototype._plt;
        /** @type {?} */
        PickerColumnCmp.prototype.elementRef;
        /** @type {?} */
        PickerColumnCmp.prototype._zone;
        /** @type {?} */
        PickerColumnCmp.prototype._haptic;
    }
    var PickerCmp = (function () {
        /**
         * @param {?} _viewCtrl
         * @param {?} _elementRef
         * @param {?} config
         * @param {?} _plt
         * @param {?} gestureCtrl
         * @param {?} params
         * @param {?} renderer
         */
        function PickerCmp(_viewCtrl, _elementRef, config, _plt, gestureCtrl, params, renderer) {
            this._viewCtrl = _viewCtrl;
            this._elementRef = _elementRef;
            this._plt = _plt;
            this._gestureBlocker = gestureCtrl.createBlocker(gesture_controller_1.BLOCK_ALL);
            this.d = params.data;
            this.mode = config.get('mode');
            renderer.setElementClass(_elementRef.nativeElement, "picker-" + this.mode, true);
            if (this.d.cssClass) {
                this.d.cssClass.split(' ').forEach(function (cssClass) {
                    renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
                });
            }
            this.id = (++pickerIds);
            this.lastClick = 0;
        }
        /**
         * @return {?}
         */
        PickerCmp.prototype.ionViewWillLoad = function () {
            // normalize the data
            var /** @type {?} */ data = this.d;
            data.buttons = data.buttons.map(function (button) {
                if (util_1.isString(button)) {
                    return { text: button };
                }
                if (button.role) {
                    button.cssRole = "picker-toolbar-" + button.role;
                }
                return button;
            });
            // clean up dat data
            data.columns = data.columns.map(function (column) {
                if (!util_1.isPresent(column.options)) {
                    column.options = [];
                }
                column.selectedIndex = column.selectedIndex || 0;
                column.options = column.options.map(function (inputOpt) {
                    var /** @type {?} */ opt = {
                        text: '',
                        value: '',
                        disabled: inputOpt.disabled,
                    };
                    if (util_1.isPresent(inputOpt)) {
                        if (util_1.isString(inputOpt) || util_1.isNumber(inputOpt)) {
                            opt.text = inputOpt.toString();
                            opt.value = inputOpt;
                        }
                        else {
                            opt.text = util_1.isPresent(inputOpt.text) ? inputOpt.text : inputOpt.value;
                            opt.value = util_1.isPresent(inputOpt.value) ? inputOpt.value : inputOpt.text;
                        }
                    }
                    return opt;
                });
                return column;
            });
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.ionViewWillEnter = function () {
            this._gestureBlocker.block();
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.ionViewDidLeave = function () {
            this._gestureBlocker.unblock();
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.refresh = function () {
            this._cols.forEach(function (column) {
                column.refresh();
            });
        };
        /**
         * @param {?} selectedOption
         * @return {?}
         */
        PickerCmp.prototype._colChange = function (selectedOption) {
            // one of the columns has changed its selected index
            var /** @type {?} */ picker = (this._viewCtrl);
            picker.ionChange.emit(this.getSelected());
        };
        /**
         * @param {?} ev
         * @return {?}
         */
        PickerCmp.prototype._keyUp = function (ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === key_1.Key.ENTER) {
                    if (this.lastClick + 1000 < Date.now()) {
                        // do not fire this click if there recently was already a click
                        // this can happen when the button has focus and used the enter
                        // key to click the button. However, both the click handler and
                        // this keyup event will fire, so only allow one of them to go.
                        (void 0) /* console.debug */;
                        var /** @type {?} */ button = this.d.buttons[this.d.buttons.length - 1];
                        this.btnClick(button);
                    }
                }
                else if (ev.keyCode === key_1.Key.ESCAPE) {
                    (void 0) /* console.debug */;
                    this.bdClick();
                }
            }
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.ionViewDidEnter = function () {
            this._plt.focusOutActiveElement();
            var /** @type {?} */ focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        };
        /**
         * @param {?} button
         * @return {?}
         */
        PickerCmp.prototype.btnClick = function (button) {
            if (!this.enabled) {
                return;
            }
            // keep the time of the most recent button click
            this.lastClick = Date.now();
            var /** @type {?} */ shouldDismiss = true;
            if (button.handler) {
                // a handler has been provided, execute it
                // pass the handler the values from the inputs
                if (button.handler(this.getSelected()) === false) {
                    // if the return value of the handler is false then do not dismiss
                    shouldDismiss = false;
                }
            }
            if (shouldDismiss) {
                this.dismiss(button.role);
            }
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.bdClick = function () {
            if (this.enabled && this.d.enableBackdropDismiss) {
                this.dismiss('backdrop');
            }
        };
        /**
         * @param {?} role
         * @return {?}
         */
        PickerCmp.prototype.dismiss = function (role) {
            return this._viewCtrl.dismiss(this.getSelected(), role);
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.getSelected = function () {
            var /** @type {?} */ selected = {};
            this.d.columns.forEach(function (col, index) {
                var /** @type {?} */ selectedColumn = col.options[col.selectedIndex];
                selected[col.name] = {
                    text: selectedColumn ? selectedColumn.text : null,
                    value: selectedColumn ? selectedColumn.value : null,
                    columnIndex: index,
                };
            });
            return selected;
        };
        /**
         * @return {?}
         */
        PickerCmp.prototype.ngOnDestroy = function () {
            (void 0) /* assert */;
            this._gestureBlocker.destroy();
        };
        PickerCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-picker-cmp',
                        template: "\n    <ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n    <div class=\"picker-wrapper\">\n      <div class=\"picker-toolbar\">\n        <div *ngFor=\"let b of d.buttons\" class=\"picker-toolbar-button\" [ngClass]=\"b.cssRole\">\n          <button ion-button (click)=\"btnClick(b)\" [ngClass]=\"b.cssClass\" class=\"picker-button\" clear>\n            {{b.text}}\n          </button>\n        </div>\n      </div>\n      <div class=\"picker-columns\">\n        <div class=\"picker-above-highlight\"></div>\n        <div *ngFor=\"let c of d.columns\" [col]=\"c\" class=\"picker-col\" (ionChange)=\"_colChange($event)\"></div>\n        <div class=\"picker-below-highlight\"></div>\n      </div>\n    </div>\n  ",
                        host: {
                            'role': 'dialog'
                        },
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        PickerCmp.ctorParameters = function () { return [
            { type: view_controller_1.ViewController, },
            { type: core_1.ElementRef, },
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: gesture_controller_1.GestureController, },
            { type: nav_params_1.NavParams, },
            { type: core_1.Renderer, },
        ]; };
        PickerCmp.propDecorators = {
            '_cols': [{ type: core_1.ViewChildren, args: [PickerColumnCmp,] },],
            '_keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return PickerCmp;
    }());
    exports.PickerCmp = PickerCmp;
    function PickerCmp_tsickle_Closure_declarations() {
        /** @type {?} */
        PickerCmp.decorators;
        /**
         * @nocollapse
         * @type {?}
         */
        PickerCmp.ctorParameters;
        /** @type {?} */
        PickerCmp.propDecorators;
        /** @type {?} */
        PickerCmp.prototype._cols;
        /** @type {?} */
        PickerCmp.prototype.d;
        /** @type {?} */
        PickerCmp.prototype.enabled;
        /** @type {?} */
        PickerCmp.prototype.lastClick;
        /** @type {?} */
        PickerCmp.prototype.id;
        /** @type {?} */
        PickerCmp.prototype.mode;
        /** @type {?} */
        PickerCmp.prototype._gestureBlocker;
        /** @type {?} */
        PickerCmp.prototype._viewCtrl;
        /** @type {?} */
        PickerCmp.prototype._elementRef;
        /** @type {?} */
        PickerCmp.prototype._plt;
    }
    var /** @type {?} */ pickerIds = -1;
    var /** @type {?} */ PICKER_OPT_SELECTED = 'picker-opt-selected';
    var /** @type {?} */ DECELERATION_FRICTION = 0.97;
    var /** @type {?} */ FRAME_MS = (1000 / 60);
    var /** @type {?} */ MAX_PICKER_SPEED = 60;
});
//# sourceMappingURL=picker-component.js.map