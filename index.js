/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

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
  if (utils.isObject(input)) {
    options = input
    input = null
  }

  this.options = utils.isObject(options) ? options : {}
  this.plugins = utils.arr.arrayify(this.options.plugins)
  this.tokens = utils.arr.isArray(this.options.tokens) ? this.options.tokens : []
  this.input = typeof input === 'string' ? input : ''
  this.use(utils.plugin.prevNext())
}

Limon.prototype.use = function use (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('limon.use: expect `fn` be function')
  }

  fn = fn.call(this, this)
  if (typeof fn === 'function') {
    this.plugins.push(fn)
  }
  return this
}

Limon.prototype.run = function run () {
  var len = this.plugins.length
  var i = 0

  while (i < len) {
    this.plugins[i++].apply(this, arguments)
  }
  return this
}

Limon.prototype.tokenize = function tokenize (input, options) {
  if (utils.isObject(input)) {
    options = input
    input = null
  }
  this.options = utils.extend(this.options, options)
  this.input = typeof input === 'string' ? input : this.input

  if (this.input.length === 0) {
    throw new TypeError('limon.tokenize: expect `input` be non-empty string')
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
