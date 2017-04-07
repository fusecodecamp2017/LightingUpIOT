var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { enableKeyboardControl } from './swiper/swiper-keyboard';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { initEvents } from './swiper/swiper-events';
import { initZoom } from './swiper/swiper-zoom';
import { Platform } from '../../platform/platform';
import { slideTo, slideNext, slidePrev, update, initSwiper, destroySwiper, startAutoplay, stopAutoplay } from './swiper/swiper';
import { SWIPER_EFFECTS } from './swiper/swiper-effects';
import { ViewController } from '../../navigation/view-controller';
/**
 * \@name Slides
 * \@description
 * The Slides component is a multi-section container. Each section can be swiped
 * or dragged between. It contains any number of [Slide](../Slide) components.
 *
 *
 * ### Creating
 * You should use a template to create slides and listen to slide events. The template
 * should contain the slide container, an `<ion-slides>` element, and any number of
 * [Slide](../Slide) components, written as `<ion-slide>`. Basic configuration
 * values can be set as input properties, which are listed below. Slides events
 * can also be listened to such as the slide changing by placing the event on the
 * `<ion-slides>` element. See [Usage](#usage) below for more information.
 *
 *
 * ### Navigating
 * After creating and configuring the slides, you can navigate between them
 * by swiping or calling methods on the `Slides` instance. You can call `slideTo()` to
 * navigate to a specific slide, or `slideNext()` to change to the slide that follows
 * the active slide. All of the [methods](#instance-members) provided by the `Slides`
 * instance are listed below. See [Usage](#usage) below for more information on
 * navigating between slides.
 *
 *
 * \@usage
 *
 * You can add slides to a `\@Component` using the following template:
 *
 * ```html
 * <ion-slides>
 *   <ion-slide>
 *     <h1>Slide 1</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 2</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 3</h1>
 *   </ion-slide>
 * </ion-slides>
 * ```
 *
 * Next, we can use `ViewChild` to assign the Slides instance to
 * your `slides` property. Now we can call any of the `Slides`
 * [methods](#instance-members), for example we can use the Slide's
 * `slideTo()` method in order to navigate to a specific slide on
 * a button click. Below we call the `goToSlide()` method and it
 * navigates to the 3rd slide:
 *
 * ```ts
 * import { ViewChild } from '\@angular/core';
 * import { Slides } from 'ionic-angular';
 *
 * class MyPage {
 *   \@ViewChild(Slides) slides: Slides;
 *
 *   goToSlide() {
 *     this.slides.slideTo(2, 500);
 *   }
 * }
 * ```
 *
 * We can also add events to listen to on the `<ion-slides>` element.
 * Let's add the `ionSlideDidChange` event and call a method when the slide changes:
 *
 * ```html
 * <ion-slides (ionSlideDidChange)="slideChanged()">
 * ```
 *
 * In our class, we add the `slideChanged()` method which gets the active
 * index and prints it:
 *
 * ```ts
 * class MyPage {
 *   ...
 *
 *   slideChanged() {
 *     let currentIndex = this.slides.getActiveIndex();
 *     console.log("Current index is", currentIndex);
 *   }
 * }
 * ```
 *
 * \@advanced
 *
 * There are several options available to create customized slides. Ionic exposes
 * the most commonly used options as [inputs](http://learnangular2.com/inputs/).
 * In order to use an option that isn't exposed as an input the following code
 * should be used, where `freeMode` is the option to change:
 *
 * ```ts
 * import { ViewChild } from '\@angular/core';
 * import { Slides } from 'ionic-angular';
 * class MyPage {
 *   \@ViewChild(Slides) slides: Slides;
 *
 *   ngAfterViewInit() {
 *     this.slides.freeMode = true;
 *   }
 * }
 *
 * ```
 *
 * To see all of the available options, take a look at the
 * [source for slides](https://github.com/driftyco/ionic/blob/master/src/components/slides/slides.ts).
 *
 * \@demo /docs/v2/demos/src/slides/
 * @see {\@link /docs/v2/components#slides Slides Component Docs}
 *
 * Adopted from Swiper.js:
 * The most modern mobile touch slider and framework with
 * hardware accelerated transitions.
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 */
export var Slides = (function (_super) {
    __extends(Slides, _super);
    /**
     * @param {?} config
     * @param {?} _plt
     * @param {?} zone
     * @param {?} viewCtrl
     * @param {?} elementRef
     * @param {?} renderer
     */
    function Slides(config, _plt, zone, viewCtrl, elementRef, renderer) {
        var _this = this;
        _super.call(this, config, elementRef, renderer, 'slides');
        this._plt = _plt;
        this._control = null;
        this._effectName = 'slide';
        this._direction = 'horizontal';
        this._initialSlide = 0;
        this._isLoop = false;
        this._pager = false;
        this._paginationType = 'bullets';
        /** @private */
        this.paginationBulletRender = null;
        this._isParallax = false;
        this._speedMs = 300;
        this._isZoom = false;
        /**
         * @private
         * Enabled this option and swiper will be operated as usual except it will
         * not move, real translate values on wrapper will not be set. Useful when
         * you may need to create custom slide transition.
         */
        this.virtualTranslate = false;
        /**
         * @private
         * Set to true to round values of slides width and height to prevent blurry
         * texts on usual resolution screens (if you have such)
         */
        this.roundLengths = false;
        this._spaceBetween = 0;
        this._slidesPerView = 1;
        /**
         * @private
         */
        this.slidesPerColumn = 1;
        /**
         * @private
         */
        this.slidesPerColumnFill = 'column';
        /**
         * @private
         */
        this.slidesPerGroup = 1;
        /**
         * @private
         */
        this.centeredSlides = false;
        /**
         * @private
         */
        this.slidesOffsetBefore = 0;
        /**
         * @private
         */
        this.slidesOffsetAfter = 0;
        // autoplay
        /**
         * @private
         */
        this.autoplayDisableOnInteraction = true;
        /**
         * @private
         */
        this.autoplayStopOnLast = false;
        // Free mode
        /**
         * @private
         */
        this.freeMode = false;
        /**
         * @private
         */
        this.freeModeMomentum = true;
        /**
         * @private
         */
        this.freeModeMomentumRatio = 1;
        /**
         * @private
         */
        this.freeModeMomentumBounce = true;
        /**
         * @private
         */
        this.freeModeMomentumBounceRatio = 1;
        /**
         * @private
         */
        this.freeModeMomentumVelocityRatio = 1;
        /**
         * @private
         */
        this.freeModeSticky = false;
        /**
         * @private
         */
        this.freeModeMinimumVelocity = 0.02;
        // Autoheight
        /**
         * @private
         */
        this.autoHeight = false;
        // Set wrapper width
        /**
         * @private
         */
        this.setWrapperSize = false;
        // Zoom
        /**
         * @private
         */
        this.zoomMax = 3;
        /**
         * @private
         */
        this.zoomMin = 1;
        /**
         * @private
         */
        this.zoomToggle = true;
        // Touches
        /**
         * @private
         */
        this.touchRatio = 1;
        /**
         * @private
         */
        this.touchAngle = 45;
        /**
         * @private
         */
        this.simulateTouch = true;
        /**
         * @private
         */
        this.shortSwipes = true;
        /**
         * @private
         */
        this.longSwipes = true;
        /**
         * @private
         */
        this.longSwipesRatio = 0.5;
        /**
         * @private
         */
        this.longSwipesMs = 300;
        /**
         * @private
         */
        this.followFinger = true;
        /**
         * @private
         */
        this.onlyExternal = false;
        /**
         * @private
         */
        this.threshold = 0;
        /**
         * @private
         */
        this.touchMoveStopPropagation = true;
        /**
         * @private
         */
        this.touchReleaseOnEdges = false;
        // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
        /**
         * @private
         */
        this.iOSEdgeSwipeDetection = false;
        /**
         * @private
         */
        this.iOSEdgeSwipeThreshold = 20;
        // Pagination
        /**
         * @private
         */
        this.paginationClickable = false;
        /**
         * @private
         */
        this.paginationHide = false;
        // Resistance
        /** @private */
        this.resistance = true;
        /** @private */
        this.resistanceRatio = 0.85;
        // Progress
        /** @private */
        this.watchSlidesProgress = false;
        /** @private */
        this.watchSlidesVisibility = false;
        // Clicks
        /**
         * @private
         */
        this.preventClicks = true;
        /**
         * @private
         */
        this.preventClicksPropagation = true;
        /**
         * @private
         */
        this.slideToClickedSlide = false;
        // loop
        /**
         * @private
         */
        this.loopAdditionalSlides = 0;
        /**
         * @private
         */
        this.loopedSlides = null;
        // Swiping/no swiping
        /**
         * @private
         */
        this.swipeHandler = null;
        /**
         * @private
         */
        this.noSwiping = true;
        // Callbacks
        /** @private */
        this.runCallbacksOnInit = true;
        // Controller
        this.controlBy = 'slide';
        this.controlInverse = false;
        // Keyboard
        /**
         * @private
         */
        this.keyboardControl = true;
        // Effects
        /**
         * @private
         */
        this.coverflow = {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        };
        /**
         * @private
         */
        this.flip = {
            slideShadows: true,
            limitRotation: true
        };
        /**
         * @private
         */
        this.cube = {
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94
        };
        /**
         * @private
         */
        this.fade = {
            crossFade: false
        };
        // Accessibility
        /**
         * @private
         */
        this.prevSlideMessage = 'Previous slide';
        /**
         * @private
         */
        this.nextSlideMessage = 'Next slide';
        /**
         * @private
         */
        this.firstSlideMessage = 'This is the first slide';
        /**
         * @private
         */
        this.lastSlideMessage = 'This is the last slide';
        /**
         * @output {Slides} Emitted when a slide change starts.
         */
        this.ionSlideWillChange = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide change ends.
         */
        this.ionSlideDidChange = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide moves.
         */
        this.ionSlideDrag = new EventEmitter();
        /**
         * @output {Slides} Emitted when slides reaches its beginning (initial position).
         */
        this.ionSlideReachStart = new EventEmitter();
        /**
         * @output {Slides} Emitted when slides reaches its last slide.
         */
        this.ionSlideReachEnd = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide moves.
         */
        this.ionSlideAutoplay = new EventEmitter();
        /**
         * @output {Slides} Emitted when a autoplay starts.
         */
        this.ionSlideAutoplayStart = new EventEmitter();
        /**
         * @output {Slides} Emitted when a autoplay stops.
         */
        this.ionSlideAutoplayStop = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide change starts with the "forward" direction.
         */
        this.ionSlideNextStart = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide change starts with the "backward" direction.
         */
        this.ionSlidePrevStart = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide change ends with the "forward" direction.
         */
        this.ionSlideNextEnd = new EventEmitter();
        /**
         * @output {Slides} Emitted when a slide change ends with the "backward" direction.
         */
        this.ionSlidePrevEnd = new EventEmitter();
        /**
         * @output {Slides} Emitted when the user taps/clicks on the slide's container.
         */
        this.ionSlideTap = new EventEmitter();
        /**
         * @output {Slides} Emitted when the user double taps on the slide's container.
         */
        this.ionSlideDoubleTap = new EventEmitter();
        /** @private */
        this.ionSlideProgress = new EventEmitter();
        /** @private */
        this.ionSlideTransitionStart = new EventEmitter();
        /** @private */
        this.ionSlideTransitionEnd = new EventEmitter();
        /** @private */
        this.ionSlideTouchStart = new EventEmitter();
        /** @private */
        this.ionSlideTouchEnd = new EventEmitter();
        this._unregs = [];
        /** @internal */
        this._allowSwipeToNext = true;
        /** @internal */
        this._allowSwipeToPrev = true;
        this._zone = zone;
        this.id = ++slidesId;
        this.slideId = 'slides-' + this.id;
        this.setElementClass(this.slideId, true);
        // only initialize the slides whent the content is ready
        if (viewCtrl) {
            var subscription = viewCtrl.readReady.subscribe(function () {
                subscription.unsubscribe();
                _this._initSlides();
            });
        }
    }
    Object.defineProperty(Slides.prototype, "autoplay", {
        /**
         * \@input {number} Delay between transitions (in milliseconds). If this
         * parameter is not passed, autoplay is disabled. Default does
         * not have a value and does not autoplay.
         * Default: `null`.
         * @return {?}
         */
        get: function () {
            return this._autoplayMs;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._autoplayMs = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "control", {
        /**
         * \@input {Slides} Pass another Slides instance or array of Slides instances
         * that should be controlled by this Slides instance.
         * Default: `null`.
         * @return {?}
         */
        get: function () {
            return this._control;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val instanceof Slides || Array.isArray(val)) {
                this._control = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "effect", {
        /**
         * \@input {string} The animation effect of the slides.
         * Possible values are: `slide`, `fade`, `cube`, `coverflow` or `flip`.
         * Default: `slide`.
         * @return {?}
         */
        get: function () {
            return this._effectName;
        },
        /**
         * @param {?} effectName
         * @return {?}
         */
        set: function (effectName) {
            if (SWIPER_EFFECTS[effectName]) {
                this._effectName = effectName;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "direction", {
        /**
         * \@input {string}  Swipe direction: 'horizontal' or 'vertical'.
         * Default: `horizontal`.
         * @return {?}
         */
        get: function () {
            return this._direction;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val === 'horizontal' || val === 'vertical') {
                this._direction = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "initialSlide", {
        /**
         * \@input {number}  Index number of initial slide. Default: `0`.
         * @return {?}
         */
        get: function () {
            return this._initialSlide;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._initialSlide = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "loop", {
        /**
         * \@input {boolean} If true, continuously loop from the last slide to the
         * first slide.
         * @return {?}
         */
        get: function () {
            return this._isLoop;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._isLoop = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "pager", {
        /**
         * \@input {boolean}  If true, show the pager.
         * @return {?}
         */
        get: function () {
            return this._pager;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._pager = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "dir", {
        /**
         * \@input {string} If dir attribute is equal to rtl, set interal _rtl to true;
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._rtl = (val.toLowerCase() === 'rtl');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "paginationType", {
        /**
         * \@input {string}  Type of pagination. Possible values are:
         * `bullets`, `fraction`, `progress`. Default: `bullets`.
         * (Note that the pager will not show unless `pager` input
         * is set to true).
         * @return {?}
         */
        get: function () {
            return this._paginationType;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val === 'bullets' || val === 'fraction' || val === 'progress') {
                this._paginationType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "parallax", {
        /**
         * \@input {boolean} If true, allows you to use "parallaxed" elements inside of
         * slider.
         * @return {?}
         */
        get: function () {
            return this._isParallax;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._isParallax = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "speed", {
        /**
         * \@input {number} Duration of transition between slides
         * (in milliseconds). Default: `300`.
         * @return {?}
         */
        get: function () {
            return this._speedMs;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._speedMs = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "zoom", {
        /**
         * \@input {boolean} If true, enables zooming functionality.
         * @return {?}
         */
        get: function () {
            return this._isZoom;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._isZoom = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "spaceBetween", {
        /**
         * \@input {number} Distance between slides in px. Default: `0`.
         * @return {?}
         */
        get: function () {
            return this._spaceBetween;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._spaceBetween = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "slidesPerView", {
        /**
         * \@input {number} Slides per view. Slides visible at the same time. Default: `1`.
         * @return {?}
         */
        get: function () {
            return this._slidesPerView;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._slidesPerView = val === 'auto' ? 'auto' : parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "options", {
        /**
         * Deprecated
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            // Deprecated warning added 2016-12-28
            console.warn('ion-slides "options" has been deprecated. Please use ion-slide\'s input properties instead.');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "ionWillChange", {
        /**
         * Deprecated: Use "ionSlideWillChange" instead.
         * Added 2016-12-29
         * @return {?}
         */
        get: function () {
            console.warn('ion-slides "ionWillChange" has been deprecated, please use "ionSlideWillChange" instead.');
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "ionDidChange", {
        /**
         * Deprecated: Use "ionSlideDidChange" instead.
         * Added 2016-12-29
         * @return {?}
         */
        get: function () {
            console.warn('ion-slides "ionDidChange" has been deprecated, please use "ionSlideDidChange" instead.');
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "ionDrag", {
        /**
         * Deprecated: Use "ionSlideDrag" instead.
         * Added 2016-12-29
         * @return {?}
         */
        get: function () {
            console.warn('ion-slides "ionDrag" has been deprecated, please use "ionSlideDrag" instead.');
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Slides.prototype._initSlides = function () {
        if (!this._init) {
            (void 0) /* console.debug */;
            var /** @type {?} */ s = this;
            var /** @type {?} */ plt = s._plt;
            s.container = this.getNativeElement().children[0];
            // init swiper core
            initSwiper(s, plt);
            // init core event listeners
            this._unregs.push(initEvents(s, plt));
            if (this.zoom) {
                // init zoom event listeners
                this._unregs.push(initZoom(s, plt));
            }
            if (this.keyboardControl) {
                // init keyboard event listeners
                s.enableKeyboardControl(true);
            }
            this._init = true;
        }
    };
    /**
     * @return {?}
     */
    Slides.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._plt.timeout(function () {
            _this._initSlides();
        }, 300);
    };
    /**
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     * @param {?=} debounce
     * @return {?}
     */
    Slides.prototype.update = function (debounce) {
        var _this = this;
        if (debounce === void 0) { debounce = 300; }
        if (this._init) {
            this._plt.cancelTimeout(this._tmr);
            this._tmr = this._plt.timeout(function () {
                update(_this, _this._plt);
                // Don't allow pager to show with > 10 slides
                if (_this.length() > 10) {
                    _this.paginationType = undefined;
                }
            }, debounce);
        }
    };
    /**
     * @return {?}
     */
    Slides.prototype.resize = function () {
        if (this._init) {
        }
    };
    /**
     * Transition to the specified slide.
     *
     * @param {?} index
     * @param {?=} speed
     * @param {?=} runCallbacks
     * @return {?}
     */
    Slides.prototype.slideTo = function (index, speed, runCallbacks) {
        slideTo(this, this._plt, index, speed, runCallbacks);
    };
    /**
     * Transition to the next slide.
     *
     * @param {?=} speed
     * @param {?=} runCallbacks
     * @return {?}
     */
    Slides.prototype.slideNext = function (speed, runCallbacks) {
        slideNext(this, this._plt, runCallbacks, speed, true);
    };
    /**
     * Transition to the previous slide.
     *
     * @param {?=} speed
     * @param {?=} runCallbacks
     * @return {?}
     */
    Slides.prototype.slidePrev = function (speed, runCallbacks) {
        slidePrev(this, this._plt, runCallbacks, speed, true);
    };
    /**
     * Get the index of the active slide.
     *
     * @return {?}
     */
    Slides.prototype.getActiveIndex = function () {
        return this._activeIndex;
    };
    /**
     * Get the index of the previous slide.
     *
     * @return {?}
     */
    Slides.prototype.getPreviousIndex = function () {
        return this._previousIndex;
    };
    /**
     * Get the total number of slides.
     *
     * @return {?}
     */
    Slides.prototype.length = function () {
        return this._slides.length;
    };
    /**
     * Get whether or not the current slide is the last slide.
     *
     * @return {?}
     */
    Slides.prototype.isEnd = function () {
        return this._isEnd;
    };
    /**
     * Get whether or not the current slide is the first slide.
     *
     * @return {?}
     */
    Slides.prototype.isBeginning = function () {
        return this._isBeginning;
    };
    /**
     * Start auto play.
     * @return {?}
     */
    Slides.prototype.startAutoplay = function () {
        startAutoplay(this, this._plt);
    };
    /**
     * Stop auto play.
     * @return {?}
     */
    Slides.prototype.stopAutoplay = function () {
        stopAutoplay(this);
    };
    /**
     * Lock or unlock the ability to slide to the next slides.
     * @param {?} shouldLockSwipeToNext
     * @return {?}
     */
    Slides.prototype.lockSwipeToNext = function (shouldLockSwipeToNext) {
        this._allowSwipeToNext = !shouldLockSwipeToNext;
    };
    /**
     * Lock or unlock the ability to slide to the previous slides.
     * @param {?} shouldLockSwipeToPrev
     * @return {?}
     */
    Slides.prototype.lockSwipeToPrev = function (shouldLockSwipeToPrev) {
        this._allowSwipeToPrev = !shouldLockSwipeToPrev;
    };
    /**
     * Lock or unlock the ability to slide to change slides.
     * @param {?} shouldLockSwipes
     * @return {?}
     */
    Slides.prototype.lockSwipes = function (shouldLockSwipes) {
        this._allowSwipeToNext = this._allowSwipeToPrev = !shouldLockSwipes;
    };
    /**
     * Enable or disable keyboard control.
     * @param {?} shouldEnableKeyboard
     * @return {?}
     */
    Slides.prototype.enableKeyboardControl = function (shouldEnableKeyboard) {
        enableKeyboardControl(this, this._plt, shouldEnableKeyboard);
    };
    /**
     * @return {?}
     */
    Slides.prototype.ngOnDestroy = function () {
        this._init = false;
        this._unregs.forEach(function (unReg) {
            unReg();
        });
        this._unregs.length = 0;
        destroySwiper(this);
        this.enableKeyboardControl(false);
    };
    /**
     * Deprecated, please use the instance of ion-slides.
     * @return {?}
     */
    Slides.prototype.getSlider = function () {
        // deprecated 2016-12-29
        console.warn("ion-slides, getSlider() has been removed. Please use the properties and methods on the instance of ion-slides instead.");
    };
    Slides.decorators = [
        { type: Component, args: [{
                    selector: 'ion-slides',
                    template: '<div class="swiper-container" [attr.dir]="_rtl? \'rtl\' : null">' +
                        '<div class="swiper-wrapper">' +
                        '<ng-content></ng-content>' +
                        '</div>' +
                        '<div [class.hide]="!pager" class="swiper-pagination"></div>' +
                        '</div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    Slides.ctorParameters = function () { return [
        { type: Config, },
        { type: Platform, },
        { type: NgZone, },
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    Slides.propDecorators = {
        'autoplay': [{ type: Input },],
        'control': [{ type: Input },],
        'effect': [{ type: Input },],
        'direction': [{ type: Input },],
        'initialSlide': [{ type: Input },],
        'loop': [{ type: Input },],
        'pager': [{ type: Input },],
        'dir': [{ type: Input },],
        'paginationType': [{ type: Input },],
        'parallax': [{ type: Input },],
        'speed': [{ type: Input },],
        'zoom': [{ type: Input },],
        'spaceBetween': [{ type: Input },],
        'slidesPerView': [{ type: Input },],
        'ionSlideWillChange': [{ type: Output },],
        'ionSlideDidChange': [{ type: Output },],
        'ionSlideDrag': [{ type: Output },],
        'ionSlideReachStart': [{ type: Output },],
        'ionSlideReachEnd': [{ type: Output },],
        'ionSlideAutoplay': [{ type: Output },],
        'ionSlideAutoplayStart': [{ type: Output },],
        'ionSlideAutoplayStop': [{ type: Output },],
        'ionSlideNextStart': [{ type: Output },],
        'ionSlidePrevStart': [{ type: Output },],
        'ionSlideNextEnd': [{ type: Output },],
        'ionSlidePrevEnd': [{ type: Output },],
        'ionSlideTap': [{ type: Output },],
        'ionSlideDoubleTap': [{ type: Output },],
        'options': [{ type: Input },],
        'ionWillChange': [{ type: Output },],
        'ionDidChange': [{ type: Output },],
        'ionDrag': [{ type: Output },],
    };
    return Slides;
}(Ion));
function Slides_tsickle_Closure_declarations() {
    /** @type {?} */
    Slides.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Slides.ctorParameters;
    /** @type {?} */
    Slides.propDecorators;
    /** @type {?} */
    Slides.prototype._autoplayMs;
    /** @type {?} */
    Slides.prototype._control;
    /** @type {?} */
    Slides.prototype._effectName;
    /** @type {?} */
    Slides.prototype._direction;
    /** @type {?} */
    Slides.prototype._initialSlide;
    /** @type {?} */
    Slides.prototype._isLoop;
    /** @type {?} */
    Slides.prototype._pager;
    /** @type {?} */
    Slides.prototype._paginationType;
    /** @type {?} */
    Slides.prototype.paginationBulletRender;
    /** @type {?} */
    Slides.prototype._isParallax;
    /** @type {?} */
    Slides.prototype._speedMs;
    /** @type {?} */
    Slides.prototype._isZoom;
    /**
     * Height of container.
     * @type {?}
     */
    Slides.prototype.height;
    /**
     * Width of container.
     * @type {?}
     */
    Slides.prototype.width;
    /**
     * Enabled this option and swiper will be operated as usual except it will
     * not move, real translate values on wrapper will not be set. Useful when
     * you may need to create custom slide transition.
     * @type {?}
     */
    Slides.prototype.virtualTranslate;
    /**
     * Set to true to round values of slides width and height to prevent blurry
     * texts on usual resolution screens (if you have such)
     * @type {?}
     */
    Slides.prototype.roundLengths;
    /** @type {?} */
    Slides.prototype._spaceBetween;
    /** @type {?} */
    Slides.prototype._slidesPerView;
    /** @type {?} */
    Slides.prototype.slidesPerColumn;
    /** @type {?} */
    Slides.prototype.slidesPerColumnFill;
    /** @type {?} */
    Slides.prototype.slidesPerGroup;
    /** @type {?} */
    Slides.prototype.centeredSlides;
    /** @type {?} */
    Slides.prototype.slidesOffsetBefore;
    /** @type {?} */
    Slides.prototype.slidesOffsetAfter;
    /** @type {?} */
    Slides.prototype.touchEventsTarget;
    /** @type {?} */
    Slides.prototype.autoplayDisableOnInteraction;
    /** @type {?} */
    Slides.prototype.autoplayStopOnLast;
    /** @type {?} */
    Slides.prototype.freeMode;
    /** @type {?} */
    Slides.prototype.freeModeMomentum;
    /** @type {?} */
    Slides.prototype.freeModeMomentumRatio;
    /** @type {?} */
    Slides.prototype.freeModeMomentumBounce;
    /** @type {?} */
    Slides.prototype.freeModeMomentumBounceRatio;
    /** @type {?} */
    Slides.prototype.freeModeMomentumVelocityRatio;
    /** @type {?} */
    Slides.prototype.freeModeSticky;
    /** @type {?} */
    Slides.prototype.freeModeMinimumVelocity;
    /** @type {?} */
    Slides.prototype.autoHeight;
    /** @type {?} */
    Slides.prototype.setWrapperSize;
    /** @type {?} */
    Slides.prototype.zoomMax;
    /** @type {?} */
    Slides.prototype.zoomMin;
    /** @type {?} */
    Slides.prototype.zoomToggle;
    /** @type {?} */
    Slides.prototype.touchRatio;
    /** @type {?} */
    Slides.prototype.touchAngle;
    /** @type {?} */
    Slides.prototype.simulateTouch;
    /** @type {?} */
    Slides.prototype.shortSwipes;
    /** @type {?} */
    Slides.prototype.longSwipes;
    /** @type {?} */
    Slides.prototype.longSwipesRatio;
    /** @type {?} */
    Slides.prototype.longSwipesMs;
    /** @type {?} */
    Slides.prototype.followFinger;
    /** @type {?} */
    Slides.prototype.onlyExternal;
    /** @type {?} */
    Slides.prototype.threshold;
    /** @type {?} */
    Slides.prototype.touchMoveStopPropagation;
    /** @type {?} */
    Slides.prototype.touchReleaseOnEdges;
    /** @type {?} */
    Slides.prototype.iOSEdgeSwipeDetection;
    /** @type {?} */
    Slides.prototype.iOSEdgeSwipeThreshold;
    /** @type {?} */
    Slides.prototype.paginationClickable;
    /** @type {?} */
    Slides.prototype.paginationHide;
    /** @type {?} */
    Slides.prototype.resistance;
    /** @type {?} */
    Slides.prototype.resistanceRatio;
    /** @type {?} */
    Slides.prototype.watchSlidesProgress;
    /** @type {?} */
    Slides.prototype.watchSlidesVisibility;
    /** @type {?} */
    Slides.prototype.preventClicks;
    /** @type {?} */
    Slides.prototype.preventClicksPropagation;
    /** @type {?} */
    Slides.prototype.slideToClickedSlide;
    /** @type {?} */
    Slides.prototype.loopAdditionalSlides;
    /** @type {?} */
    Slides.prototype.loopedSlides;
    /** @type {?} */
    Slides.prototype.swipeHandler;
    /** @type {?} */
    Slides.prototype.noSwiping;
    /** @type {?} */
    Slides.prototype.runCallbacksOnInit;
    /** @type {?} */
    Slides.prototype.controlBy;
    /** @type {?} */
    Slides.prototype.controlInverse;
    /** @type {?} */
    Slides.prototype.keyboardControl;
    /** @type {?} */
    Slides.prototype.coverflow;
    /** @type {?} */
    Slides.prototype.flip;
    /** @type {?} */
    Slides.prototype.cube;
    /** @type {?} */
    Slides.prototype.fade;
    /** @type {?} */
    Slides.prototype.prevSlideMessage;
    /** @type {?} */
    Slides.prototype.nextSlideMessage;
    /** @type {?} */
    Slides.prototype.firstSlideMessage;
    /** @type {?} */
    Slides.prototype.lastSlideMessage;
    /** @type {?} */
    Slides.prototype.originalEvent;
    /**
     * \@output {Slides} Emitted when a slide change starts.
     * @type {?}
     */
    Slides.prototype.ionSlideWillChange;
    /**
     * \@output {Slides} Emitted when a slide change ends.
     * @type {?}
     */
    Slides.prototype.ionSlideDidChange;
    /**
     * \@output {Slides} Emitted when a slide moves.
     * @type {?}
     */
    Slides.prototype.ionSlideDrag;
    /**
     * \@output {Slides} Emitted when slides reaches its beginning (initial position).
     * @type {?}
     */
    Slides.prototype.ionSlideReachStart;
    /**
     * \@output {Slides} Emitted when slides reaches its last slide.
     * @type {?}
     */
    Slides.prototype.ionSlideReachEnd;
    /**
     * \@output {Slides} Emitted when a slide moves.
     * @type {?}
     */
    Slides.prototype.ionSlideAutoplay;
    /**
     * \@output {Slides} Emitted when a autoplay starts.
     * @type {?}
     */
    Slides.prototype.ionSlideAutoplayStart;
    /**
     * \@output {Slides} Emitted when a autoplay stops.
     * @type {?}
     */
    Slides.prototype.ionSlideAutoplayStop;
    /**
     * \@output {Slides} Emitted when a slide change starts with the "forward" direction.
     * @type {?}
     */
    Slides.prototype.ionSlideNextStart;
    /**
     * \@output {Slides} Emitted when a slide change starts with the "backward" direction.
     * @type {?}
     */
    Slides.prototype.ionSlidePrevStart;
    /**
     * \@output {Slides} Emitted when a slide change ends with the "forward" direction.
     * @type {?}
     */
    Slides.prototype.ionSlideNextEnd;
    /**
     * \@output {Slides} Emitted when a slide change ends with the "backward" direction.
     * @type {?}
     */
    Slides.prototype.ionSlidePrevEnd;
    /**
     * \@output {Slides} Emitted when the user taps/clicks on the slide's container.
     * @type {?}
     */
    Slides.prototype.ionSlideTap;
    /**
     * \@output {Slides} Emitted when the user double taps on the slide's container.
     * @type {?}
     */
    Slides.prototype.ionSlideDoubleTap;
    /** @type {?} */
    Slides.prototype.ionSlideProgress;
    /** @type {?} */
    Slides.prototype.ionSlideTransitionStart;
    /** @type {?} */
    Slides.prototype.ionSlideTransitionEnd;
    /** @type {?} */
    Slides.prototype.ionSlideTouchStart;
    /** @type {?} */
    Slides.prototype.ionSlideTouchEnd;
    /**
     * Private properties only useful to this class.
     * ------------------------------------
     * @type {?}
     */
    Slides.prototype._init;
    /** @type {?} */
    Slides.prototype._tmr;
    /** @type {?} */
    Slides.prototype._unregs;
    /** @type {?} */
    Slides.prototype.clickedIndex;
    /** @type {?} */
    Slides.prototype.clickedSlide;
    /** @type {?} */
    Slides.prototype.container;
    /** @type {?} */
    Slides.prototype.id;
    /** @type {?} */
    Slides.prototype.progress;
    /** @type {?} */
    Slides.prototype.realIndex;
    /** @type {?} */
    Slides.prototype.renderedHeight;
    /** @type {?} */
    Slides.prototype.renderedWidth;
    /** @type {?} */
    Slides.prototype.slideId;
    /** @type {?} */
    Slides.prototype.swipeDirection;
    /** @type {?} */
    Slides.prototype.velocity;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._activeIndex;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._allowClick;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._allowSwipeToNext;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._allowSwipeToPrev;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._animating;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._autoplaying;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._autoplayPaused;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._autoplayTimeoutId;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._bullets;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._classNames;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._isBeginning;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._isEnd;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._keyboardUnReg;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._liveRegion;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._paginationContainer;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._previousIndex;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._renderedSize;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._rtl;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._slides;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._snapGrid;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._slidesGrid;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._snapIndex;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._slidesSizesGrid;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._spline;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._supportTouch;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._supportGestures;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._touches;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._touchEvents;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._touchEventsDesktop;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._translate;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._virtualSize;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._wrapper;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._zone;
    /**
     * \@internal
     * @type {?}
     */
    Slides.prototype._zoom;
    /** @type {?} */
    Slides.prototype.nextButton;
    /** @type {?} */
    Slides.prototype.prevButton;
    /** @type {?} */
    Slides.prototype._plt;
}
var /** @type {?} */ slidesId = -1;
//# sourceMappingURL=slides.js.map