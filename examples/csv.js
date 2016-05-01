/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* eslint-disable */

'use strict'

var fs = require('fs')
var lazy = require('../utils')
var limon = require('../index')
var plugins = require('./plugins')

/**
 * Tokenize CSV as RFC 4180
 * @see  https://tools.ietf.org/html/rfc4180
 * @see  https://github.com/parsecsv/csv-spec/blob/draft/README.md
 */

limon
  .use(plugins.matcher())
  .use(plugins.parseToken())
  .use(function () {
    return function () {
      this.delimiters = this.delimiters || 0
      this.delimiters++
      this.token('delimiter', /,/)
    }
  })
  .use(function () {
    return function () {
      this.line = this.line || 0
      this.line++
      this.token('linebreak', /\r?\n/)
    }
  })
  .use(function () {
    return function () {
      this.token('character', /[^,\r\n]+/)
    }
  })
  // may need more few lexer plugins?
var tokens = limon.tokenize(fs.readFileSync('./utf8.csv', 'utf8'))

/**
 * Parsing part, below.
 */

var ast = [{}]
var len = tokens.length - 1
var i = 0
var fields = []
var rows = []
var field = ''
var row = 0

while (i < len) {
  var token = limon.parseToken(i++)
  if (token.type === 'character') {
    field += token.value
  }
  if (token.type === 'delimiter' || token.type === 'linebreak') {
    fields.push(field)
    field = ''
    if (token.type === 'linebreak') {
      rows.push(fields)
      fields = []
      row++
    }
  }
}

console.log(tokens)
console.log('=====')

// missing last row...
// and few other bugs
console.log(rows)
