(function ($, window, document, undefined) {
  'use strict';

  app.views.user = {
    index: function (users) {
      var listHTML = users.map(function (user) {
        return Mustache.render(app.templates.user.listItem, {user: user})
      }).join('\n');

      app.mainElement.html(listHTML);
    },

    newUser: function () {
      app.mainElement.html(Mustache.render(app.templates.user.form));
      $("#sign-up-button").on("click", app.controllers.user.onSignUp);
    },

    show: function (user) {
      app.mainElement.html(JSON.stringify(user));

      app.models.user.posts(user.id, function (posts) {
        app.mainElement.html(app.views.post.renderList(posts));
      });
    }
  };
}(window.jQuery, window, window.document));
