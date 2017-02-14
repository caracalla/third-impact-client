(function ($, window, document, undefined) {
  'use strict';

  app.models.user = {
    create: function (userParams) {
      api.post("users", userParams, app.controllers.session.onLogInSuccess);
    },

    list: function (callback) {
      api.get("users", callback);
    },

    read: function (userID, callback) {
      api.get("users/" + userID, callback);
    },

    posts: function (userID, callback) {
      var postsURL = "users/" + userID + "/posts"

      api.get(postsURL, callback);
    }
  };
})(window.jQuery, window, window.document);
