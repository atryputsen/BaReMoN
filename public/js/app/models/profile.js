// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var Profile, _ref;

  return Profile = (function(_super) {
    __extends(Profile, _super);

    function Profile() {
      _ref = Profile.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Profile.prototype.idAttribute = "_id";

    Profile.prototype.urlRoot = "/login";

    Profile.prototype.defaults = {
      name: '',
      email: '',
      password: ''
    };

    Profile.prototype.validate = function(attrs) {
      var errors, fields, i, nameLen, passLen, _i, _len;

      errors = {};
      if (!attrs._silent) {
        /* check required fields
        */

        fields = ['name', 'email', 'password'];
        for (_i = 0, _len = fields.length; _i < _len; _i++) {
          i = fields[_i];
          if (!attrs[fields[i]]) {
            errors[fields[i]] = fields[i] + ' required';
          }
        }
        /* check valid name
        */

        if (attrs.name) {
          nameLen = attrs.name.length;
        } else {
          nameLen = null;
        }
        if (nameLen < 2 || nameLen > 100) {
          errors.name = "invalid name";
        }
        /* check valid password
        */

        if (attrs.password) {
          passLen = attrs.password.length;
        } else {
          passLen = null;
        }
        if (passLen < 2 || passLen > 100) {
          errors.password = "invalid password";
        }
        /* check valid email
        */

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(attrs.email)) {
          errors.email = "invalid email";
        }
        if (_.keys(errors).length) {
          return {
            errors: errors
          };
        }
      }
    };

    return Profile;

  })(Backbone.Model);
});
