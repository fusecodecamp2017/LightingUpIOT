(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.Key = {};
    exports.Key.LEFT = 37;
    exports.Key.UP = 38;
    exports.Key.RIGHT = 39;
    exports.Key.DOWN = 40;
    exports.Key.ENTER = 13;
    exports.Key.ESCAPE = 27;
    exports.Key.SPACE = 32;
    exports.Key.TAB = 9;
    exports.Key[exports.Key.LEFT] = "LEFT";
    exports.Key[exports.Key.UP] = "UP";
    exports.Key[exports.Key.RIGHT] = "RIGHT";
    exports.Key[exports.Key.DOWN] = "DOWN";
    exports.Key[exports.Key.ENTER] = "ENTER";
    exports.Key[exports.Key.ESCAPE] = "ESCAPE";
    exports.Key[exports.Key.SPACE] = "SPACE";
    exports.Key[exports.Key.TAB] = "TAB";
});
//# sourceMappingURL=key.js.map