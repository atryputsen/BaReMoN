define ['jquery', 'underscore', 'backbone'], ($, _, Backbone) ->
  class Project extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/projects"
    defaults: 
      name    : ''
      client_id    : ''
      technology   : ''
      description : ''
    validate: (attrs)->
      errors = {}
      if not attrs._silent
        ### check required fields ###
        fields = ['name', 'client_id', 'technology', 'description']
        for i in fields
          if not attrs[fields[i]] 
            errors[fields[i]] = fields[i] + ' required'
        ### check valid name ###
        if attrs.name
          nameLen = attrs.name.length
        else
          nameLen = null
        if nameLen < 2 or nameLen > 100
          errors.name = "invalid name"
        if _.keys(errors).length > 0
          errors: errors