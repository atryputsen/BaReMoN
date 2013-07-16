// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'underscore', 'backbone', 'jade!app/templates/profile/login'], function($, _, Backbone, tpl) {
  var LoginView, _ref;

  return LoginView = (function(_super) {
    __extends(LoginView, _super);

    function LoginView() {
      _ref = LoginView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LoginView.prototype.initialize = function() {
      this.template = tpl;
      this.errTmpl = '<div class="span4">';
      this.errTmpl += '<div class="alert alert-error">';
      this.errTmpl += '<button type="button" class="close" data-dismiss="alert">x</button>';
      this.errTmpl += '<%- msg %>';
      this.errTmpl += '</div>';
      this.errTmpl += '</div>';
      this.errTmpl = _.template(this.errTmpl);
      return console.log('login view');
    };

    LoginView.prototype.events = {
      "click #loginButton": "login",
      "submit form": 'login',
      "click .close": "removeErrMsg"
    };

    LoginView.prototype.render = function() {
      var tmpl;

      tmpl = this.template();
      $(this.el).html(tmpl);
      return this;
    };

    LoginView.prototype.login = function(event) {
      var that_;

      event.preventDefault();
      that_ = this;
      return $.post('/login', {
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val()
      }, function(data, textStatus, jqXHR) {
        console.log(jqXHR);
        localStorage.setItem('isAuth', true);
        return window.location.replace('#');
      }).fail(function() {
        console.log(error);
        return that_.renderErrMsg('Wrong email or password');
      });
    };

    LoginView.prototype.renderErrMsg = function(err) {
      $(this.el).find('.alert-error').text(err);
      return $(this.el).find('#error').show();
    };

    LoginView.prototype.removeErrMsg = function() {
      console.log('remove');
      $(this.el).find('.alert-error').empty();
      $(this.el).find('#error').hide();
      return false;
    };

    return LoginView;

  })(Backbone.View);
});
