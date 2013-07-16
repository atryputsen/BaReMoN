define ['jquery', 'underscore', 'backbone', 'ClientModel'], ($, _, Backbone, Client) ->
  class ClientCollection extends Backbone.Collection
    model : Client,
    url   : "/clients"


