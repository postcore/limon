/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* eslint-disable */

'use strict'

var limon = require('../index')

/**
 * We don't want lexer to be on per character
 * basis, so we will write a plugin that
 * overwrite the default `.tokenize` method
 * to pass only the input to the `.run` method.
 */

limon.use(function (app) {
  this.tokenize = function tokenize (input, options) {
    this.defaults(input, options)
    if (!this.input || this.input.length === 0) {
      throw new TypeError('limon.tokenize: expect `input` be non-empty string or buffer')
    }
    this.run(this.input)
    return this.tokens
  }
})
.use(function () {
  return function (input, i) {
    console.log(input, i) // => 'foo bar!', undefined
  }
})
.use(function () {
  return function (input, i) {
    console.log(this.first) // => true
    console.log(input, i) // => 'foo bar!', undefined
  }
})
.tokenize('foo bar!')
