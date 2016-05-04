# [limon][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> The pluggable JavaScript lexer. Limon = Lemon. :lemon:

[![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Examples
This is not finished yet, but go to [examples](./examples) directory and look deeply there. :tada:  
We have few initial examples:

- [advanced](./examples/advanced.js) - making the lexer to not be "_on per character basis_", by overwriting the `.tokenize` method using plugin.
- [semver](./examples/semver.js) - tokenize semver string or alike
- [simple](./examples/simple.js) - tokenize simple string (for example: `a > (b + 2)`)
- [csv](./examples/csv.js) - tokenize CSV string, and partially parsing
- more upcoming... [going to port](https://github.com/limonjs/limon/issues/7) the [PostCSS Tokenizer](https://github.com/postcss/postcss/blob/master/lib/tokenize.es6)

And finally, after all, benchmarking.

## Install
```
npm i limon --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const limon = require('limon')
const prevNext = require('limon-prev-next')

limon
  .use(prevNext())
  .use(function (app) {
    return function (ch, i, input) {
      // console.log('prev is:', this.prev())
      // console.log('next is:', this.next())

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
console.log(tokens)
// =>
// [ [ 'letter', 'a', 0 ],
//   [ 'whitespace', ' ', 1 ],
//   [ 'symbol', '>', 2 ],
//   [ 'whitespace', ' ', 3 ],
//   [ 'symbol', '(', 4 ],
//   [ 'letter', 'b', 5 ],
//   [ 'whitespace', ' ', 6 ],
//   [ 'symbol', '+', 7 ],
//   [ 'whitespace', ' ', 8 ],
//   [ 'digit', '2', 9 ],
//   [ 'symbol', ')', 10 ] ]
```

### [Limon](index.js#L33)
> Initialize `Limon` with `input` and `options`. Both are completely optional. You can pass plugins and tokens to `options`.

**Params**

* `input` **{String}**: String value to tokenize, or if object it is assumed `options`.    
* `options` **{Object}**: Optional options, use it to pass plugins or tokens.    

**Example**

```js
var Limon = require('limon').Limon
var lexer = new Limon('foo bar')

// or pass only options
var limon = new Limon({ foo: 'bar' })
var tokens = limon.tokenize('baz qux')
```

## Related
* [lazy-arrayify](https://www.npmjs.com/package/lazy-arrayify): We are lazy, also [lazy-cache][]d and [browserify][]-ready - just arrayify, falsey values… [more](https://www.npmjs.com/package/lazy-arrayify) | [homepage](https://github.com/tunnckocore/lazy-arrayify)
* [lazy-cache](https://www.npmjs.com/package/lazy-cache): Cache requires to be lazy-loaded when needed. | [homepage](https://github.com/jonschlinkert/lazy-cache)
* [lazy-utils](https://www.npmjs.com/package/lazy-utils): Most of the used mostly everywhere utils: [extend-shallow][], [isobject][], [is-extendable][] (used in… [more](https://www.npmjs.com/package/lazy-utils) | [homepage](https://github.com/tunnckocore/lazy-utils)
* [limon-prev-next](https://www.npmjs.com/package/limon-prev-next): Plugin for [limon][] pluggable lexer that adds `prev` and `next` methods. | [homepage](https://github.com/limonjs/limon-prev-next)
* [postjson](https://www.npmjs.com/package/postjson): Transforming JSON with plugins. | [homepage](https://github.com/postjson/postjson)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/limonjs/limon/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[browserify]: https://github.com/substack/node-browserify
[extend-shallow]: https://github.com/jonschlinkert/extend-shallow
[is-extendable]: https://github.com/jonschlinkert/is-extendable
[isobject]: https://github.com/jonschlinkert/isobject
[lazy-cache]: https://github.com/jonschlinkert/lazy-cache
[limon]: https://github.com/limonjs/limon

[npmjs-url]: https://www.npmjs.com/package/limon
[npmjs-img]: https://img.shields.io/npm/v/limon.svg?label=limon

[license-url]: https://github.com/limonjs/limon/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/limon.svg

[downloads-url]: https://www.npmjs.com/package/limon
[downloads-img]: https://img.shields.io/npm/dm/limon.svg

[travis-url]: https://travis-ci.org/limonjs/limon
[travis-img]: https://img.shields.io/travis/limonjs/limon/master.svg

[coveralls-url]: https://coveralls.io/r/limonjs/limon
[coveralls-img]: https://img.shields.io/coveralls/limonjs/limon.svg

[david-url]: https://david-dm.org/limonjs/limon
[david-img]: https://img.shields.io/david/limonjs/limon.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg