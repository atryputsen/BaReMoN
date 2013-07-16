define ['jquery', 'underscore', 'backbone', 'jade!app/templates/profile/register', 'ProfileModel'], ($, _, Backbone, tpl, Profile) ->
  class RegisterView extends Backbone.View
    initialize: ->
      this.template = tpl
    events: {
      "submit form": "register"
    }
    render: ->
      tmpl = this.template()
      $(@.el).html(tmpl)
      return @
    register: (event) ->
      $.post(
        '/register'
        {
          name: $('input[name=name]').val(),
          email: $('input[name=email]').val(),
          password: $('input[name=password]').val()
        }
        (data) ->
          window.location.replace('#/login')
      )
      return false