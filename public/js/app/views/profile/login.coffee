define ['jquery', 'underscore', 'backbone', 'jade!app/templates/profile/login'], ($, _, Backbone, tpl) ->
  class LoginView extends Backbone.View
    initialize: ->
      this.template = tpl
      @.errTmpl = '<div class="span4">'
      @.errTmpl += '<div class="alert alert-error">'
      @.errTmpl += '<button type="button" class="close" data-dismiss="alert">x</button>'
      @.errTmpl += '<%- msg %>'
      @.errTmpl += '</div>'
      @.errTmpl += '</div>'
      @.errTmpl = _.template(@.errTmpl)
      console.log('login view')
    events: {
      "click #loginButton": "login"
      "submit form": 'login'
      "click .close"            : "removeErrMsg"
    }
    render: ->
      tmpl = @.template()
      $(@.el).html(tmpl)
      return @
    login: (event) ->
      event.preventDefault()
      that_ = @
      $.post(
        '/login'
        {
          email: $('input[name=email]').val()
          password: $('input[name=password]').val()
        }
        (data, textStatus, jqXHR)->
          console.log jqXHR
          localStorage.setItem('isAuth', true);
          window.location.replace('#');
      ).fail(
        ->
          console.log error
          that_.renderErrMsg('Wrong email or password')
      )
    renderErrMsg: (err) ->
      $(@.el).find('.alert-error').text(err)
      $(@.el).find('#error').show()
    removeErrMsg: ->
      console.log 'remove'
      $(@.el).find('.alert-error').empty()
      $(@.el).find('#error').hide()
      return false;
