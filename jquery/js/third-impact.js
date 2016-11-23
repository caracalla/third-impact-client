(function (window, document, undefined) {
  'use strict';

  window.ThirdImpact = {
    settings: {
      baseURL: "http://local-impact.com:3000/",
      mainElement: $("#main"),
      navbarElement: $("#navbar")
    },

    init: function () {
      ThirdImpact.showNavbar();
      ThirdImpact.showPosts();
    },

    showPosts: function () {
      var postsURL = ThirdImpact.settings.baseURL + "posts";
      $.getJSON(postsURL, ThirdImpact.renderPosts);
    },

    renderPosts: function (posts) {
      var postsHTML = $.map(posts, function (post) {
        return Mustache.render(Templates.post, post);
      }).join("");

      $(postsHTML).hide()
        .appendTo(ThirdImpact.settings.mainElement)
        .slideDown();
    },

    showNavbar: function () {
      ThirdImpact.settings.navbarElement.append(Templates.loggedOutNavbar);
    },
  };
})(window, window.document);
