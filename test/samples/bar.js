var protean = require('protean');
var classify = protean.classify;

/**
 * @class module:Foo.Bar
 * @extends Object
 */
exports = module.exports = classify(function Bar () {
    /**
     * @property {Object}
     */
    this.values = {};
},/** @lends Bar# */{
    /**
     * @param {String} name
     * @returns {Mixed}
     */
    get (name) {
        // get the value in our object hash
        return this.values[name];
    },
    /**
     * @param {String} name
     * @param {Mixed} value
     * @returns {Bar}
     */
    set (name, value) {
        // set the value in our object hash
        this.values[name] = value;
        return this;
    }
});

