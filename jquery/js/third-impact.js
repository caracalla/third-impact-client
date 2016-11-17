(function (window, document, undefined) {
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
      var url = ThirdImpact.settings.baseURL + "posts";
      $.getJSON(url, ThirdImpact.renderPosts);
    },

    renderPosts: function (posts) {
      var postsHTML = $.map(posts, function (post) {
        return Mustache.render(Templates.post, post);
      });

      ThirdImpact.settings.mainElement.append(postsHTML);
    },

    showNavbar: function () {
      ThirdImpact.settings.navbarElement.append(Templates.loggedOutNavbar);
    },
  };
})(window, window.document);