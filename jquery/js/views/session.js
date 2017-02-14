(function ($, window, document, undefined) {
  'use strict';

  app.views.session = {
    logIn: function () {
      if (app.utils.isLoggedIn()) {
        app.navigateTo("/")
      } else {
        app.mainElement.html(Mustache.render(app.templates.session.create));
        $("#log-in-button").on("click", app.controllers.session.onLogInSubmit);
      }
    },

    loggedInNavbar: function () {
      $("#navbar").html(Mustache.render(app.templates.navbar.loggedIn, app.user()));
    },

    loggedOutNavbar: function () {
      $("#navbar").html(Mustache.render(app.templates.navbar.loggedOut));
    }
  };
}(window.jQuery, window, window.document));
