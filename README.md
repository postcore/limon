# [limon][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> The pluggable JavaScript lexer on per character basis.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
```
npm i limon --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const limon = require('limon')
limon
  .use(function prevNext (app) {
    return function (ch, i, input) {
      app.prev = function prev (pos) {
        pos = pos || 1
        return input[i - pos]
      }
      app.next = function next (pos) {
        pos = pos || 1
        return input[i + pos]
      }
    }
  })
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

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/limonjs/limon/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[extend-shallow]: https://github.com/jonschlinkert/extend-shallow
[isarray]: https://github.com/juliangruber/isarray
[isobject]: https://github.com/jonschlinkert/isobject

[npmjs-url]: https://www.npmjs.com/package/limon
[npmjs-img]: https://img.shields.io/npm/v/limon.svg?label=limon

[license-url]: https://github.com/limonjs/limon/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg

[codeclimate-url]: https://codeclimate.com/github/limonjs/limon
[codeclimate-img]: https://img.shields.io/codeclimate/github/limonjs/limon.svg

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

