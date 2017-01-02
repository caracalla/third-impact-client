(function (window, document, undefined) {
  'use strict';

  window.views = window.views || {}
  window.views.post = window.views.post || {};

  views.post.show = function (post) {
    var renderForAdminOrOwner = function (text, render) {
      if (post.user.admin || post.user_id.toString() == app.user().id ) {
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
    }

    return Mustache.render(app.templates.post, view);
  };

  views.post.indexLoggedOut = function (posts) {
    var signUpBannerHTML =
      '<div class="row">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="btn btn-success btn-lg btn-block" id="sign-up-banner">'
    +       'Sign up to start posting!'
    +     '</div>'
    +     '<hr>'
    +   '</div>'
    + '</div>';

    return signUpBannerHTML + posts.map(views.post.show).join("\n");
  };

  views.post.indexLoggedIn = function (posts) {
    return app.templates.postForm + posts.map(views.post.show).join("\n");
  };
}(window, window.document));
