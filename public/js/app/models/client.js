// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'underscore', 'backbone', 'ProjectCollection'], function($, _, Backbone, Projects) {
  var Client, _ref;

  return Client = (function(_super) {
    __extends(Client, _super);

    function Client() {
      _ref = Client.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Client.prototype.idAttribute = "_id";

    Client.prototype.urlRoot = "/clients";

    Client.prototype.defaults = {
      name: '',
      email: '',
      company: '',
      phone: ''
    };

    Client.prototype.validate = function(attrs) {
      var compLen, errors, field, fields, nameLen, _i, _len;

      console.log(attrs);
      errors = {};
      if (!attrs._silent) {
        /* check required fields
        */

        fields = ['name', 'email', 'company', 'phone'];
        for (_i = 0, _len = fields.length; _i < _len; _i++) {
          field = fields[_i];
          if (!attrs[field]) {
            errors[field] = field + ' required';
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
        /* check valid email
        */

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(attrs.email)) {
          errors.email = "invalid email";
        }
        /* check valid company
        */

        if (attrs.company) {
          compLen = attrs.company.length;
        } else {
          compLen = null;
        }
        if (!compLen || compLen < 2 || compLen > 100) {
          errors.company = "invalid company";
        }
        if (_.keys(errors).length) {
          return {
            errors: errors
          };
        }
      }
    };

    return Client;

  })(Backbone.Model);
});
