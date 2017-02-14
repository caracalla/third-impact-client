(function($, window, document, undefined) {
  'use strict';

  window.app = {
    init: function () {
      this.apiURL = "http://api.caracal.la/",
      this.mainElement = $("#main"),
      $("body").on("click", "a", this.clickLink);
      window.onpopstate = this.clickBack;
      app.router(document.location.pathname);
    },

    navigateTo: function (path) {
      // var oldPath = document.location.pathname;
      app.router(path);
      window.history.pushState(null, '', path);
    },

    clickLink: function (event) {
      var link = event.target;
      if (link.href && event.button == 0) {
        // event.button - left click on a (standard, right-handed) mouse
        if (link.origin == document.location.origin) {
          // It's a same-origin navigation: a link within the site.
          event.preventDefault();
          app.navigateTo(link.pathname);
        } else {
          $(this).attr("target", "_blank");
        }
      }
    },

    clickBack: function (event) {
      event.preventDefault();
      app.router(document.location.pathname);
    },

    user: function() {
      if (app.utils.isLoggedIn()) {
        return {
          id: localStorage["user-id"],
          username: localStorage["username"],
          email: localStorage["auth-email"],
          admin: localStorage["admin"]
        }
      }
    },

    controllers: {},
    models: {},
    templates: {},
    views: {}
  };
}(window.jQuery, window, document));
