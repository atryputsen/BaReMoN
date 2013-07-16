define ['jquery', 'underscore', 'backbone'], ($, _, Backbone) ->
  class Profile extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/login"
    defaults: 
        name    : ''
        email   : ''
        password : ''
    validate: (attrs)->
      errors = {}
      if not attrs._silent
        
        ### check required fields ###
        fields = ['name', 'email', 'password']
        for i in fields
          if not attrs[fields[i]] 
            errors[fields[i]] = fields[i] + ' required'
        
        ### check valid name ###
        if attrs.name
          nameLen = attrs.name.length
        else
          nameLen = null
        if nameLen < 2 or nameLen > 100
          errors.name = "invalid name";

        ### check valid password ###
        if attrs.password
          passLen = attrs.password.length
        else
          passLen = null
        if passLen < 2 or passLen > 100
          errors.password = "invalid password";
        
        ### check valid email ###
        if not /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(attrs.email)
          errors.email = "invalid email"

        if _.keys(errors).length
          errors: errors


