define ['jquery', 'underscore', 'backbone', 'jade!app/templates/clients/show', 'ClientModel', 'ProjectCollection', 'ProjectModel'], ($, _, Backbone, tpl, Client, Projects, Project) ->
  class ClientView extends Backbone.View
    initialize: ->
      @.template = tpl
      @.collection = new Projects()
    events: {
      "click .delete-btn": "removeClient"
    }
    render: ->
      @.collection.fetch(
        success: (model) =>
          console.log model.toJSON()
          tmpl = @.template(
            client: @.model.toJSON()
            projects: model.toJSON()
          )
          $(@.el).html(tmpl)
      )
      return @
    removeClient: (e) ->
      e.preventDefault()
      @.model.destroy(
        {
          sync: on
          success: (model) ->
            model.trigger('delete-success')
        }
      )
