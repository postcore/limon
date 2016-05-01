'use strict'

exports.matcher = function matcher () {
  return function plugin (app) {
    return function (ch, i, input) {
      app.match = function match (re) {
        return re.test(ch) ? ch : null
      }
      app.token = function token (name, re) {
        var m = app.match(re)
        if (!m) return
        app.current = [name, ch, i, i + 1]
        app.tokens.push(app.current)
      }
    }
  }
}

exports.parseToken = function parseToken () {
  return function plugin (app) {
    app.parseToken = function parseToken (i) {
      var token = app.tokens[i]
      return token ? {
        type: token[0],
        value: token[1],
        start: token[2],
        end: token[3],
        next: app.parseToken(i + 1)
      } : {}
    }
  }
}

exports.semver = function semver () {
  return function (app) {
    app
      .use(function () {
        return function () {
          this.token('space', /\s/)
          this.token('dot', /\./)
          this.token('digit', /\d/)
          this.token('dash', /-/)
          this.token('plus', /\+/)
        }
      })
      .use(function () {
        return function (ch) {
          // we should do something for
          // previously used regexes?
          if (/[\s.\d\-\+]/.test(ch)) return
          this.token('symbol', /\W/)
          if (/[\s.\d\-\+\W]/.test(ch)) return
          this.token('letter', /[a-zA-Z]+/)
        }
      })
      .use(function () {
        return function (ch, i, input) {
          // array of the current token,
          // maybe should be more advanced object
          // with more metadata or etc:
          //
          // console.log(this.current)
          // console.log(this.prev()) // prev character
          // console.log(this.next()) // next character
        }
      })
  }
}
