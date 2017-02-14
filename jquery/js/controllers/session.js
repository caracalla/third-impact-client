(function ($, window, document, undefined) {
  'use strict';

  app.controllers.session = {
    logIn: function () {
      app.views.session.logIn();
    },

    logOut: function () {
      app.models.session.destroy();
    },

    onLogInSubmit: function (event) {
      event.preventDefault();

      var username = $("#username-field").val();
      var password = $("#password-field").val();
      var credentials = { user: { username: username, password: password } };

      app.models.session.create(credentials)
    },

    onLogInSuccess: function (user) {
      localStorage.setItem('auth-email', user.email);
      localStorage.setItem('auth-token', user.auth_token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('user-id', user.id);
      // seems like a bad idea, but the API should block any invalid admin-related requests
      localStorage.setItem('admin', user.admin);

      app.navigateTo("/");
    },

    onLogOutSuccess: function () {
      localStorage.removeItem("auth-email");
      localStorage.removeItem("auth-token");
      localStorage.removeItem("username");
      localStorage.removeItem("user-id");
      localStorage.removeItem("admin");

      app.navigateTo("/");
    },

    navbar: function () {
      if (app.utils.isLoggedIn()) {
        app.views.session.loggedInNavbar();
      } else {
        app.views.session.loggedOutNavbar();
      }
    }
  };
})(window.jQuery, window, window.document);
