define ['jquery', 'underscore', 'backbone', 'ProjectCollection'], ($, _, Backbone, Projects) ->
  class Client extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/clients"
    defaults: 
        name    : ''
        email   : ''
        company : ''
        phone    : ''
    validate: (attrs)->
      console.log attrs
      errors = {}
      if not attrs._silent
        ### check required fields ###
        fields = ['name', 'email', 'company', 'phone']
        for field in fields
          if not attrs[field] 
            errors[field] = field + ' required'
        ### check valid name ###
        if attrs.name
          nameLen = attrs.name.length
        else
          nameLen = null
        if nameLen < 2 or nameLen > 100
          errors.name = "invalid name";
        ### check valid email ###
        if not /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(attrs.email)
          errors.email = "invalid email"          
        ### check valid company ###
        if attrs.company
          compLen = attrs.company.length
        else
          compLen = null
        if not compLen or compLen < 2 or compLen >100
          errors.company = "invalid company";

        if _.keys(errors).length
          errors: errors


