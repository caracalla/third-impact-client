(function($, window, document, undefined) {
  'use strict';

  window.app = {
    apiURL: "http://api.caracal.la/",
    mainElement: $("#main"),

    init: function () {
      window.baseURL = this.apiURL;
      window.mainElement = document.getElementById("main"); // this.mainElement;
      $("body").on("click", "a", this.clickLink);
      window.onpopstate = this.clickBack;
      controllers.post.index();
    },

    clickLink: function(event) {
      var tag = event.target;
      if (tag.href && event.button == 0) {
        // event.button - left click on a (standard, right-handed) mouse
        if (tag.origin == document.location.origin) {
          // It's a same-origin navigation: a link within the site.
          var oldPath = document.location.pathname;
          var newPath = tag.pathname;

          event.preventDefault();
          app.router(newPath);
          window.history.pushState(null, '', newPath);
        } else {
          $(this).attr("target", "_blank");
        }
      }
    },

    clickBack: function(event) {
      event.preventDefault();
      app.router(document.location.pathname);
    },

    user: function() {
      if (utilities.isLoggedIn()) {
        return {
          id: localStorage["user-id"],
          username: localStorage["username"],
          email: localStorage["auth-email"],
          admin: localStorage["admin"]
        }
      }
    },

    templates: {}
  };
}(window.jQuery, window, document));
