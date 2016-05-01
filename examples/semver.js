/*!
 * limon <https://github.com/limonjs/limon>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* eslint-disable */

'use strict'

var lazy = require('../utils')
var limon = require('../index')
var semver = require('semver')
var plugins = require('./plugins')

/**
 * Tokenize semver
 */

limon
  .use(plugins.matcher())
  .use(plugins.parseToken())
  .use(plugins.semver())

var tokens = limon.tokenize('>= 12.617.33453455-bAB-Cuild+4.57 < 8.9.0')

console.log(tokens)
// console.log(semver.parse('12.617.33453455-bAB-Cuild+4.57'))

/**
 * Semver parser
 */

// var res = {}
// res.raw = ''
// res.major = ''
// res.minor = ''
// res.patch = ''
// res.prerelease = []
// res.build = []
// res.version = ''

// var state = {space: 0, spaces: 0, dash: 0, dashes: 0, plus: 0, pluses: 0}
// var temp = ''

// var len = tokens.length
// var i = 0

// while (i < len) {
//   var token = limon.parseToken(i++)
//   delete token.next
//   temp += token.value
//   if (token.type === 'space') {
//     state.space = token.start
//     state.spaces++
//   }
//   if (token.type !== 'symbol' && token.type !== 'space') {
//     if (token.start > state.space && state.spaces <= 1) {
//       if (token.type === 'dash') {
//         state.dash = token.start
//         state.dashes++
//       }
//       if (state.dashes < 1) {
//         // clean version: x.y.z
//         // console.log('actual', token)
//       }
//       console.log(token)
//       console.log(state)
//     }
//   }
// }
// console.log(res)
