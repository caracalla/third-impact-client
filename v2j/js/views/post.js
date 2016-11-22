(function (window, document, undefined) {
  window.views = window.views || {}
  window.views.post = window.views.post || {};

  views.post.show = function (postResponse) {
    var post = {
      id: postResponse.id || "",
      title: postResponse.title || "",
      content: postResponse.content || "",
      author_id: postResponse.user_id || "",
      author_username: postResponse.user.username || "",
      created_at: postResponse.created_at || "",
      updated_at: postResponse.updated_at || ""
    };

    if (localStorage["user-id"] === post.author_id.toString() || localStorage["admin"] === "true") {
      var deleteButton =
        '<button type="button" class="close post-delete-button" data-postid="' + post.id + '">'
      +   '<span>&times;</span>'
      + '</button>';
    } else {
      var deleteButton = "";
    }

    var postHTML =
      '<div class="row post">'
    +   '<div class="col-lg-8 offset-lg-2 card card-block">'
    +     '<h4 class="card-title">'
    +       '<a href="#" class="post-link" data-postid="' + post.id + '">'
    +          post.title
    +       '</a>'
    +        deleteButton
    +     '</h4>'
    +     '<p class="card-text small">'
    +       "Author: "
    +       '<a href="#" class="user-link" data-userid="' + post.author_id + '">'
    +          post.author_username
    +       '</a>'
    +       ' - Posted at: ' + post.created_at
    +     '</p>'
    +     '<p class="card-text">'
    +       post.content
    +     '</p>'
    +   '</div>'
    + '</div>';

    return postHTML;
  };

  views.post.form = function () {
    var postFormHTML =
      '<div class="row">'
    +   '<div class="col-lg-8 offset-lg-2 card card-block">'
    +    '<h4 class="card-title text-xs-center">New Post</h4>'
    +    '<form>'
    +      '<div class="form-group">'
    +        '<input type="text" class="form-control" id="title-field" placeholder="Title">'
    +      '</div>'
    +      '<div class="form-group">'
    +        '<textarea class="form-control" id="content-field" rows="3" placeholder="Content"></textarea>'
    +      '</div>'
    +      '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +    '</form>'
    +   '</div>'
    + '</div>';

    return postFormHTML;
  };

  views.post.indexLoggedOut = function (posts) {
    var signUpBannerHTML =
      '<div class="row">'
    +   '<div class="col-lg-8 offset-lg-2">'
    +     '<div class="btn btn-success btn-lg btn-block" id="sign-up-banner">'
    +       'Sign up to start posting!'
    +     '</div>'
    +     '<hr>'
    +   '</div>'
    + '</div>';

    return signUpBannerHTML + posts.map(views.post.show).join("\n");
  };

  views.post.indexLoggedIn = function (posts) {
    return views.post.form() + posts.map(views.post.show).join("\n");
  };
}(window, window.document));
