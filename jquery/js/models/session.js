(function ($, window, document, undefined) {
  'use strict';

  app.models.session = {
    create: function (credentials) {
      api.post("session", credentials, app.controllers.session.onLogInSuccess);
    },

    destroy: function () {
      api.delete("session", app.controllers.session.onLogOutSuccess);
    }
  };
})(window.jQuery, window, window.document);
