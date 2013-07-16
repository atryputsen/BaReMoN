// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'underscore', 'backbone', 'jade!app/templates/clients/index', 'ClientCollection'], function($, _, Backbone, tpl, ClientCollection) {
  var ClientListView, _ref;

  return ClientListView = (function(_super) {
    __extends(ClientListView, _super);

    function ClientListView() {
      _ref = ClientListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ClientListView.prototype.initialize = function() {
      this.template = tpl;
      return this.collection = new ClientCollection();
    };

    ClientListView.prototype.getData = function(callback) {
      return this.collection.fetch({
        success: function(collection) {
          return callback(collection);
        }
      });
    };

    ClientListView.prototype.render = function(callback) {
      var that_,
        _this = this;

      that_ = this;
      return this.getData(function(collection) {
        var tmpl;

        tmpl = _this.template({
          clients: collection.toJSON()
        });
        $(_this.el).html(tmpl);
        return callback();
      });
    };

    return ClientListView;

  })(Backbone.View);
});