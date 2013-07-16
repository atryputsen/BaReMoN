define ['jquery', 'underscore', 'backbone', 'jade!app/templates/clients/index', 'ClientCollection'], ($, _, Backbone, tpl, ClientCollection) ->
  class ClientListView extends Backbone.View
    initialize: ->
      @.template = tpl
      @.collection = new ClientCollection()
    getData: (callback) ->
      @.collection.fetch(
        {
          success: (collection) ->
            callback(collection)
        }
      )
    render: (callback) ->
      that_ = @
      @.getData(
        (collection) =>
          tmpl = @.template({clients: collection.toJSON()})
          $(@.el).html(tmpl)
          callback()
      )

