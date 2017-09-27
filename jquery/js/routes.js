(function($, window, document, undefined) {
  'use strict';

  app.topLevelRoutes = {
    "": app.controllers.post.index,
    "log-in": app.controllers.session.logIn,
    "log-out": app.controllers.session.logOut,
    "sign-up": app.controllers.user.newUser,
    "users": app.controllers.user.index,
    "user": app.controllers.user.getAction,
    "post": app.controllers.post.getAction,
    "404": function () { app.mainElement.html(Mustache.render(app.templates.notFound)) }
  };

  app.router = function(route) {
    if (route.indexOf("/jquery") === 0) {
      // remove leading /jquery
      route = route.replace("/jquery", "");
    }

    if (route.indexOf("/") === 0) {
      // remove leading slash
      route = route.slice(1);
    }

    // If it's the homepage, skip all the nonsense below
    if (route === "") {
      app.topLevelRoutes[route].call();
    } else {
      var routeElements = route.split("/");
      var firstElement = routeElements[0];
      var lastElement = routeElements[routeElements.length - 1];

      // Obtain params if any are provided
      // TODO: figure out if this even works
      var params = {};

      if (lastElement && lastElement.indexOf("?") !== -1) {
        lastElements = lastElement.split("?");
        routeElements[routeElements.length - 1] = lastElements[0]; // remove params from route elements
        paramsStrings = lastElements[lastElements - 1].split("&");

        paramsStrings.forEach(function (param) {
          params[param[0]] = param[1];
        });
      }

      // Call the proper function based on route, or 404
      if (Object.keys(app.topLevelRoutes).includes(firstElement)) {
        app.topLevelRoutes[firstElement].call(null, routeElements.slice(1), params);
      } else {
        app.topLevelRoutes["404"].call();
      }
    }

    app.controllers.session.navbar();
  };
}(window.jQuery, window, document));
