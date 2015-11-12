/**
 * @class Foo
 * @constructor
 */
function Foo () {
}

Foo.prototype = {
    /**
     * @param {String} id
     * @returns {Mixed}
     */
    get: function (id) {
    },
    /**
     * @param {String} id
     * @param {Mixed} val
     * @returns {Mixed} the old value
     */
    set: function (id, val) {
    }
};

module.exports = Foo;
