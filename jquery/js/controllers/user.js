(function ($, window, document, undefined) {
  'use strict';

  app.controllers.user = {
    index: function () {
      app.models.user.list(app.views.user.index);
    },

    newUser: function () {
      app.views.user.newUser();
    },

    getAction: function (routeElements, params) {
      var userID = routeElements[0];

      app.controllers.user.show(userID);
    },

    show: function (userID) {
      app.models.user.read(userID, app.views.user.show);
    },

    onSignUp: function (event) {
      event.preventDefault();

      var email = $("#email-field").val();
      var username = $("#username-field").val();
      var password = $("#password-field").val();
      var userParams = {
        user: {
          email: email,
          username: username,
          password: password
        }
      };

      app.models.user.create(userParams);
    }
  };
})(window.jQuery, window, window.document);
