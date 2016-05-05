/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var test = require('mukla')
var Limon = require('./index').Limon
var limon = require('./index')
var isArray = require('isarray')

test('should exposed constructor be signleton', function (done) {
  test.strictEqual(typeof Limon === 'function', true)
  test.strictEqual(typeof Limon() === 'object', true)
  test.strictEqual(typeof (new Limon()) === 'object', true)
  done()
})

test('should have `.use`, `.run` and `.tokenize` method on prototype', function (done) {
  test.strictEqual(typeof limon.use, 'function')
  test.strictEqual(typeof limon.run, 'function')
  test.strictEqual(typeof limon.tokenize, 'function')
  done()
})

test('should throw TypeError on missing input', function (done) {
  function fixture () {
    limon.tokenize(123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `input` be non-empty string/)
  done()
})

test('should throw TypeError if not function passed to `.use` method', function (done) {
  function fixture () {
    limon.use(123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `fn` be function/)
  done()
})

test('should immediately invoke a plugin function', function (done) {
  var called = false
  var app = new Limon()
  app.use(function () {
    called = true
  })
  test.strictEqual(called, true)
  done()
})

test('should not add to `this.plugins` if plugin not returns function', function (done) {
  var lexer = new Limon()
    .use(function (app) {
      app.foo = 'bar'
      app.qux = 12345
    })

  test.strictEqual(lexer.plugins.length, 1) // one, because we have one internal function
  test.strictEqual(lexer.foo, 'bar')
  test.strictEqual(lexer.qux, 12345)
  done()
})

test('should push returned functions onto `this.plugins`', function (done) {
  var lexer = new Limon()
  lexer.use(function () {
    return function () {}
  })
  lexer.use(function () {
    return function () {}
  })
  lexer.use(function () {
    return function () {}
  })
  test.strictEqual(lexer.plugins.length, 4)
  done()
})

test('should be able to pass `input` from constructor not from `.tokenize` method', function (done) {
  var lexer = new Limon('a > (b + 2)')
  lexer.tokenize({ aaa: 'bbb' })

  test.strictEqual(lexer.input, 'a > (b + 2)')
  test.deepEqual(lexer.options, { aaa: 'bbb' })
  done()
})

test('should extend options passed to `.tokenize` with that from constructor', function (done) {
  var limon = new Limon({foo: 'bar'})
  limon.tokenize('a.b.c', {qux: 123})

  test.deepEqual(limon.options, { foo: 'bar', qux: 123 })
  done()
})

test('should `.tokenize` return array with tokens', function (done) {
  limon.use(function () {
    return function (ch, i) {
      if (/\s/.test(ch)) {
        this.tokens.push(['whitespace', ch, i])
        return
      }
      if (/\W/.test(ch)) {
        this.tokens.push(['symbol', ch, i])
        return
      }
      if (/\d/.test(ch)) {
        this.tokens.push(['digit', ch, i])
        return
      }
      this.tokens.push(['letter', ch, i])
    }
  })
  var tokens = limon.tokenize('a > (b + 2)')

  test.strictEqual(isArray(tokens), true)
  test.strictEqual(tokens.length, 11)
  test.deepEqual(tokens[0], ['letter', 'a', 0])
  test.deepEqual(tokens[2], ['symbol', '>', 2])
  done()
})

test('should be able to bass buffer as `input` instead of string', function (done) {
  var app = new Limon()
  app
    .use(function () {
      return function (ch) {
        this.tokens.push(ch)
      }
    })
    .tokenize(new Buffer('a,2,c'))

  test.strictEqual(app.tokens.length, 5)
  done()
})
