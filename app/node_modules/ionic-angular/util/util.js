/**
 * Given a min and max, restrict the given number
 * to the range.
 * @param {?} min the minimum
 * @param {?} n the value
 * @param {?} max the maximum
 * @return {?}
 */
export function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
/**
 * @param {?} obj
 * @return {?}
 */
export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * @param {?} fn
 * @param {?} wait
 * @param {?=} immediate
 * @return {?}
 */
export function debounce(fn, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var /** @type {?} */ timeout, /** @type {?} */ args, /** @type {?} */ context, /** @type {?} */ timestamp, /** @type {?} */ result;
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var /** @type {?} */ later = function () {
            var /** @type {?} */ last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate)
                    result = fn.apply(context, args);
            }
        };
        var /** @type {?} */ callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow)
            result = fn.apply(context, args);
        return result;
    };
}
/**
 * Apply default arguments if they don't exist in
 * the first object.
 * @param {?} dest
 * @param {...?} args
 * @return {?}
 */
export function defaults(dest) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var /** @type {?} */ i = arguments.length - 1; i >= 1; i--) {
        var /** @type {?} */ source = arguments[i];
        if (source) {
            for (var key in source) {
                if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}
/**
 * @param {?} val
 * @return {?}
 */
export function isBoolean(val) { return typeof val === 'boolean'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isString(val) { return typeof val === 'string'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isNumber(val) { return typeof val === 'number'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isFunction(val) { return typeof val === 'function'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isDefined(val) { return typeof val !== 'undefined'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isUndefined(val) { return typeof val === 'undefined'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isPresent(val) { return val !== undefined && val !== null; }
/**
 * @param {?} val
 * @return {?}
 */
export function isBlank(val) { return val === undefined || val === null; }
/**
 * @param {?} val
 * @return {?}
 */
export function isObject(val) { return typeof val === 'object'; }
/**
 * @param {?} val
 * @return {?}
 */
export function isArray(val) { return Array.isArray(val); }
;
/**
 * @param {?} val
 * @return {?}
 */
export function isPrimitive(val) {
    return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val));
}
;
/**
 * @param {?} val
 * @return {?}
 */
export function isTrueProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
}
;
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function isCheckedProperty(a, b) {
    if (a === undefined || a === null || a === '') {
        return (b === undefined || b === null || b === '');
    }
    else if (a === true || a === 'true') {
        return (b === true || b === 'true');
    }
    else if (a === false || a === 'false') {
        return (b === false || b === 'false');
    }
    else if (a === 0 || a === '0') {
        return (b === 0 || b === '0');
    }
    // not using strict comparison on purpose
    return (a == b); // tslint:disable-line
}
;
/**
 * @param {?} array
 * @param {?} indexes
 * @return {?}
 */
export function reorderArray(array, indexes) {
    var /** @type {?} */ element = array[indexes.from];
    array.splice(indexes.from, 1);
    array.splice(indexes.to, 0, element);
    return array;
}
/**
 * @param {?} array
 * @param {?} item
 * @return {?}
 */
export function removeArrayItem(array, item) {
    var /** @type {?} */ index = array.indexOf(item);
    return !!~index && !!array.splice(index, 1);
}
/**
 * @param {?} isResetDirection
 * @param {?} isMovingFast
 * @param {?} isOnResetZone
 * @return {?}
 */
export function swipeShouldReset(isResetDirection, isMovingFast, isOnResetZone) {
    // The logic required to know when the sliding item should close (openAmount=0)
    // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
    // and it ended up being too complicated to be written manually without errors
    // so the truth table is attached below: (0=false, 1=true)
    // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
    //         0        |       0      |       0       ||    0
    //         0        |       0      |       1       ||    1
    //         0        |       1      |       0       ||    0
    //         0        |       1      |       1       ||    0
    //         1        |       0      |       0       ||    0
    //         1        |       0      |       1       ||    1
    //         1        |       1      |       0       ||    1
    //         1        |       1      |       1       ||    1
    // The resulting expression was generated by resolving the K-map (Karnaugh map):
    var /** @type {?} */ shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
    return shouldClose;
}
/** @private */
var /** @type {?} */ ASSERT_ENABLED = true;
/**
 * @param {?} fn
 * @return {?}
 */
function _runInDev(fn) {
    if (ASSERT_ENABLED === true) {
        return fn();
    }
}
/**
 * @param {?} actual
 * @param {?} reason
 * @return {?}
 */
function _assert(actual, reason) {
    if (!actual && ASSERT_ENABLED === true) {
        var /** @type {?} */ message = 'IONIC ASSERT: ' + reason;
        console.error(message);
        debugger; // tslint:disable-line
        throw new Error(message);
    }
}
/** @private */
export { _assert as assert };
/** @private */
export { _runInDev as runInDev };
//# sourceMappingURL=util.js.map