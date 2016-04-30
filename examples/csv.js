/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* eslint-disable */

'use strict'

var fs = require('fs')
// var lazy = require('../utils')
var limon = require('../index')

function matcher () {
  return function plugin (app) {
    return function (ch, i, input) {
      app.match = function match (re) {
        return re.test(ch) ? ch : null
      }
      app.token = function token (name, re) {
        var m = app.match(re)
        if (!m) return
        app.tokens.push([name, ch, i, i + 1])
      }
    }
  }
}

limon.use(matcher())
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

function parseToken (tokens, i) {
  var token = tokens[i]
  return token ? {
    type: token[0],
    value: token[1],
    start: token[2],
    end: token[3],
    next: parseToken(tokens, i + 1)
  } : {}
}

var ast = [{}]
var len = tokens.length - 1
var i = -1
var fields = []
var rows = []
var field = ''
var row = 0

while (i++ < len) {
  var token = parseToken(tokens, i)
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
console.log(rows)
