define ['jquery', 'underscore', 'backbone', 'jade!app/templates/home'], ($, _, Backbone, tpl) ->
  class HomeView extends Backbone.View
    initialize: ->
      @.template = tpl
    render: ->
      $(@.el).html(@.template())
      return @
