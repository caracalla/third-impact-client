(function (window, document, undefined) {
  'use strict';

  window.views = window.views || {}
  window.views.post = window.views.post || {};

  views.post.postObject = function (postResponse) {
    return {
      id: postResponse.id || "",
      title: postResponse.title || "",
      content: postResponse.content || "",
      author_id: postResponse.user_id || "",
      author_username: postResponse.user.username || "",
      created_at: postResponse.created_at || "",
      updated_at: postResponse.updated_at || ""
    };
  };

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

  views.post.edit = function (postResponse) {
    var post = views.post.postObject(postResponse);

    var editPostFormHTML =
      '<div id="post-' + post.id + '" class="row post">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="card">'
    +       '<h4 class="card-header text-xs-center">Edit Post</h4>'
    +       '<div class="card-block">'
    +         '<form>'
    +           '<div class="form-group">'
    +             '<input type="text" class="form-control" id="title-field" value="' + post.title + '">'
    +           '</div>'
    +           '<div class="form-group">'
    +             '<textarea class="form-control" id="content-field" rows="3">' + post.content + '</textarea>'
    +           '</div>'
    +           '<input type="text" class="hidden-xs-up" id="id-field" value="' + post.id +  '">' // how do I hide this ;_;
    +           '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +         '</form>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</div>';

    return editPostFormHTML;
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
