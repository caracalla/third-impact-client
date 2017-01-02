(function($, window, document, undefined) {
  'use strict';

  app.routes = {
    "/jquery/users/": models.user.index,
    "/jquery": controllers.post.index,
    "/jquery/": controllers.post.index,
    "/jquery/404": function () { app.mainElement.html(Mustache.render(app.templates.notFound)) }
  };

  app.router = function(route) {
    console.log(route);

    if (Object.keys(app.routes).includes(route)) {
      app.routes[route].call();
    } else {
      app.routes["/jquery/404"].call();
    }
  };
}(window.jQuery, window, document));
