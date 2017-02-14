(function ($, window, document, undefined) {
  'use strict';

  app.views.post = {
    index: function (posts) {
      if (app.utils.isLoggedIn()) {
        var postsHTML = app.templates.post.form + app.views.post.renderList(posts);
        app.mainElement.html(postsHTML);

        $("submit-post-button").on("click", app.controllers.post.onPostSubmit);
      } else {
        var postsHTML = app.templates.user.signUpBanner + app.views.post.renderList(posts);
        app.mainElement.html(postsHTML);
      }
    },

    show: function (post) {
      app.mainElement.html(app.views.post.render(post));
    },

    render: function (post) {
      var renderForAdminOrOwner = function (text, render) {
        if (post.user.admin || (app.user() && post.user_id.toString() == app.user().id)) {
          return render(text) + "\n";
        }
      };

      var view = {
        post: post,
        edit: function () {
          return renderForAdminOrOwner;
        },
        delete: function () {
          return renderForAdminOrOwner;
        }
      };

      return Mustache.render(app.templates.post.show, view);
    },

    renderList: function (posts) {
      return posts.map(app.views.post.render).join("\n");
    }
  };
}(window.jQuery, window, window.document));
