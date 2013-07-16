define ['jquery', 'underscore', 'backbone', 'Router'], ($, _, Backbone, Router) ->
  router = new Router
  initialize = ->
    router.checkLogin(runApplication)
  runApplication = (authenticated) ->
    if not authenticated
      localStorage.setItem('isAuth', false)
      window.location.replace('#/login')
    else
      localStorage.setItem('isAuth', true)
    window.app = router: router
    Backbone.history.start()
  return initialize: initialize