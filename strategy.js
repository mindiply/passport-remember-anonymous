/**
 * Created by bongio on 29/06/2017.
 */
/**
 * Module dependencies.
 */
var passport = require("passport-strategy");
var util = require("util");

/**
 * Creates an instance of `Strategy`.
 *
 * Options:
 *
 *   - `cookieName`  Cookie name (defaults to "remember-anonymous-token")
 *
 * Examples:
 *
 *  passport.use(new RememberAnonymousStrategy(
 *    function(token, done) {
 *      findOrCreateUser({token: token}, function (err, user, newToken) {
 *          if (err) { return done(err); }
 *          if (!user) { return done(null, false); }
 *          return done(null, user, newToken);
 *      }
 *  ));
 *
 * @constructor
 * @param {Object} [options]
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
    if (typeof options === "function") {
        verify = options;
        options = {};
    }

    if (!verify) {
        throw new TypeError("RememberAnonymouStrategy requires a verify callback");
    }

    passport.Strategy.call(this);
    this.name = "cookie";
    this._cookieName = options.cookieName || "remember-anonymous-token";
    this._verify = verify;
    this._opts = { path: '/', httpOnly: true, maxAge: 604800000 }
}

/**
 * Inherits from `passport.Strategy`
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on cookie.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
    if (req.isAuthenticated()) { return this.pass(); }
    var token;
    if (req && req.cookies && req.cookies[this._cookieName]) {
        token = req.cookies[this._cookieName];
    }

    var self = this;
    function verified(err, user, newToken) {
        if (err) { return self.error(err); }
        if (!user) {
            return self.fail(401);
        }
        var res = req.res;
        res.cookie(self._cookieName, newToken, self._opts);
        self.success(user);
    }
    self._verify(token, verified);
};

/**
 * Expose `Strategy`
 */
module.exports = Strategy;
