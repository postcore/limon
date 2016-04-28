/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var isObject = require('isobject')
var isArray = require('isarray')
var extend = require('extend-shallow')

function Limon (input, options) {
  if (!(this instanceof Limon)) {
    return new Limon(input)
  }

  this.options = isObject(options) ? options : {}
  this.plugins = isArray(this.options.plugins) ? this.options.plugins : []
  this.tokens = isArray(this.options.tokens) ? this.options.tokens : []
  this.input = typeof input === 'string' ? input : ''
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
  if (isObject(input)) {
    options = input
    input = null
  }

  this.options = extend(this.options, options)
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
