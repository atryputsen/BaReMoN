define ['jquery', 'underscore', 'backbone', 'HomeView', 'HeaderView', 'ClientListView', 'ClientView', 'ClientEditView', 'ClientModel', 'LoginView', 'RegisterView', 'ProjectModel'], ($, _, Backbone, HomeView, HeaderView, ClientListView, ClientView, ClientEditView, Client, LoginView, RegisterView, Project) ->
  class AppRouter extends Backbone.Router
    routes: {
      '': 'home'
      'home': 'home'
      'clients': 'showClients'
      'clients/new': 'addClient'
      'clients/:id': 'showClient'
      'clients/:id/edit': 'editClient'
      'login': 'login'
      'register': 'register'
      'logout': 'logout'
      '*actions': 'defaultAction'
    }
    initialize: ->
      @.headerView = new HeaderView()
      @.elms = {
        'page-content': $('.page-content')
      }
      $('header').hide().html(@.headerView.render().el).fadeIn('slow')
      $('footer').fadeIn('slow')
    isAuth: (authenticated) ->
      if not authenticated
        localStorage.setItem('isAuth', false)
    checkLogin: (callback) ->
      check = null
      $.ajax(
        '/account/authenticated'
        {
          methods: 'GET'
          success: ->
            check = callback(true)
          error: ->
            check = callback(false)
        }
      )
      return check
    home: ->
      console.log 'home'
      @.headerView.select('home-menu')

      if not @.homeView
        @.homeView = new HomeView()
      @.elms['page-content'].html(@.homeView.render().el)
    showClients: ->
      console.log(localStorage)
      if localStorage.getItem('isAuth') is 'false'
        window.location.replace('#/login')
      else
        @.headerView.select('list-menu')
        if not @.clientListView
          @.clientListView = new ClientListView()
        @.clientListView.render(
          =>
            @.elms['page-content'].html(@.clientListView.el)
        )
    showClient: (id) ->
      if localStorage.getItem('isAuth') is 'false'
        window.location.replace('#/login')
      else
        view = {}
        @.headerView.select()     
        model = new Client({
          _id: id
          _silent: on
        })
        model.fetch(
          {
            success: (model) =>
              model.unset('_silent')
              view = new ClientView({model: model})
              @.elms['page-content'].html(view.render().el)
              view.model.on(
                'delete-success'
                ->
                  window.location.replace('#/clients');
              )
          }
        )
    addClient: ->
      if localStorage.getItem('isAuth') is 'false'
        window.location.replace('#/login')
      else
        @.headerView.select('new-menu')
        model = new Client()
        view = new ClientEditView({ model: model })
        @.elms['page-content'].html(view.render().el)
        view.on(
          'back'
          ->
            window.location.replace('#/clients')
        )
        view.model.on(
          'save-success'
          (id) ->
            window.location.replace('#/clients/'+ id)
        )
    editClient: (id) ->
      if localStorage.getItem('isAuth') is 'false'
        window.location.replace('#/login')
      else
        @.headerView.select();
        model = new Client(
          {
            _id: id
            _silent: true
          }
        )
        model.fetch(
          {
            success: (model) =>
              model.unset('_silent')
              view = new ClientEditView({ model: model })
              @.elms['page-content'].html(view.render().el)
              view.on(
                'back'
                ->
                  window.location.replace('#/clients/' + id)
              )
              view.model.on(
                'save-success'
                ->
                  window.location.replace('#/clients/' + id)
              )
          }
        )
    login: ->
      console.log('login')
      console.log(localStorage)
      if not @.LoginView
        @.LoginView = new LoginView()
      @.elms['page-content'].html(@.LoginView.render().el)
    logout: (req, res) ->
      console.log('logout');
      $.get(
        '/logout'
        ->
          localStorage.setItem('isAuth', 'false')
          window.location.replace('#/login')
      ).error(
        ->
          $("#error").text('Unable to login.')
          $("#error").slideDown();
      )
      return false
    register: ->
      console.log('RegisterView');
      if not @.RegisterView
        @.RegisterView = new RegisterView()
      @.elms['page-content'].html(@.RegisterView.render().el)