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
