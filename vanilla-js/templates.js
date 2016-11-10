(function (window, document, undefined) {
  window.templates = window.templates || {}

  window.templates.post = function (postResponse) {
    var post = {
      id: postResponse.id || "",
      title: postResponse.title || "",
      content: postResponse.content || "",
      author_id: postResponse.user_id || "",
      author_username: postResponse.user.username || "",
      created_at: postResponse.created_at || "",
      updated_at: postResponse.updated_at || ""
    };

    var output =
      '<div class="row">'
    +   '<div class="col-md-12">'
    +     '<p class="small">'
    +       '<a href="#" class="user-link" data-userid="' + post.author_id + '">'
    +          post.author_username
    +       '</a>'
    +       ' - ' + post.created_at
    +     '</p>'
    +     '<h3>'
    +       post.title
    +     '</h3>'
    +     '<p class="small">'
    +       post.content
    +     '</p>'
    +   '</div>'
    + '</div>';

    return output;
  };

  window.templates.user = function (userResponse) {
    var user = {
      id: userResponse.id || "",
      username: userResponse.username || "",
      email: userResponse.email || "",
      admin: userResponse.admin || ""
    };

    var output =
      '<div class="row">'
    +   '<div class="col-md-4">'
    +     '<p class="lead">'
    +        user.username
    +     '</p>'
    +     '<p class="small">'
    +        user.email
    +     '</p>'
    +   '</div>'
    +   '<div class="col-md-8">'
    +     '<p>'
    +       'something like a user bio could go here I guess'
    +     '</p>'
    +   '</div>'
    + '</div>';

    return output;
  };
}(window, window.document));