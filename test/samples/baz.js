var protean = require('protean');
var classify = protean.classify;
/**
 * @class module:Foo.Baz
 * @extends Object
 */
exports = module.exports = classify(function Baz () {
    /**
     * @property {Object}
     */
    this.values = {};
},/** @lends Baz# */{
    /**
     * @param {String} name
     * @returns {Mixed}
     */
    get (name) {
        return this.values[name];
    },
    /**
     * @param {String} name
     * @param {Mixed} value
     * @returns {Bar}
     */
    set (name, value) {
        this.values[name] = value;
        return this;
    }
});

