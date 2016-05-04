/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var lazy = require('./utils')

/**
 * > Initialize `Limon` with `input` and `options`.
 * Both are completely optional. You can pass plugins
 * and tokens to `options`.
 *
 * **Example**
 *
 * ```js
 * var Limon = require('limon').Limon
 * var lexer = new Limon('foo bar')
 *
 * // or pass only options
 * var limon = new Limon({ foo: 'bar' })
 * var tokens = limon.tokenize('baz qux')
 * ```
 *
 * @param {String} `input` String value to tokenize, or if object it is assumed `options`.
 * @param {Object} `options` Optional options, use it to pass plugins or tokens.
 * @api public
 */

function Limon (input, options) {
  if (!(this instanceof Limon)) {
    return new Limon(input, options)
  }

  lazy.use(this, {
    fn: function (app, opts) {
      app.options = lazy.utils.extend(app.options, opts)
    }
  })

  this.defaults(input, options)
  this.use(lazy.plugin.prevNext())
}

Limon.prototype.defaults = function defaults (input, options) {
  if (lazy.utils.isBuffer(input)) {
    input = input.toString('utf8')
  }
  if (lazy.utils.isObject(input)) {
    options = input
    input = null
  }
  this.options = lazy.utils.extend({}, this.options, options)
  this.tokens = lazy.utils.isArray(this.tokens) ? this.tokens : []
  this.input = input || this.input
  this.input = typeof this.input === 'string' ? this.input : null
}

Limon.prototype.tokenize = function tokenize (input, options) {
  this.defaults(input, options)

  if (!this.input || this.input.length === 0) {
    throw new TypeError('limon.tokenize: expect `input` be non-empty string or buffer')
  }

  var len = this.input.length
  var i = 0

  while (i < len) {
    this.run(this.input[i], i, this.input)
    i++
  }
  return this.tokens
}

/**
 * Expose `Limon` instance
 *
 * @type {Object}
 * @api private
 */

module.exports = new Limon()

/**
 * Expose `Limon` constructor
 *
 * @type {Function}
 * @api private
 */

module.exports.Limon = Limon
