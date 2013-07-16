requirejs.config
  shim:
    'underscore':
      exports: '_'
    'backbone':
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    'relational':
      deps: ['backbone']
      exports: 'Relational'
    'bootstrap':
      deps: ['jquery']
      exports: 'bootstrap'
  paths:
    'text'              : 'libs/text'
    'jquery'            : 'libs/jquery'
    'underscore'        : 'libs/underscore'
    'backbone'          : 'libs/backbone'
    'relational'        : 'libs/backbone-relational'
    'bootstrap'         : 'libs/bootstrap'
    'moment'            : 'libs/moment'
    'App'               : 'app'
    'jade'              : 'libs/jade'
    'Router'            : 'app/router'
    'ClientModel'       : 'app/models/client'
    'ProfileModel'      : 'app/models/profile'
    'ClientCollection'  : 'app/collections/clients'
    'HomeView'          : 'app/views/home'
    'HeaderView'        : 'app/views/header'
    'ClientListView'    : 'app/views/clients/index'
    'ClientEditView'    : 'app/views/clients/edit'
    'ClientView'        : 'app/views/clients/show'
    'LoginView'         : 'app/views/profile/login'
    'RegisterView'      : 'app/views/profile/register'
    'ForgotPasswordView': 'app/views/profile/forgot'
    'ProjectModel'      : 'app/models/project'
    'ProjectCollection' : 'app/collections/projects'

require ['App'], (App) ->
  App.initialize()