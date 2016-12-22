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
  }

  views.post.show = function (postResponse) {
    var post = views.post.postObject(postResponse);

    if (localStorage["user-id"] === post.author_id.toString() || localStorage["admin"] === "true") {
      var deleteButton =
        '<button type="button" class="close post-delete-button" data-postid="' + post.id + '">'
      +   '<span>&times;</span>'
      + '</button>';

      var editButton = '<a href="#" class="tag tag-primary post-edit-button" data-postid="' + post.id + '">edit</a>\n'
    } else {
      var deleteButton = "";
      var editButton = "";
    }

    var postHTML =
      '<div id="post-' + post.id + '" class="row post">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="card">'
    +       '<h4 class="card-header">'
    +         '<a href="#" class="post-title post-link" data-postid="' + post.id + '">'
    +            post.title
    +         '</a>'
    +          deleteButton
    +       '</h4>'
    +       '<div class=" card-block">'
    +         '<p class="card-text post-content">'
    +            post.content
    +         '</p>'
    +       '</div>'
    +       '<div class="card-footer text-muted">'
    +         '<div class="row">'
    +           '<div class="col-sm-6">'
    +             '<p class="card-text small">'
    +               '<a href="#" class="user-link post-author" data-userid="' + post.author_id + '">'
    +                  post.author_username
    +               '</a> - ' + post.created_at
    +             '</p>'
    +           '</div>'
    +           '<div class="col-sm-6">'
    +             '<div class="text-sm-right">'
    +                editButton
    +               '<a href="#" class="tag tag-primary add-comment-button" data-postid="' + post.id + '">add comment</a>'
    +             '</div>'
    +           '</div>'
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</div>';

    return postHTML;
  };

  views.post.form = function () {
    var postFormHTML =
      '<div class="card-block">'
    +   '<form>'
    +     '<div class="form-group">'
    +       '<input type="text" class="form-control" id="title-field" placeholder="Title">'
    +     '</div>'
    +     '<div class="form-group">'
    +       '<textarea class="form-control" id="content-field" rows="3" placeholder="Content"></textarea>'
    +     '</div>'
    +     '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +   '</form>'
    + '</div>';

    return postFormHTML;
  };

  views.post.new = function () {
    var newPostFormHTML =
      '<div class="row post-form">'
    +   '<div class="col-lg-10 offset-lg-1">'
    +     '<div class="card">'
    +       '<h4 class="card-header text-xs-center">New Post</h4>'
    +        views.post.form()
    +     '</div>'
    +   '</div>'
    + '</div>';

    return newPostFormHTML;
  };

  views.post.edit = function (post) {
    var editPostFormHTML =
      '<div class="col-lg-10 offset-lg-1">'
    +   '<div class="card">'
    +     '<h4 class="card-header text-xs-center">Edit Post</h4>'
    +     '<div class="card-block">' //Replace with views.post.form?
    +       '<form>'
    +         '<div class="form-group">'
    +           '<input type="text" class="form-control" id="title-field" value="' + post.title + '">'
    +         '</div>'
    +         '<div class="form-group">'
    +           '<textarea class="form-control" id="content-field" rows="3">' + post.content + '</textarea>'
    +         '</div>'
    +         '<input type="text" class="hidden" id="id-field" value="' + post.id +  '">' // how do I hide this ;_;
    +         '<button type="submit" class="btn btn-primary" id="submit-post-button">Submit</button>'
    +       '</form>'
    +     '</div>'; // Replace with views.post.form?
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
    return views.post.new() + posts.map(views.post.show).join("\n");
  };
}(window, window.document));
