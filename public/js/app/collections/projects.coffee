define ['jquery', 'underscore', 'backbone', 'ProjectModel'], ($, _, Backbone, Project) ->
	class ProjectCollection extends Backbone.Collection
		model : Project,
		url   : "/projects"
		initialize: ->
			@_indexes = 
				by_key: {}
				by_id: {}
			super	
		getByAttr: (attr, value)->
			@.detect((model)->
				console.log model
				model.get(attr) == value;
			)
		getByModelAttr: (attr) ->
		    filtered = @.filter((model)->
		    	model.get("client_id") === attr
		    )
		    new self::(filtered)



