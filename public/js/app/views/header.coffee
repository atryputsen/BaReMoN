define ['jquery', 'underscore', 'backbone', 'jade!app/templates/header'], ($, _, Backbone, tpl) ->
  class HeaderView extends Backbone.View
    initialize: ->
      this.template = tpl
      ajaxLoader =$('.ajax-loader')
      $('body').ajaxStart(
        ->
          console.log('run loader')
          ajaxLoader.show()
      ).ajaxStop(
        ->
          console.log('stop loader')
          ajaxLoader.fadeOut('fast')
      )
    render: ->
      tmpl = @.template()
      $(@.el).html(tmpl)
      return @
    select: (item) ->
      $('.nav li').removeClass('active')
      $('.' + item).addClass('active')