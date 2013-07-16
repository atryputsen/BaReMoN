define ['jquery', 'underscore', 'backbone', 'jade!app/templates/clients/edit', 'ClientModel'], ($, _, Backbone, tpl, Client) ->
  class ClientEditView extends Backbone.View
    initialize: ->
      @.template = tpl
      @.errTmpl = '<div class="span4">'
      @.errTmpl += '<div class="alert alert-error">'
      @.errTmpl += '<button type="button" class="close" data-dismiss="alert">x</button>'
      @.errTmpl += '<%- msg %>'
      @.errTmpl += '</div>'
      @.errTmpl += '</div>'
      @.errTmpl = _.template(@.errTmpl)
    events: {
      "focus .input-prepend input" : "removeErrMsg",
      "click .save-btn"            : "saveClient",
      "click .back-btn"            : "goBack",
      "click .close"            : "removeErrMsg"
    }
    render: ->
      tmpl = @.template({ client: @.model.toJSON()})
      $(@.el).html(tmpl);
      return @
    goBack: (e) ->
      e.preventDefault()
      @.trigger('back')
    saveClient: (e) ->
      console.log 'Save Client'
      _that = @
      #e.preventDefault()
      name    = $.trim($('#name-input').val())
      email   = $.trim($('#email-input').val())
      company = $.trim($('#company-input').val())
      phone    = $.trim($('#phone-input').val())
      if phone
        phone = phone
      else
        phone = null
      console.log @.model
      @.model.save(
        name: name
        email: email
        company: company
        phone: phone
        {
          silent: off
          sync: on
          success: (model, res) ->
            console.log res
            if res and res.errors
              _that.renderErrMsg(res.error)
            else
              model.trigger('save-success', model.get('_id'))
          error: (model, res) ->
            console.log res
            if res and res.errors
              _that.renderErrMsg(res.errors)
        }
      )
    renderErrMsg: (err) ->
      @.removeErrMsg()
      msgs = []
      if _.isString(err)
        msgs.push(err)
      else
        if err.general
          msgs.push(err.general)
          delete err.general
        if _.keys(err).length
          msgs.push(_.keys(err).join(', ') + ' field(s) are invalid');
      msgs = _.map(
        msgs
        (string)->
          string.charAt(0).toUpperCase() + string.slice(1);
      ).join('.')
      $(@.el).find('form').after(
        @.errTmpl(
          {msg: msgs}
        )
      )
    removeErrMsg: ->
      $(@.el).find('.alter-error').remove()